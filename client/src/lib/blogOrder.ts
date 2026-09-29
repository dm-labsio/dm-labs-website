/** Newest publication first; preserve the source arrays and insertion order for tied dates. */
export function newestFirst<T extends { date: string }>(articles: readonly T[]): T[] {
  return [...articles].sort((a, b) => b.date.localeCompare(a.date));
}
