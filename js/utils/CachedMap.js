import _ from 'https://cdn.skypack.dev/lodash';

export class CachedMap extends Map {
  constructor(entries) {
    super(entries);
  }

  set(key, value) {
    if (!_.isEqual(this.get(key), value)) {
      super.set(key, _.clone(value));

      return true;
    }

    return false;
  }
}
