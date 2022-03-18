import { POSITION_ATTRIB_LOCATION } from "../ShaderAttributes.js";
import {
  CAMERA_POSITION_UNIFORM,
  MODEL_MATRIX_UNIFORM,
  PROJECTION_MATRIX_UNIFORM,
  VIEW_MATRIX_UNIFORM,
} from "../ShaderUniforms.js";

export default new Map([
  [
    "vertex_base_attrib",
    {
      source: `
        #attribute POSITION

        #uniform ${PROJECTION_MATRIX_UNIFORM}
        #uniform ${VIEW_MATRIX_UNIFORM}
        #uniform ${MODEL_MATRIX_UNIFORM}

        #output FRAG_POSITION
      `,
      attribsMeta: new Map([
        ["POSITION", { type: "vec3", location: POSITION_ATTRIB_LOCATION }],
        ["FRAG_POSITION", { type: "vec3" }],
      ]),
      uniformsMeta: new Map([
        [PROJECTION_MATRIX_UNIFORM, { type: "mat4" }],
        [VIEW_MATRIX_UNIFORM, { type: "mat4" }],
        [MODEL_MATRIX_UNIFORM, { type: "mat4" }],
      ]),
    },
  ],
  [
    "fragment_base_attrib",
    {
      source: `
        #attribute FRAG_POSITION

        #uniform ${CAMERA_POSITION_UNIFORM}

        #output FRAG_COLOR
      `,
      attribsMeta: new Map([
        ["FRAG_COLOR", { type: "vec4" }],
        ["FRAG_POSITION", { type: "vec3" }],
      ]),
      uniformsMeta: new Map([[CAMERA_POSITION_UNIFORM, { type: "vec3" }]]),
    },
  ],
]);
