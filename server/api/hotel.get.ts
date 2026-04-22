import { hotels } from "../utils/hotels";

export default defineEventHandler((event) => {
  const query = getQuery(event);
  const slug = query.slug as string;

  if (!slug) {
    throw createError({ statusCode: 400, message: "Missing slug parameter" });
  }

  const hotel = hotels.find((h) => h.slug === slug);

  if (!hotel) {
    throw createError({ statusCode: 404, message: "Hotel not found" });
  }

  return hotel;
});
