import { filterArticles } from "../../utils/articles";
import { paginate, parsePagination } from "../../utils/paginate";

export default defineEventHandler((event) => {
  const query = getQuery(event);
  const { page, limit } = parsePagination(query);

  const filtered = filterArticles({
    language: query.language as string | undefined,
    tag: query.tag as string | undefined,
    site: query.site as string | undefined,
    sort: query.sort as string | undefined,
    order: query.order as string | undefined,
  });

  return paginate(filtered, page, limit);
});
