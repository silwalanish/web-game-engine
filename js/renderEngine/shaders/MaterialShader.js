import { Shader } from "./Shader.js";

export class MaterialShader extends Shader {
  constructor(materialMeta) {
    super(materialMeta);
    this._materialMeta = materialMeta;
  }

  loadMaterial(material) {
    this.loadUniforms(material);
  }
}
