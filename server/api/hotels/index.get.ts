import { filterHotels } from "../../utils/hotels";
import { paginate, parsePagination } from "../../utils/paginate";

export default defineEventHandler((event) => {
  const query = getQuery(event);
  const { page, limit } = parsePagination(query);

  const filtered = filterHotels({
    sort: query.sort as string | undefined,
    order: query.order as string | undefined,
  });

  // Return hotels without the full rooms list for the index
  const lightweight = filtered.map(({ id, name, roomCount, previewImage }) => ({
    id,
    name,
    roomCount,
    previewImage,
  }));

  return paginate(lightweight, page, limit);
});
