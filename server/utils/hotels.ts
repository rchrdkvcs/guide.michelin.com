import { loadJsonl } from "./load-data";

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
}

let _roomsStatic: RoomStatic[] | null = null;
let _hotelMap: Map<string, Hotel> | null = null;
let _roomsLive: RoomLive[] | null = null;
let _liveByHotelId: Map<string, RoomLive[]> | null = null;

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
        });
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
