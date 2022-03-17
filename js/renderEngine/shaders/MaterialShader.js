import { Shader } from "./Shader.js";

export class MaterialShader extends Shader {
  constructor(renderer, materialMeta) {
    super(renderer, materialMeta);
    this._materialMeta = materialMeta;
  }

  loadMaterial(material) {
    this.loadUniforms(material);
  }

  vertex() {
    return `
    #include <vertex_base_attrib>
    #include <vertex_uv_attrib>

    void vertex() {
      gl_Position = projMat * modelMat * vec4(POSITION, 1.0);
      FRAG_UV = UV;
    }
    `;
  }
}
