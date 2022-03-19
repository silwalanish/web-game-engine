export class UniformMeta {
  constructor(type, isRequired, defaultValue, count) {
    this.type = type;
    this.count = count || 1;
    this.isRequired = isRequired || false;
    this.defaultValue = defaultValue;
  }
}
