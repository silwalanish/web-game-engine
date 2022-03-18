import uv from "./uv.js";
import base from "./base.js";
import light from "./light.js";
import phong from "./phong.js";
import normal from "./normal.js";

export const SHADER_CHUNKS = new Map([
  ...base,
  ...uv,
  ...normal,
  ...light,
  ...phong,
]);
