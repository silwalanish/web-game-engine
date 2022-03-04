import { GL } from "../GL.js";

export class UniformLocationCache {
  constructor() {
    this._webGLProgramId = null;
    this._uniformLocations = new Map();
  }

  setWebGLProgramId(id) {
    if (id !== this._webGLProgramId) {
      this._webGLProgramId = id;
      this._uniformLocations.clear();
    }
  }

  _cacheUniformLocation(name) {
    if (!this._uniformLocations.has(name)) {
      let location = GL.getUniformLocation(this._webGLProgramId, name);
      this._uniformLocations.set(name, location);

      return location;
    }

    return this._uniformLocations.get(name);
  }

  cache(uniformsMeta) {
    for (let [name, _] of uniformsMeta) {
      this._cacheUniformLocation(name);
    }
  }

  getLocation(name) {
    return this._cacheUniformLocation(name);
  }
}
