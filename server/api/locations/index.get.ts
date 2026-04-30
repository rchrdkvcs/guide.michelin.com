import { filterLocations } from "../../utils/locations";
import { paginate, parsePagination } from "../../utils/paginate";

export default defineEventHandler((event) => {
  const query = getQuery(event);
  const { page, limit } = parsePagination(query);

  const filtered = filterLocations({
    type: query.type as string | undefined,
    country: query.country as string | undefined,
    language: query.language as string | undefined,
  });

  return paginate(filtered, page, limit);
});
