import { loadJson } from "./load-data";

export interface RestaurantBooking {
  objectID: string;
  name: string;
  provider: string;
  booking_id: string;
  booking_url: string;
  arrival: string;
  party_size: number;
  scraped_at: string;
  success: boolean;
  data: unknown;
}

let _bookings: RestaurantBooking[] | null = null;
let _byObjectId: Map<string, RestaurantBooking> | null = null;

export function getRestaurantBookings(): RestaurantBooking[] {
  if (!_bookings) {
    _bookings = loadJson<RestaurantBooking[]>("all_restos_live.json");
    _byObjectId = new Map(_bookings.map((b) => [b.objectID, b]));
  }
  return _bookings;
}

export function getRestaurantBookingById(
  id: string,
): RestaurantBooking | undefined {
  getRestaurantBookings();
  return _byObjectId!.get(id);
}
