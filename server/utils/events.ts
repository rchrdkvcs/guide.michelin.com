import { loadJsonl } from "./load-data";

export interface EventThumbnail {
  url: string;
  mime_type: string;
  screen: string | null;
}

export interface MichelinEvent {
  objectID: string;
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  thumbnails: EventThumbnail[];
  language: string;
  published_date: number;
  last_updated: number;
  start_date: number;
  end_date: number;
  location: string;
  tags: string[];
  sites: string[];
  url: string | null;
  other_urls: string[] | null;
  status: string;
  objectType: string;
  prefix: string;
  audio_url: string | null;
}

let _events: MichelinEvent[] | null = null;
let _bySlug: Map<string, MichelinEvent> | null = null;

export function getEvents(): MichelinEvent[] {
  if (!_events) {
    _events = loadJsonl<MichelinEvent>("all_events_en.jsonl");
    _bySlug = new Map(_events.map((e) => [e.slug, e]));
  }
  return _events;
}

export function getEventBySlug(slug: string): MichelinEvent | undefined {
  getEvents();
  return _bySlug!.get(slug);
}

export interface EventFilters {
  status?: string;
  site?: string;
  sort?: string;
  order?: string;
}

export function filterEvents(filters: EventFilters): MichelinEvent[] {
  let results = getEvents();

  if (filters.status)
    results = results.filter((e) => e.status === filters.status);
  if (filters.site)
    results = results.filter((e) => e.sites?.includes(filters.site!));

  const order = filters.order === "desc" ? -1 : 1;
  switch (filters.sort) {
    case "published_date":
      results = [...results].sort(
        (a, b) => order * (b.published_date - a.published_date),
      );
      break;
    default:
      results = [...results].sort(
        (a, b) => order * (b.start_date - a.start_date),
      );
  }

  return results;
}
