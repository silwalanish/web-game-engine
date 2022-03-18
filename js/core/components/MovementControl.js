import { vec3 } from "https://cdn.skypack.dev/gl-matrix";

import { BaseComponent } from "./BaseComponent.js";
import { TRANSFORM_COMPONENT } from "./Components.js";
import { KeyboardManager, Keys } from "../KeyboardManager.js";

export class MovementControl extends BaseComponent {
  constructor(speed) {
    super();

    this._speed = speed;

    this._moveSpeed = [0, 0];
    this._turnSpeed = 0;
  }

  checkInput() {
    if (
      KeyboardManager.isKeyPressed(Keys.CODE_UP) ||
      KeyboardManager.isKeyPressed(Keys.CODE_W)
    ) {
      this._moveSpeed[0] = this._speed;
    } else if (
      KeyboardManager.isKeyPressed(Keys.CODE_DOWN) ||
      KeyboardManager.isKeyPressed(Keys.CODE_S)
    ) {
      this._moveSpeed[0] = -this._speed;
    } else {
      this._moveSpeed[0] = 0;
    }

    if (
      KeyboardManager.isKeyPressed(Keys.CODE_LEFT) ||
      KeyboardManager.isKeyPressed(Keys.CODE_A)
    ) {
      this._moveSpeed[1] = -this._speed;
    } else if (
      KeyboardManager.isKeyPressed(Keys.CODE_RIGHT) ||
      KeyboardManager.isKeyPressed(Keys.CODE_D)
    ) {
      this._moveSpeed[1] = this._speed;
    } else {
      this._moveSpeed[1] = 0;
    }
  }

  update() {
    this.checkInput();

    let transform = this.parent.getComponent(TRANSFORM_COMPONENT);
    if (transform) {
      vec3.scaleAndAdd(
        transform.position,
        transform.position,
        transform.front,
        this._moveSpeed[0]
      );
      vec3.scaleAndAdd(
        transform.position,
        transform.position,
        transform.right,
        this._moveSpeed[1]
      );
    }
  }
}
