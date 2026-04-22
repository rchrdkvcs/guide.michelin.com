const STAR_MAP: Record<string, number> = { ONE: 1, TWO: 2, THREE: 3 };

export function starCount(michelinStar: string | null | undefined): number {
  return michelinStar ? (STAR_MAP[michelinStar] ?? 0) : 0;
}
