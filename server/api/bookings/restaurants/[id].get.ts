import { getRestaurantBookingById } from "../../../utils/bookings";

export default defineEventHandler((event) => {
  const id = getRouterParam(event, "id");

  if (!id) {
    throw createError({ statusCode: 400, message: "Missing id" });
  }

  const booking = getRestaurantBookingById(id);

  if (!booking) {
    throw createError({ statusCode: 404, message: "Booking not found" });
  }

  return booking;
});
