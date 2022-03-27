import { vec2 } from "https://cdn.skypack.dev/gl-matrix";

import { MouseManager } from "../MouseManager.js";
import { BaseComponent } from "./BaseComponent.js";
import { TRANSFORM_COMPONENT } from "./Components.js";

export class LookAroundControl extends BaseComponent {
  constructor(sensitivity) {
    super();
    this.sensitivity = sensitivity;

    this.delta = vec2.create();
    this.old_position = vec2.create();
  }

  update() {
    let transform = this.parent.getComponent(TRANSFORM_COMPONENT);
    if (
      transform &&
      MouseManager.isLeftMouseButtonDown()
    ) {
      this.delta = vec2.sub(vec2.create(), MouseManager.POSITION, this.old_position);

      vec2.scale(this.delta, this.delta, this.sensitivity);

      transform.rotation[1] += this.delta[0];
      transform.rotation[0] -= this.delta[1];

      if (Math.abs(transform.rotation[0]) > 89.0) {
        transform.rotation[0] = 89.0 * Math.sign(transform.rotation[0]);
      }
    }

    this.delta[0] = 0;
    this.delta[1] = 0;    
    this.old_position[0] = MouseManager.POSITION[0];
    this.old_position[1] = MouseManager.POSITION[1];
  }
}
