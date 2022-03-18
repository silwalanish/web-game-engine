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

  _loadInt(name, value) {
    GL.uniform1i(this._uniformLocationsCache.getLocation(name), value);
  }

  _loadFloat(name, value) {
    GL.uniform1f(this._uniformLocationsCache.getLocation(name), value);
  }

  _loadVec3(name, value) {
    GL.uniform3fv(this._uniformLocationsCache.getLocation(name), value);
  }

  _loadMat3(name, value) {
    GL.uniformMatrix3fv(
      this._uniformLocationsCache.getLocation(name),
      false,
      value
    );
  }

  _loadMat4(name, value) {
    GL.uniformMatrix4fv(
      this._uniformLocationsCache.getLocation(name),
      false,
      value
    );
  }

  loadToGPU(uniforms, metas) {
    for (let [name, meta] of metas) {
      if (uniforms.hasChanged(name)) {
        switch (meta.type) {
          case "float":
            this._loadFloat(name, uniforms.getValue(name));
            break;

          case "int":
            this._loadInt(name, uniforms.getValue(name));
            break;

          case "vec3":
            this._loadVec3(name, uniforms.getValue(name));
            break;

          case "mat3":
            this._loadMat3(name, uniforms.getValue(name));
            break;

          case "mat4":
            this._loadMat4(name, uniforms.getValue(name));
            break;

          case "sampler2D":
            this._loadInt(name, uniforms.getValue(name));
            break;

          default:
            break;
        }
        uniforms.markAsLoaded(name);
      }
    }
  }
}
