import { getRestaurants } from "../../utils/restaurants";

export default defineEventHandler(() => {
  const restaurants = getRestaurants();

  const cuisinesMap = new Map<string, { label: string; slug: string }>();
  const countriesMap = new Map<string, { name: string; slug: string }>();

  for (const r of restaurants) {
    r.cuisines?.forEach((c) => {
      if (!cuisinesMap.has(c.slug)) cuisinesMap.set(c.slug, { label: c.label, slug: c.slug });
    });
    if (r.country?.slug && !countriesMap.has(r.country.slug)) {
      countriesMap.set(r.country.slug, { name: r.country.name, slug: r.country.slug });
    }
  }

  return {
    cuisines: Array.from(cuisinesMap.values()).sort((a, b) => a.label.localeCompare(b.label)),
    countries: Array.from(countriesMap.values()).sort((a, b) => a.name.localeCompare(b.name)),
  };
});
