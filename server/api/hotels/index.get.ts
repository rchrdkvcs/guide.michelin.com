import { filterHotels } from "../../utils/hotels";
import { paginate, parsePagination } from "../../utils/paginate";

export default defineEventHandler((event) => {
  const query = getQuery(event);
  const { page, limit } = parsePagination(query);

  const filtered = filterHotels({
    name: query.name as string | undefined,
    sort: query.sort as string | undefined,
    order: query.order as string | undefined,
  });

  // Return hotels without the full rooms list for the index
  const lightweight = filtered.map(
    ({
      id,
      name,
      roomCount,
      previewImage,
      city,
      citySlug,
      distinctionScore,
      criteriaStyle,
      minPricePerNight,
      maxPricePerNight,
      isPlusEligible,
    }) => ({
      id,
      name,
      roomCount,
      previewImage,
      city,
      citySlug,
      distinctionScore,
      criteriaStyle,
      minPricePerNight,
      maxPricePerNight,
      isPlusEligible,
    }),
  );

  return paginate(lightweight, page, limit);
});
