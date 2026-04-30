import { getAdventures } from "../../utils/adventures";
import { paginate, parsePagination } from "../../utils/paginate";

export default defineEventHandler((event) => {
  const query = getQuery(event);
  const { page, limit } = parsePagination(query);

  const adventures = getAdventures();

  return paginate(adventures, page, limit);
});
