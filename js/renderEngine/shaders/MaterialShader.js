import { Shader } from "./Shader.js";

export class MaterialShader extends Shader {
  constructor(renderer, materialMeta) {
    super(renderer, materialMeta);
    this._materialMeta = materialMeta;
  }

  loadMaterial(material) {
    this.loadUniforms(material);
  }
}
