import { Material } from "./Material.js";
import { MaterialMeta } from "./MaterialMeta.js";
import { MaterialShader } from "../renderEngine/shaders/MaterialShader.js";

export class TextureMaterial extends Material {
  static Meta = new Map([
    ["image", new MaterialMeta("sampler2D", true, 0)],
  ]);

  static Shader = class extends MaterialShader {
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
