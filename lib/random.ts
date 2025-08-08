
export function pickRandom<T>(arr: T[], excludeLastN: number, history: T[], key: (t:T)=>string): T {
  const recentKeys = new Set(history.slice(-excludeLastN).map(key));
  const candidates = arr.filter(a => !recentKeys.has(key(a)));
  const pool = candidates.length ? candidates : arr;
  return pool[Math.floor(Math.random() * pool.length)];
}
