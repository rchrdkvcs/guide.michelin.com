import { getRestaurantBySlug } from "../../utils/restaurants";

export default defineEventHandler((event) => {
  const slug = getRouterParam(event, "slug");

  if (!slug) {
    throw createError({ statusCode: 400, message: "Missing slug" });
  }

  const restaurant = getRestaurantBySlug(slug);

  if (!restaurant) {
    throw createError({ statusCode: 404, message: "Restaurant not found" });
  }

  return restaurant;
});
