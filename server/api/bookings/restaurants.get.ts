import { getRestaurantBookings } from "../../utils/bookings";
import { paginate, parsePagination } from "../../utils/paginate";

export default defineEventHandler((event) => {
  const query = getQuery(event);
  const { page, limit } = parsePagination(query);

  const bookings = getRestaurantBookings();

  return paginate(bookings, page, limit);
});
