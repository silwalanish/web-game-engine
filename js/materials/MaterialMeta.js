import { UniformMeta } from "../renderEngine/shaders/UniformMeta.js";

export class MaterialMeta extends UniformMeta {}

export class MetaValidator {
  static _verifyDefaultValue(name, meta) {
    if (!meta.defaultValue && meta.isRequired) {
      throw new Error(
        `defaultValue is required for ${name} as it is a required property.`
      );
    }

    return true;
  }

  static validate(metas) {
    let isValid = true;
    for (let [name, meta] of metas) {
      isValid &= this._verifyDefaultValue(name, meta);
    }

    return isValid;
  }
}
