import { filterRestaurants } from "../../utils/restaurants";
import { paginate, parsePagination } from "../../utils/paginate";

export default defineEventHandler((event) => {
  const query = getQuery(event);
  const { page, limit } = parsePagination(query);

  const filtered = filterRestaurants({
    name: query.name as string | undefined,
    country: query.country as string | undefined,
    city: query.city as string | undefined,
    region: query.region as string | undefined,
    stars: query.stars as string | undefined,
    distinction: query.distinction as string | undefined,
    cuisine: query.cuisine as string | undefined,
    diet: query.diet as string | undefined,
    language: query.language as string | undefined,
    sort: query.sort as string | undefined,
    order: query.order as string | undefined,
  });

  return paginate(filtered, page, limit);
});
