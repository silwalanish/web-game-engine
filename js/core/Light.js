import { GameObject } from "./GameObject.js";
import { TRANSFORM_COMPONENT } from "./components/Components.js";

export const DIRECTION_LIGHT = 0;
export const POINT_LIGHT = 1;

export class Light extends GameObject {
  constructor(type, diffuse, ambient, attenuation) {
    super();
    this.type = type;
    this.diffuse = diffuse;
    this.ambient = ambient || [0.1, 0.1, 0.1];
    this.attenuation = attenuation || [1.0, 0.045, 0.0075];
  }

  get position() {
    return this.getComponent(TRANSFORM_COMPONENT).position;
  }

  get orientation() {
    return this.getComponent(TRANSFORM_COMPONENT).front;
  }
}
