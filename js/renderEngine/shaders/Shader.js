import { GL } from "../GL.js";
import { uuidv4 } from "../../utils/random.js";
import { UniformCache } from "./UniformCache.js";
import { UniformLoader } from "./UniformLoader.js";
import { ShaderCompiler } from "./ShaderCompiler.js";
import { ShaderPreProcessor } from "./ShaderPreProcessor.js";

export class Shader {
  constructor(uniformsMeta, attribsMeta) {
    this._id = uuidv4();
    this._webglShaderId = null;
    this._attribsMeta = attribsMeta;
    this._uniformsMeta = uniformsMeta;
    this._uniformsLoader = new UniformLoader();
    this._uniformsCache = new UniformCache(this._uniformsMeta);
  }

  vertex() {
    throw new Error("vertex is not implemented!");
  }

  fragment() {
    throw new Error("fragment is not implemented!");
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
    for (let [name, _] of this._uniformsMeta) {
      if (uniforms[name] == null) {
        continue;
      }
      this._uniformsCache.setValue(name, uniforms[name]);
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
}
