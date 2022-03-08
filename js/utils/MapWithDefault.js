export class MapWithDefault extends Map {
  constructor(entries) {
    super(entries);
  }

  getOrDefault(key, defaultValue) {
    if (this.has(key)) {
      return this.get(key);
    }

    return defaultValue;
  }
}
