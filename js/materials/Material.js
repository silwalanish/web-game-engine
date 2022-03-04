import { uuidv4 } from "../utils/random.js";
import { MetaValidator } from "./MaterialMeta.js";
import { MaterialShader } from "../renderEngine/shaders/MaterialShader.js";

export class Material {
  constructor(meta, shaderClass = MaterialShader) {
    if (!MetaValidator.validate(meta)) {
      throw new Error("Invalid material meta.");
    }

    this._id = uuidv4();
    this._meta = meta;
    this._shaderClass = shaderClass;
  }

  get id() {
    return this._id;
  }

  get meta() {
    return this._meta;
  }

  get shaderClass() {
    return this._shaderClass;
  }
}
