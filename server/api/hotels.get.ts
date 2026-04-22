import { hotels } from "../utils/hotels";

export default defineEventHandler((event) => {
  const query = getQuery(event);
  const region = query.region as string | undefined;

  if (region) {
    return hotels.filter((h) => h.region === region);
  }

  return hotels;
});
