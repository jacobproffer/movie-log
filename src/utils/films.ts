import { getCollection, type CollectionEntry } from "astro:content";

/** A log entry plus its running entry number (No. 1 is the first film ever logged). */
export type Film = CollectionEntry<"films"> & { no: number };

/** Films per page on the year pages. */
export const PAGE_SIZE = 50;

/** All logged films, most recently watched first, numbered in watch order. */
export async function getFilms(): Promise<Film[]> {
  const entries = await getCollection("films");
  // Oldest first to number them; the id (file name) breaks ties on the same day.
  entries.sort((a, b) => a.data.watched.valueOf() - b.data.watched.valueOf() || a.id.localeCompare(b.id));
  return entries.map((e, i) => ({ ...e, no: i + 1 })).reverse();
}

/** Films grouped by the year they were watched, newest year first. */
export function groupByYear(films: Film[]): [number, Film[]][] {
  const map = new Map<number, Film[]>();
  for (const film of films) {
    const y = film.data.watched.getUTCFullYear();
    if (!map.has(y)) map.set(y, []);
    map.get(y)!.push(film);
  }
  return [...map.entries()].sort((a, b) => b[0] - a[0]);
}

const ONES = ["Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten",
  "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
const TENS = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];

/** 0–99 as words, for the headline ("Three years in the dark."). */
export function toWords(n: number): string {
  if (n < 20) return ONES[n];
  if (n < 100) return TENS[Math.floor(n / 10)] + (n % 10 ? "-" + ONES[n % 10].toLowerCase() : "");
  return String(n);
}

/** Dates are stored as midnight UTC, so format in UTC to avoid off-by-one days. */
export function formatDate(d: Date, opts: Intl.DateTimeFormatOptions = { month: "short", day: "2-digit" }) {
  return d.toLocaleDateString("en-US", { timeZone: "UTC", ...opts });
}

export function average(nums: number[]): number | null {
  if (!nums.length) return null;
  return nums.reduce((a, b) => a + b, 0) / nums.length;
}
