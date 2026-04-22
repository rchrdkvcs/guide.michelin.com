import { loadJsonl } from "./load-data";

export interface LocationCountry {
  name: string;
  slug: string;
  code: string;
  cname: string;
}

export interface Location {
  objectID: string;
  label: string;
  language: string;
  location_type: "COUNTRY" | "REGION" | "CITY";
  restaurants: number;
  status: string;
  sites: string[];
  site_name: string;
  site_slug: string;
  url: string;
  other_urls: string[];
  objectType: string;

  country: LocationCountry | null;
  country_code: string | null;
  country_name: string | null;

  region: { name: string; slug: string } | null;
  region_name: string | null;
  region_slug: string | null;

  city: { name: string; slug: string } | null;
  city_name: string | null;
  city_slug: string | null;

  _geoloc: { lat: number; lng: number } | null;
}

let _locations: Location[] | null = null;
let _byId: Map<string, Location> | null = null;

export function getLocations(): Location[] {
  if (!_locations) {
    _locations = loadJsonl<Location>("all_locations_fr.jsonl").filter(
      (l) => l.status === "Published",
    );
    _byId = new Map(_locations.map((l) => [l.objectID, l]));
  }
  return _locations;
}

export function getLocationById(id: string): Location | undefined {
  getLocations();
  return _byId!.get(id);
}

export interface LocationFilters {
  type?: string;
  country?: string;
  language?: string;
}

export function filterLocations(filters: LocationFilters): Location[] {
  let results = getLocations();

  if (filters.type)
    results = results.filter((l) => l.location_type === filters.type);
  if (filters.country)
    results = results.filter((l) => l.country?.slug === filters.country);
  if (filters.language)
    results = results.filter((l) => l.language === filters.language);

  return results;
}
