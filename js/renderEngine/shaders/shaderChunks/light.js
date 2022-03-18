import {
  LIGHT_POSITION_UNIFORM,
  LIGHT_AMBIENT_COLOR_UNIFORM,
  LIGHT_DIFFUSE_COLOR_UNIFORM,
} from "../ShaderUniforms.js";

export default new Map([
  [
    "light",
    {
      source: `
        #uniform ${LIGHT_POSITION_UNIFORM}
        #uniform ${LIGHT_AMBIENT_COLOR_UNIFORM}
        #uniform ${LIGHT_DIFFUSE_COLOR_UNIFORM}
      `,
      attribsMeta: null,
      uniformsMeta: new Map([
        [LIGHT_POSITION_UNIFORM, { type: "vec3" }],
        [LIGHT_AMBIENT_COLOR_UNIFORM, { type: "vec3" }],
        [LIGHT_DIFFUSE_COLOR_UNIFORM, { type: "vec3" }],
      ]),
    },
  ],
]);
