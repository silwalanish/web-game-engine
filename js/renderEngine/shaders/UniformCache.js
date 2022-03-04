import { CachedMap } from "../../utils/CachedMap.js";

export class UniformCache {
  constructor(uniformsMeta) {
    this._values = new CachedMap();
    this._uniformsMeta = uniformsMeta;
    this._uniformHasChanged = new Map();

    this._initializeDefaultValues();
  }

  _initializeDefaultValues() {
    for (let [name, meta] of this._uniformsMeta) {
      if (!this._values.has(name)) {
        this.setValue(name, meta.defaultValue);
      }
    }
  }

  hasChanged(name) {
    return this._uniformHasChanged.get(name) || false;
  }

  markAsLoaded(name) {
    this._uniformHasChanged.set(name, false);
  }

  setValue(name, value) {
    this._uniformHasChanged.set(
      name,
      this._values.set(name, value) || this._uniformHasChanged.get(name)
    );
  }

  getValue(name) {
    return this._values.get(name);
  }
}
