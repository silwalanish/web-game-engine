import { GL } from "../GL.js";
import { UniformLocationCache } from "./UniformLocationCache.js";

export class UniformLoader {
  constructor() {
    this._webGLProgramId = null;
    this._uniformLocationsCache = new UniformLocationCache();
  }

  setWebGLProgramId(id) {
    this._webGLProgramId = id;
    this._uniformLocationsCache.setWebGLProgramId(id);
  }

  cacheUniformLocations(uniformsMeta) {
    this._uniformLocationsCache.cache(uniformsMeta);
  }

  _loadVec3(name, value) {
    GL.uniform3fv(
      this._uniformLocationsCache.getLocation(name),
      value
    );
  }

  loadToGPU(uniforms, metas) {
    for (let [name, meta] of metas) {
      if (uniforms.hasChanged(name)) {
        switch (meta.type) {
          case "vec3":
            this._loadVec3(name, uniforms.getValue(name));
            uniforms.markAsLoaded(name);
            break;

          default:
            break;
        }
      }
    }
  }
}
