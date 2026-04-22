import { hotels } from "../utils/hotels";

export default defineEventHandler((event) => {
  const query = getQuery(event);
  const adventure = query.adventure as string | undefined;

  if (adventure) {
    return hotels.filter((h) => h.adventure === adventure);
  }

  return hotels;
});
