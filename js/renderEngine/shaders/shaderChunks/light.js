import { UniformMeta } from "../UniformMeta.js";
import { LIGHTS_UNIFORM } from "../ShaderUniforms.js";

const MAX_NUM_OF_LIGHTS = 4;

function unrollLightUniforms(count) {
  let meta = new Map();
  for (let i = 0; i < count; i++) {
    meta.set(
      `${LIGHTS_UNIFORM}[${i}].isActive`,
      new UniformMeta("int", false, 0)
    );
    meta.set(`${LIGHTS_UNIFORM}[${i}].type`, new UniformMeta("int", false, 0));
    meta.set(`${LIGHTS_UNIFORM}[${i}].position`, new UniformMeta("vec3"));
    meta.set(`${LIGHTS_UNIFORM}[${i}].orientation`, new UniformMeta("vec3"));
    meta.set(`${LIGHTS_UNIFORM}[${i}].ambient`, new UniformMeta("vec3"));
    meta.set(`${LIGHTS_UNIFORM}[${i}].diffuse`, new UniformMeta("vec3"));
    meta.set(`${LIGHTS_UNIFORM}[${i}].attenuation`, new UniformMeta("vec3"));
  }

  return meta;
}

export default new Map([
  [
    "light",
    {
      source: `
        #define MAX_NUM_OF_LIGHTS ${MAX_NUM_OF_LIGHTS}

        struct Light {
          int type;
          int isActive;

          vec3 position;
          vec3 orientation;
          vec3 diffuse;
          vec3 ambient;
          vec3 attenuation;
        };

        #uniform ${LIGHTS_UNIFORM}[MAX_NUM_OF_LIGHTS]

        float calculateAttenuation(float d, vec3 attenuation) {
          return 1.0 / (attenuation.x + attenuation.y * d + attenuation.z * d * d);
        }
      `,
      attribsMeta: null,
      uniformsMeta: new Map([
        [
          LIGHTS_UNIFORM,
          new UniformMeta("Light", false, null, MAX_NUM_OF_LIGHTS),
        ],
        ...unrollLightUniforms(MAX_NUM_OF_LIGHTS),
      ]),
    },
  ],
]);
