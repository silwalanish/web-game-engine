import { UV_ATTRIB_LOCATION } from "../ShaderAttributes.js";

export default new Map([
  [
    "vertex_uv_attrib",
    {
      source: `
        #attribute UV
        #output FRAG_UV
      `,
      attribsMeta: new Map([
        ["UV", { type: "vec2", location: UV_ATTRIB_LOCATION }],
        ["FRAG_UV", { type: "vec2" }],
      ]),
      uniformsMeta: null,
    },
  ],
  [
    "fragment_uv_attrib",
    {
      source: `
        #attribute FRAG_UV
      `,
      attribsMeta: new Map([["FRAG_UV", { type: "vec2" }]]),
      uniformsMeta: null,
    },
  ],
]);
