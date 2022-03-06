import { Material } from "./Material.js";
import { MaterialMeta } from "./MaterialMeta.js";
import { MaterialShader } from "../renderEngine/shaders/MaterialShader.js";

export class TextureMaterial extends Material {
  static Meta = new Map([
    ["image", new MaterialMeta("sampler2D", true, 0)],
  ]);

  static Shader = class extends MaterialShader {
    vertex() {
      return `
      #include <vertex_base_attrib>
      #include <vertex_uv_attrib>

      void vertex() {
        gl_Position = vec4(POSITION, 1.0);
        FRAG_UV = UV;
      }
      `;
    }

    fragment() {
      return `
      #include <fragment_base_attrib>
      #include <fragment_uv_attrib>

      #material image

      void fragment() {
        vec3 color = texture(image, FRAG_UV).rgb;
        FRAG_COLOR = vec4(color, 1.0);
      }
      `;
    }
  };

  constructor(image) {
    super(TextureMaterial.Meta, TextureMaterial.Shader);
    this.image = image;
  }
}
