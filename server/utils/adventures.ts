import { getLocations, type Location } from "./locations";
import { getRestaurants } from "./restaurants";

export interface AdventureSummary {
  slug: string;
  label: string;
  locationType: string;
  countrySlug: string | null;
  countryName: string | null;
  totalRestaurants: number;
  image: string | null;
}

let _adventures: AdventureSummary[] | null = null;

export function getAdventures(): AdventureSummary[] {
  if (_adventures) return _adventures;

  const restaurants = getRestaurants();

  // Build a map of region/city slug → restaurant count + cover image
  const regionStats = new Map<
    string,
    { count: number; image: string | null }
  >();
  const cityStats = new Map<string, { count: number; image: string | null }>();

  for (const r of restaurants) {
    if (r.region?.slug) {
      const existing = regionStats.get(r.region.slug) ?? {
        count: 0,
        image: null,
      };
      existing.count++;
      if (!existing.image && r.image) existing.image = r.image;
      regionStats.set(r.region.slug, existing);
    }
    if (r.city?.slug) {
      const existing = cityStats.get(r.city.slug) ?? {
        count: 0,
        image: null,
      };
      existing.count++;
      if (!existing.image && r.image) existing.image = r.image;
      cityStats.set(r.city.slug, existing);
    }
  }

  const locations = getLocations();
  const seen = new Set<string>();

  const result: AdventureSummary[] = locations
    .filter((l: Location) => {
      if (l.location_type === "REGION" && l.region_slug) {
        return regionStats.has(l.region_slug);
      }
      if (l.location_type === "CITY" && l.city_slug) {
        return cityStats.has(l.city_slug);
      }
      return false;
    })
    .filter((l: Location) => {
      const slug =
        l.location_type === "REGION" ? l.region_slug! : l.city_slug!;
      if (seen.has(slug)) return false;
      seen.add(slug);
      return true;
    })
    .map((l: Location): AdventureSummary => {
      const isRegion = l.location_type === "REGION";
      const slug = isRegion ? l.region_slug! : l.city_slug!;
      const stats = isRegion
        ? regionStats.get(slug)!
        : cityStats.get(slug)!;

      return {
        slug,
        label: l.label,
        locationType: l.location_type,
        countrySlug: l.country?.slug ?? null,
        countryName: l.country?.name ?? null,
        totalRestaurants: stats.count,
        image: stats.image,
      };
    })
    .sort((a: AdventureSummary, b: AdventureSummary) => b.totalRestaurants - a.totalRestaurants);

  _adventures = result;
  return _adventures;
}
