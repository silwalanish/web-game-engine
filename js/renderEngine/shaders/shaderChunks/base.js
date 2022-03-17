import { POSITION_ATTRIB_LOCATION } from "../ShaderAttributes.js";
import {
  MODEL_MATRIX_UNIFORM,
  PROJECTION_MATRIX_UNIFORM,
} from "../ShaderUniforms.js";

export default new Map([
  [
    "vertex_base_attrib",
    {
      source: `
        #attribute POSITION

        #uniform ${PROJECTION_MATRIX_UNIFORM}
        #uniform ${MODEL_MATRIX_UNIFORM}
      `,
      attribsMeta: new Map([
        ["POSITION", { type: "vec3", location: POSITION_ATTRIB_LOCATION }],
      ]),
      uniformsMeta: new Map([
        [PROJECTION_MATRIX_UNIFORM, { type: "mat4" }],
        [MODEL_MATRIX_UNIFORM, { type: "mat4" }],
      ]),
    },
  ],
  [
    "fragment_base_attrib",
    {
      source: `
        #output FRAG_COLOR
      `,
      attribsMeta: new Map([["FRAG_COLOR", { type: "vec4" }]]),
      uniformsMeta: null,
    },
  ],
]);
