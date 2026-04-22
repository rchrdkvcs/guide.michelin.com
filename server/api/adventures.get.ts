import { regionSvgs } from "../utils/region-svgs";

export default defineEventHandler(() => {
  // Return basic info for each adventure to display on the home page
  return Object.entries(adventures).map(([id, data]) => ({
    id,
    name: data.discover.title,
    description: data.discover.content,
    image: data.image.src,
    link: `/regions/${id}`,
    svgPath: regionSvgs[id] || "",
  }));
});
