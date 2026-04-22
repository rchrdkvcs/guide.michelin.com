import { loadJsonl } from "./load-data";

export interface ArticleThumbnail {
  url: string;
  mime_type: string;
  screen: string | null;
}

export interface Article {
  objectID: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  thumbnails: ArticleThumbnail[];
  language: string;
  published_date: number;
  last_updated: number;
  reading_time: number;
  tags: string[];
  sites: string[];
  url: string;
  other_urls: string[];
  category_slug: string;
  prefix: string;
  audio_url: string | null;
  status: string;
  objectType: string;
  related_restaurants: unknown[];
}

let _articles: Article[] | null = null;
let _bySlug: Map<string, Article> | null = null;

export function getArticles(): Article[] {
  if (!_articles) {
    _articles = loadJsonl<Article>("all_articles.jsonl").filter(
      (a) => a.status === "Published",
    );
    _bySlug = new Map(_articles.map((a) => [a.slug, a]));
  }
  return _articles;
}

export function getArticleBySlug(slug: string): Article | undefined {
  getArticles();
  return _bySlug!.get(slug);
}

export interface ArticleFilters {
  language?: string;
  tag?: string;
  site?: string;
  sort?: string;
  order?: string;
}

export function filterArticles(filters: ArticleFilters): Article[] {
  let results = getArticles();

  if (filters.language)
    results = results.filter((a) => a.language === filters.language);
  if (filters.tag)
    results = results.filter((a) => a.tags?.includes(filters.tag!));
  if (filters.site)
    results = results.filter((a) => a.sites?.includes(filters.site!));

  const order = filters.order === "asc" ? 1 : -1;
  switch (filters.sort) {
    case "title":
      results = [...results].sort((a, b) =>
        order * a.title.localeCompare(b.title),
      );
      break;
    default:
      results = [...results].sort(
        (a, b) => order * (b.published_date - a.published_date),
      );
  }

  return results;
}
