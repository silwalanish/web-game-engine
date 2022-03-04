import { Shader } from "./Shader.js";

const DEFAULT_ATTRIBS_META = new Map();
DEFAULT_ATTRIBS_META.set("POSITION", { type: "vec3" });
DEFAULT_ATTRIBS_META.set("FRAG_COLOR", { type: "vec4" });

const DEFAULT_ATTRIBS_MAP = new Map();
DEFAULT_ATTRIBS_MAP.set("vertex_input_attrib", "#attribute POSITION");
DEFAULT_ATTRIBS_MAP.set("vertex_output_attrib", "");
DEFAULT_ATTRIBS_MAP.set("fragment_input_attrib", "");
DEFAULT_ATTRIBS_MAP.set("fragment_output_attrib", "#output FRAG_COLOR");

export class MaterialShader extends Shader {
  constructor(materialMeta) {
    super(DEFAULT_ATTRIBS_META, DEFAULT_ATTRIBS_MAP, materialMeta);
    this._materialMeta = materialMeta;
  }

  loadMaterial(material) {
    this.loadUniforms(material);
  }
}
