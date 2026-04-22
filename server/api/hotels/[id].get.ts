import { getHotelById } from "../../utils/hotels";

export default defineEventHandler((event) => {
  const id = getRouterParam(event, "id");

  if (!id) {
    throw createError({ statusCode: 400, message: "Missing id" });
  }

  const hotel = getHotelById(id);

  if (!hotel) {
    throw createError({ statusCode: 404, message: "Hotel not found" });
  }

  return hotel;
});
