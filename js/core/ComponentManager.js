import { MapWithDefault } from "../utils/MapWithDefault.js";

export class ComponentManager {
  constructor() {
    this._components = new MapWithDefault();
  }

  update() {
    for (let [_, components] of this._components) {
      for (let component of components) {
        if (typeof component.update === "function") {
          component.update();
        }
      }
    }
  }

  hasComponent(key) {
    return this._components.has(key);
  }

  addComponent(key, component) {
    if (this._components.has(key)) {
      this._components.get(key).push(component);
    }

    this._components.set(key, [component]);
  }

  removeAllComponents(key) {
    this._components.delete(key);
  }

  removeComponent(key) {
    this._components.getOrDefault(key, []).splice(0, 1);
  }

  getAllComponents(key) {
    return this._components.getOrDefault(key, []);
  }

  getComponent(key) {
    return this._components.getOrDefault(key, [])[0];
  }
}
