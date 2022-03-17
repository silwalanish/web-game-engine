import { BaseComponent } from "./BaseComponent.js";
import { MapWithDefault } from "../../utils/MapWithDefault.js";

export class ComponentManager {
  constructor() {
    this._components = new MapWithDefault();
  }

  update() {
    for (let [_, components] of this._components) {
      for (let component of components) {
        if (component.parent !== this) {
          // Remove the component if it's parent has been updated.
          components.splice(components.indexOf(component), 1);
          continue;
        }
        component.update();
      }
    }
  }

  hasComponent(key) {
    return this._components.has(key);
  }

  addComponent(key, component) {
    if (!(component instanceof BaseComponent)) {
      throw new TypeError("component must extend from BaseComponent.");
    }

    component.parent = this;
    if (this._components.has(key)) {
      this._components.get(key).push(component);
      return;
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
