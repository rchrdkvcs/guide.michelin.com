import { getLiveRoomsForHotel, getHotelById } from "../../../utils/hotels";
import { paginate, parsePagination } from "../../../utils/paginate";

export default defineEventHandler((event) => {
  const id = getRouterParam(event, "id");

  if (!id) {
    throw createError({ statusCode: 400, message: "Missing hotel id" });
  }

  const hotel = getHotelById(id);
  if (!hotel) {
    throw createError({ statusCode: 404, message: "Hotel not found" });
  }

  const query = getQuery(event);
  const { page, limit } = parsePagination(query);

  const rooms = getLiveRoomsForHotel(id, {
    arrival: query.arrival as string | undefined,
    los: query.los ? Number(query.los) : undefined,
    adults: query.adults ? Number(query.adults) : undefined,
  });

  return paginate(rooms, page, limit);
});
