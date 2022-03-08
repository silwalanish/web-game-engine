import { POSITION_ATTRIB_LOCATION } from "../ShaderAttributes.js";

export default new Map([
  [
    "vertex_base_attrib",
    {
      source: `
        #attribute POSITION

        #uniform modelMat
      `,
      attribsMeta: new Map([
        ["POSITION", { type: "vec3", location: POSITION_ATTRIB_LOCATION }],
      ]),
      uniformsMeta: new Map([["modelMat", { type: "mat4" }]]),
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
