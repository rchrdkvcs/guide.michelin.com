import { loadJsonl } from "./load-data";
import { getRestaurants } from "./restaurants";

export interface RoomAmenity {
  amenity: string;
  id: number;
}

export interface RoomStatic {
  hotel_id: string;
  hotel_name: string;
  room_id: string;
  room: {
    id: number;
    room_title: string;
    room_description: string;
    room_size: string;
    room_size_unit: string;
    room_amenities: string;
    room_amenity_list: string[];
    room_amenity_ids_list: number[];
    amenities: RoomAmenity[];
    images: string[];
    bedding_list: string[];
    bedding_paragraph: string;
    occupancy_paragraph: string;
    amenity_paragraph: string;
    max_occupancy_adult: number;
    max_occupancy_child: number;
    total_guest_occupancy: number;
    primary_bedding_option: number;
    alternate_bedding_option: number;
    child_threshold: number;
    room_views: unknown;
    room_view_list: string[];
    view_paragraph: string | null;
    bath_amenities_desc: string | null;
    linen_amenities_desc: string | null;
  };
}

export interface RoomRate {
  unique_key: string;
  total: number;
  total_with_tax: number;
  subtotal: number;
  subtotal_tax_exclusive: number;
  display_average_per_night: number;
  display_total_with_tax: number;
  meal_plan: string | null;
  meal_plan_code: string;
  breakfast_included: number;
  rate_label: string;
  rate_label_token: string;
  free_deadline: string;
  free_deadline_unformatted: string;
  cancellation: string;
  deposit_policy: string;
  is_available: boolean;
  is_merchant: boolean;
  provider: string;
  parking_included: number;
  internet_included: number;
  currency?: string;
}

export interface RoomLive {
  hotel_id: string;
  hotel_name: string;
  arrival: string;
  los: number;
  adults: number;
  room: {
    room_title: string;
    room_type: number;
    max_occupancy_adult: number;
    max_occupancy_child: number;
    total_guest_occupancy: number;
    available_room_count: number;
    image: string | null;
    rates: RoomRate[];
  };
}

export interface Hotel {
  id: string;
  name: string;
  roomCount: number;
  previewImage: string | null;
  rooms: RoomStatic[];
  city: string | null;
  citySlug: string | null;
  distinctionScore: number;
  criteriaStyle: string | null;
  minPricePerNight: number | null;
  maxPricePerNight: number | null;
  isPlusEligible: boolean;
}

interface HotelEnrichment {
  citySlug: string | null;
  city: string | null;
  distinctionScore: number;
  criteriaStyle: string | null;
}

interface HotelLiveData {
  minPricePerNight: number | null;
  maxPricePerNight: number | null;
  isPlusEligible: boolean;
}

function formatCitySlug(slug: string): string {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

let _roomsStatic: RoomStatic[] | null = null;
let _hotelMap: Map<string, Hotel> | null = null;
let _roomsLive: RoomLive[] | null = null;
let _liveByHotelId: Map<string, RoomLive[]> | null = null;
let _hotelEnrichmentMap: Map<string, HotelEnrichment> | null = null;
let _hotelLiveMap: Map<string, HotelLiveData> | null = null;

function normalizeImageUrl(url: string | null | undefined): string | null {
  if (!url) return null;
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  return `https://${url}`;
}

export function getRoomsStatic(): RoomStatic[] {
  if (!_roomsStatic) {
    const raw = loadJsonl<RoomStatic>("all_rooms_static.jsonl");
    // Normalize image URLs that lack protocol prefix
    _roomsStatic = raw.map((r) => ({
      ...r,
      room: {
        ...r.room,
        images: (r.room.images ?? []).map((img) => normalizeImageUrl(img) as string),
      },
    }));
  }
  return _roomsStatic;
}

export function getHotels(): Hotel[] {
  if (!_hotelMap) {
    const map = new Map<string, Hotel>();
    for (const room of getRoomsStatic()) {
      const existing = map.get(room.hotel_id);
      if (existing) {
        existing.roomCount++;
        existing.rooms.push(room);
      } else {
        map.set(room.hotel_id, {
          id: room.hotel_id,
          name: room.hotel_name,
          roomCount: 1,
          previewImage: room.room.images?.[0] ?? null,
          rooms: [room],
          city: null,
          citySlug: null,
          distinctionScore: 0,
          criteriaStyle: null,
          minPricePerNight: null,
          maxPricePerNight: null,
          isPlusEligible: false,
        });
      }
    }

    const enrichMap = buildHotelEnrichmentMap();
    const liveMap = buildHotelLiveMap();
    for (const [id, hotel] of map) {
      const enrich = enrichMap.get(id);
      const live = liveMap.get(id);
      if (enrich) {
        hotel.citySlug = enrich.citySlug;
        hotel.city = enrich.city;
        hotel.distinctionScore = enrich.distinctionScore;
        hotel.criteriaStyle = enrich.criteriaStyle;
      }
      if (live) {
        hotel.minPricePerNight = live.minPricePerNight;
        hotel.maxPricePerNight = live.maxPricePerNight;
        hotel.isPlusEligible = live.isPlusEligible;
      }
    }

    _hotelMap = map;
  }
  return Array.from(_hotelMap.values());
}

export function getHotelById(id: string): Hotel | undefined {
  getHotels();
  return _hotelMap!.get(id);
}

export function getRoomsLive(): RoomLive[] {
  if (!_roomsLive) {
    _roomsLive = loadJsonl<RoomLive>("all_rooms_live.jsonl");
    _liveByHotelId = new Map();
    for (const room of _roomsLive) {
      const existing = _liveByHotelId.get(room.hotel_id) ?? [];
      existing.push(room);
      _liveByHotelId.set(room.hotel_id, existing);
    }
  }
  return _roomsLive;
}

export function getLiveRoomsForHotel(
  hotelId: string,
  filters?: { arrival?: string; los?: number; adults?: number },
): RoomLive[] {
  getRoomsLive();
  let rooms = _liveByHotelId!.get(hotelId) ?? [];

  if (filters?.arrival)
    rooms = rooms.filter((r) => r.arrival === filters.arrival);
  if (filters?.los)
    rooms = rooms.filter((r) => r.los === filters.los);
  if (filters?.adults)
    rooms = rooms.filter((r) => r.adults === filters.adults);

  return rooms;
}

export interface HotelFilters {
  name?: string;
  sort?: string;
  order?: string;
}

function buildHotelEnrichmentMap(): Map<string, HotelEnrichment> {
  if (!_hotelEnrichmentMap) {
    _hotelEnrichmentMap = new Map();
    for (const r of getRestaurants()) {
      const sel = r.hotel_selection;
      if (!sel) continue;
      const id = String(sel.id);
      if (_hotelEnrichmentMap.has(id)) continue;
      const citySlug = sel.city_slug ?? null;
      _hotelEnrichmentMap.set(id, {
        citySlug,
        city: citySlug ? formatCitySlug(citySlug) : null,
        distinctionScore: sel.distinction_score ?? 0,
        criteriaStyle: sel.criteria_style ?? null,
      });
    }
  }
  return _hotelEnrichmentMap;
}

function buildHotelLiveMap(): Map<string, HotelLiveData> {
  if (!_hotelLiveMap) {
    _hotelLiveMap = new Map();
    const byHotel = new Map<string, { prices: number[]; plusEligible: boolean }>();
    for (const room of getRoomsLive()) {
      const entry = byHotel.get(room.hotel_id) ?? { prices: [], plusEligible: false };
      for (const rate of room.room.rates) {
        if (rate.is_available && rate.display_average_per_night > 0) {
          entry.prices.push(rate.display_average_per_night);
        }
        if (rate.plus_eligible) entry.plusEligible = true;
      }
      byHotel.set(room.hotel_id, entry);
    }
    for (const [hotelId, data] of byHotel) {
      _hotelLiveMap.set(hotelId, {
        minPricePerNight: data.prices.length > 0 ? Math.min(...data.prices) : null,
        maxPricePerNight: data.prices.length > 0 ? Math.max(...data.prices) : null,
        isPlusEligible: data.plusEligible,
      });
    }
  }
  return _hotelLiveMap;
}

export function filterHotels(filters: HotelFilters): Hotel[] {
  let results = getHotels();

  if (filters.name) {
    const needle = filters.name.toLowerCase();
    results = results.filter((h) => h.name.toLowerCase().includes(needle));
  }

  const order = filters.order === "desc" ? -1 : 1;
  if (filters.sort === "rooms") {
    results = [...results].sort((a, b) => order * (a.roomCount - b.roomCount));
  } else {
    results = [...results].sort((a, b) => order * a.name.localeCompare(b.name));
  }

  return results;
}
