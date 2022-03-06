export function mergeMap(mapA, mapB) {
  if (!mapA) {
    return new Map(mapB);
  }

  if (!mapB) {
    return new Map(mapA);
  }

  return new Map([...mapA, ...mapB]);
}
