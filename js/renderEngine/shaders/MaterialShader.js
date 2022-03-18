import { Shader } from "./Shader.js";
import {
  MODEL_MATRIX_UNIFORM,
  NORMAL_MATRIX_UNIFORM,
  PROJECTION_MATRIX_UNIFORM,
  VIEW_MATRIX_UNIFORM,
} from "./ShaderUniforms.js";

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
    #include <vertex_normal_attrib>

    void vertex() {
      vec4 WORLD_POSITION = ${MODEL_MATRIX_UNIFORM} * vec4(POSITION, 1.0);

      gl_Position = ${PROJECTION_MATRIX_UNIFORM} * ${VIEW_MATRIX_UNIFORM} * WORLD_POSITION;
      FRAG_UV = UV;
      FRAG_POSITION = vec3(WORLD_POSITION);
      FRAG_NORMAL = ${NORMAL_MATRIX_UNIFORM} * NORMAL;
    }
    `;
  }
}
