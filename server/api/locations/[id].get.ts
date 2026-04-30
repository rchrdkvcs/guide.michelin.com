import { getLocationById } from "../../utils/locations";

export default defineEventHandler((event) => {
  const id = getRouterParam(event, "id");

  if (!id) {
    throw createError({ statusCode: 400, message: "Missing id" });
  }

  const location = getLocationById(id);

  if (!location) {
    throw createError({ statusCode: 404, message: "Location not found" });
  }

  return location;
});
