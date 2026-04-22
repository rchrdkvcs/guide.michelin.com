import { filterEvents } from "../../utils/events";
import { paginate, parsePagination } from "../../utils/paginate";

export default defineEventHandler((event) => {
  const query = getQuery(event);
  const { page, limit } = parsePagination(query);

  const filtered = filterEvents({
    status: query.status as string | undefined,
    site: query.site as string | undefined,
    sort: query.sort as string | undefined,
    order: query.order as string | undefined,
  });

  return paginate(filtered, page, limit);
});
