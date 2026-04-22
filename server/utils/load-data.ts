import { readFileSync } from "fs";
import { resolve } from "path";

const cache = new Map<string, unknown[]>();

function dataPath(filename: string): string {
  return resolve(process.cwd(), "server/data", filename);
}

export function loadJsonl<T>(filename: string): T[] {
  if (cache.has(filename)) {
    return cache.get(filename) as T[];
  }

  const raw = readFileSync(dataPath(filename), "utf-8");
  const records = raw
    .split("\n")
    .filter((line: string) => line.trim().length > 0)
    .map((line: string) => JSON.parse(line) as T);

  cache.set(filename, records);
  return records;
}

export function loadJson<T>(filename: string): T {
  const key = `__json__${filename}`;
  if (cache.has(key)) {
    return cache.get(key) as T;
  }

  const raw = readFileSync(dataPath(filename), "utf-8");
  const data = JSON.parse(raw) as T;

  cache.set(key, data as unknown[]);
  return data;
}
