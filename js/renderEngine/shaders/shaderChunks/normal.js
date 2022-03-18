import { NORMAL_MATRIX_UNIFORM } from "../ShaderUniforms.js";
import { NORMAL_ATTRIB_LOCATION } from "../ShaderAttributes.js";

export default new Map([
  [
    "vertex_normal_attrib",
    {
      source: `
        #attribute NORMAL

        #uniform ${NORMAL_MATRIX_UNIFORM}

        #output FRAG_NORMAL
      `,
      attribsMeta: new Map([
        ["NORMAL", { type: "vec3", location: NORMAL_ATTRIB_LOCATION }],
        ["FRAG_NORMAL", { type: "vec3" }],
      ]),
      uniformsMeta: new Map([[NORMAL_MATRIX_UNIFORM, { type: "mat3" }]]),
    },
  ],
  [
    "fragment_normal_attrib",
    {
      source: `
        #attribute FRAG_NORMAL
      `,
      attribsMeta: new Map([["FRAG_NORMAL", { type: "vec3" }]]),
      uniformsMeta: null,
    },
  ],
]);
