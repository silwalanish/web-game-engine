import { vec2 } from "https://cdn.skypack.dev/gl-matrix";

import { MouseManager } from "../MouseManager.js";
import { BaseComponent } from "./BaseComponent.js";
import { TRANSFORM_COMPONENT } from "./Components.js";

export class LookAroundControl extends BaseComponent {
  constructor(sensitivity) {
    super();
    this.sensitivity = sensitivity;
  }

  update() {
    let transform = this.parent.getComponent(TRANSFORM_COMPONENT);
    if (transform && MouseManager.isLeftMouseButtonDown()) {
      let delta = vec2.clone(MouseManager.DELTA);
      vec2.scale(delta, delta, this.sensitivity);

      transform.rotation[1] -= delta[0];
      transform.rotation[0] += delta[1];

      if (Math.abs(transform.rotation[0]) > 89.0) {
        transform.rotation[0] = 89.0 * Math.sign(transform.rotation[0]);
      }
    }
  }
}
