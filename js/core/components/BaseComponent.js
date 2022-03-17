export class BaseComponent {
  constructor() {
    this._parent = null;
  }

  set parent(parent) {
    this._parent = parent;
  }

  get parent() {
    return this._parent;
  }

  update() {
    throw new Error("update() is not defined.");
  }
}
