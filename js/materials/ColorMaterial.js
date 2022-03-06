import { Material } from "./Material.js";
import { MaterialMeta } from "./MaterialMeta.js";
import { MaterialShader } from "../renderEngine/shaders/MaterialShader.js";

export class ColorMaterial extends Material {
  static Meta = new Map([
    ["color", new MaterialMeta("vec3", true, [1.0, 0.0, 0.0])],
  ]);

  static Shader = class extends MaterialShader {
    vertex() {
      return `
      #include <vertex_base_attrib>

      void vertex() {
        gl_Position = vec4(POSITION, 1.0);
      }
      `;
    }

    fragment() {
      return `
      #include <fragment_base_attrib>

      #material color

      void fragment() {
        FRAG_COLOR = vec4(color, 1.0);
      }
      `;
    }
  };

  constructor(color) {
    super(ColorMaterial.Meta, ColorMaterial.Shader);
    this.color = color;
  }
}
