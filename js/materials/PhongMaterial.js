import { Material } from "./Material.js";
import { MaterialMeta } from "./MaterialMeta.js";
import { MaterialShader } from "../renderEngine/shaders/MaterialShader.js";
import {
  CAMERA_POSITION_UNIFORM,
  LIGHT_AMBIENT_COLOR_UNIFORM,
  LIGHT_DIFFUSE_COLOR_UNIFORM,
  LIGHT_POSITION_UNIFORM,
} from "../renderEngine/shaders/ShaderUniforms.js";

export class PhongMaterial extends Material {
  static Meta = new Map([
    ["diffuseMap", new MaterialMeta("sampler2D", true, 0)],
    ["specularMap", new MaterialMeta("sampler2D", true, 1)],
    ["shininess", new MaterialMeta("float", true, 32)],
  ]);

  static Shader = class extends MaterialShader {
    fragment() {
      return `
      #include <fragment_base_attrib>
      #include <fragment_uv_attrib>
      #include <fragment_normal_attrib>

      #include <light>
      #include <phong>

      #material diffuseMap
      #material specularMap
      #material shininess

      void fragment() {
        vec3 diffuse = texture(diffuseMap, FRAG_UV).rgb;
        vec3 specular = texture(specularMap, FRAG_UV).rgb;

        vec3 phongOutput = phongShading(diffuse, specular, shininess, 
          FRAG_NORMAL, FRAG_POSITION, ${CAMERA_POSITION_UNIFORM},
          ${LIGHT_POSITION_UNIFORM}, ${LIGHT_AMBIENT_COLOR_UNIFORM}, ${LIGHT_DIFFUSE_COLOR_UNIFORM});

        FRAG_COLOR = vec4(phongOutput, 1.0);
      }
      `;
    }
  };

  constructor(diffuseMap, specularMap, shininess) {
    super(PhongMaterial.Meta, PhongMaterial.Shader);
    this.diffuseMap = diffuseMap;
    this.specularMap = specularMap;
    this.shininess = shininess;
  }
}
