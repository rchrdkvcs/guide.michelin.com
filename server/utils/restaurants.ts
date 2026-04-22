import { loadJsonl } from "./load-data";

export interface RestaurantDistinction {
  label: string;
  slug: string;
  icon: string;
}

export interface RestaurantCity {
  name: string;
  slug: string;
}

export interface RestaurantCountry {
  name: string;
  slug: string;
  code: string;
  cname: string;
}

export interface RestaurantRegion {
  name: string;
  slug: string;
}

export interface RestaurantCuisine {
  code: string;
  label: string;
  slug: string;
}

export interface RestaurantDiet {
  code: string;
  label: string;
  slug: string;
}

export interface RestaurantFacility {
  code: string;
  label: string;
  slug: string;
}

export interface RestaurantImage {
  copyright: string;
  identifier: string;
  order: number;
  topic: string;
  url: string;
}

export interface RestaurantHotelSelection {
  id: string;
  name: string;
  slug: string;
  city_slug: string;
  picture: string;
  distinction_score: number;
  feedback_meter_score?: number;
  criteria_style?: string;
}

export interface Restaurant {
  objectID: string;
  slug: string;
  name: string;
  language: string;
  status: string;
  published_date: number;
  last_updated: number;
  url: string;
  other_urls: string[];
  sites: string[];
  site_name: string;
  site_slug: string;

  // Location
  city: RestaurantCity;
  country: RestaurantCountry;
  region: RestaurantRegion;
  area_name: string;
  area_slug: string;
  street: string;
  postcode: string;
  _geoloc: { lat: number; lng: number } | null;

  // Michelin
  michelin_award: string;
  michelin_star: string | null;
  distinction: RestaurantDistinction | null;
  distinction_with_gastronomy: RestaurantDistinction[];
  distinction_score: number;
  green_star: unknown;
  guide_year: number;

  // Content
  main_desc: string;
  is_main_desc_translated: boolean;
  image: string;
  images: RestaurantImage[];
  main_image: RestaurantImage | null;

  // Details
  chef: string;
  cuisines: RestaurantCuisine[];
  special_diets: RestaurantDiet[];
  facilities: RestaurantFacility[];
  tag_thematic: { code: string; label: string; slug: string }[];
  price: { high: number | null; low: number | null };
  price_category: { code: string; label: string; slug: string } | null;
  currency: string;
  currency_symbol: string;
  phone: string;
  website: string;
  short_link: string;

  // Booking
  online_booking: number;
  booking_id: string;
  booking_provider: string;
  booking_url: string;
  original_booking_url: string | null;
  delivery: number;
  delivery_booking_url: string | null;
  delivery_provider: string | null;
  take_away: number;
  take_away_booking_url: string | null;
  new_table: number;
  offers: number;
  offers_size: number;

  // Hours
  hours_of_operation: Record<string, { closed: boolean; opens: string; closes: string }[]>;
  meal_times: string[];
  days_open: string[];

  // Hotel association
  with_michelin_guide_hotels: number;
  michelin_guide_hotel: RestaurantHotelSelection | null;
  hotel_selection: RestaurantHotelSelection | null;
}

let _restaurants: Restaurant[] | null = null;
let _bySlug: Map<string, Restaurant> | null = null;

export function getRestaurants(): Restaurant[] {
  if (!_restaurants) {
    _restaurants = loadJsonl<Restaurant>("all_restaurants.jsonl").filter(
      (r) => r.status === "Published",
    );
    _bySlug = new Map(_restaurants.map((r) => [r.slug, r]));
  }
  return _restaurants;
}

export function getRestaurantBySlug(slug: string): Restaurant | undefined {
  getRestaurants();
  return _bySlug!.get(slug);
}

export interface RestaurantFilters {
  name?: string;
  country?: string;
  city?: string;
  region?: string;
  stars?: string;
  distinction?: string;
  cuisine?: string;
  diet?: string;
  language?: string;
  sort?: string;
  order?: string;
}

const STAR_MAP: Record<string, string> = { "1": "ONE", "2": "TWO", "3": "THREE" };

export function filterRestaurants(filters: RestaurantFilters): Restaurant[] {
  let results = getRestaurants();

  if (filters.name) {
    const needle = filters.name.toLowerCase();
    results = results.filter((r) => r.name.toLowerCase().includes(needle));
  }
  if (filters.country)
    results = results.filter((r) => r.country?.slug === filters.country);
  if (filters.city)
    results = results.filter((r) => r.city?.slug === filters.city);
  if (filters.region)
    results = results.filter((r) => r.region?.slug === filters.region);
  if (filters.stars) {
    const starValue = STAR_MAP[filters.stars];
    if (starValue) results = results.filter((r) => r.michelin_star === starValue);
  }
  if (filters.distinction)
    results = results.filter((r) => r.distinction?.slug === filters.distinction);
  if (filters.cuisine)
    results = results.filter((r) =>
      r.cuisines?.some((c) => c.slug === filters.cuisine),
    );
  if (filters.diet)
    results = results.filter((r) =>
      r.special_diets?.some((d) => d.slug === filters.diet),
    );
  if (filters.language)
    results = results.filter((r) => r.language === filters.language);

  const order = filters.order === "desc" ? -1 : 1;
  switch (filters.sort) {
    case "stars":
      results = [...results].sort(
        (a, b) => order * (b.distinction_score - a.distinction_score),
      );
      break;
    case "published_date":
      results = [...results].sort(
        (a, b) => order * (b.published_date - a.published_date),
      );
      break;
    default:
      results = [...results].sort((a, b) =>
        order * a.name.localeCompare(b.name),
      );
  }

  return results;
}
