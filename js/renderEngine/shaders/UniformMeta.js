export class UniformMeta {
  constructor(type, isRequired, defaultValue) {
    this.type = type;
    this.isRequired = isRequired || false;
    this.defaultValue = defaultValue;
  }
}
