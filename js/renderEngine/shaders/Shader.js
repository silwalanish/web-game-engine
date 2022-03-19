import { GL } from "../GL.js";
import { uuidv4 } from "../../utils/random.js";
import { UniformCache } from "./UniformCache.js";
import { UniformLoader } from "./UniformLoader.js";
import { ShaderCompiler } from "./ShaderCompiler.js";
import { ShaderPreProcessor } from "./ShaderPreProcessor.js";

export class Shader {
  constructor(renderer, uniformsMeta, attribsMeta) {
    this._id = uuidv4();
    this._textureBindCount = 0;
    this._textures = new Map();
    this._renderer = renderer;
    this._webglShaderId = null;
    this._attribsMeta = attribsMeta || new Map();
    this._uniformsMeta = uniformsMeta || new Map();
    this._uniformsLoader = new UniformLoader();
    this._uniformsCache = new UniformCache(this._uniformsMeta);
  }

  vertex() {
    throw new Error("vertex is not implemented!");
  }

  fragment() {
    throw new Error("fragment is not implemented!");
  }

  reset() {
    this._textureBindCount = 0;
    this._textures.clear();
  }

  start() {
    GL.useProgram(this._webglShaderId);
  }

  stop() {
    GL.useProgram(null);
  }

  cleanUp() {
    GL.deleteProgram(this._webglShaderId);
    this._webglShaderId = null;
  }

  loadUniforms(uniforms) {
    for (let [name, meta] of this._uniformsMeta) {
      if (uniforms[name] == null) {
        continue;
      }

      let value = uniforms[name];
      if (meta.type === "sampler2D") {
        if (!this._textures.has(value.id)) {
          this._textures.set(value.id, {
            index: this._textureBindCount,
            webGLTextureId:
              this._renderer.textureLoader.loadToWebGLTexture(value),
          });

          value = this._textureBindCount++;
        } else {
          value = this._textures.get(value.id).index;
        }
      }

      this._uniformsCache.setValue(name, value);
    }
  }

  bindTextures() {
    for (let [_, { index, webGLTextureId }] of this._textures) {
      GL.activeTexture(GL.TEXTURE0 + index);
      GL.bindTexture(GL.TEXTURE_2D, webGLTextureId);
    }
  }

  loadUniformsToGPU() {
    this._uniformsLoader.loadToGPU(this._uniformsCache, this._uniformsMeta);
  }

  compile() {
    const sourceMap = new Map();
    sourceMap.set("vertex_source", this.vertex());
    sourceMap.set("fragment_source", this.fragment());

    let shaderSource = new ShaderPreProcessor().generate({
      sourceMap,
      attribsMeta: this._attribsMeta,
      uniformsMeta: this._uniformsMeta,
    });

    this._webglShaderId = ShaderCompiler.compile(shaderSource);

    this._uniformsLoader.setWebGLProgramId(this._webglShaderId);
    this._uniformsLoader.cacheUniformLocations(this._uniformsMeta);
  }

  getUniformMeta(key) {
    return this._uniformsMeta.get(key);
  }
}
