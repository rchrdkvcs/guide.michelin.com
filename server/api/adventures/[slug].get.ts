import { getAdventures } from "../../utils/adventures";
import { filterRestaurants } from "../../utils/restaurants";
import { filterHotels } from "../../utils/hotels";
import { paginate, parsePagination } from "../../utils/paginate";

export default defineEventHandler((event) => {
  const slug = getRouterParam(event, "slug");

  if (!slug) {
    throw createError({ statusCode: 400, message: "Missing slug" });
  }

  const adventure = getAdventures().find((a) => a.slug === slug);

  if (!adventure) {
    throw createError({ statusCode: 404, message: "Adventure not found" });
  }

  const query = getQuery(event);
  const { page, limit } = parsePagination(query);

  // Filter restaurants by region or city slug
  const isRegion = adventure.locationType === "REGION";
  const restaurants = filterRestaurants(
    isRegion ? { region: slug } : { city: slug },
  );

  // Filter hotels: match hotels whose name appears in restaurant hotel_selection
  const restaurantHotelIds = new Set(
    restaurants
      .map((r) => r.hotel_selection?.id)
      .filter(Boolean) as string[],
  );

  const hotels = filterHotels({}).filter((h) =>
    restaurantHotelIds.has(h.id),
  );

  return {
    adventure,
    restaurants: paginate(restaurants, page, limit),
    hotels: paginate(hotels, 1, 100),
  };
});
