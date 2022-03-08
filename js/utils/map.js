export function mergeMapInto(mapA, mapB) {
  for (let [key, value] of mapA) {
    mapB.set(key, value);
  }

  return mapB;
}

export function mergeMap(mapA, mapB) {
  if (!mapA) {
    return new Map(mapB);
  }

  if (!mapB) {
    return new Map(mapA);
  }

  return new Map([...mapA, ...mapB]);
}
