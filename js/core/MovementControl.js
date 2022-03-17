import { TRANSFORM_COMPONENT } from "./Components.js";
import { KeyboardManager, Keys } from "./KeyboardManager.js";

export class MovementControl {
  constructor(speed, object) {
    this._speed = speed;
    this._object = object;

    this._moveSpeed = [0, 0];
    this._turnSpeed = 0;
  }

  checkInput() {
    if (
      KeyboardManager.isKeyPressed(Keys.CODE_UP) ||
      KeyboardManager.isKeyPressed(Keys.CODE_W)
    ) {
      this._moveSpeed[0] = -this._speed;
    } else if (
      KeyboardManager.isKeyPressed(Keys.CODE_DOWN) ||
      KeyboardManager.isKeyPressed(Keys.CODE_S)
    ) {
      this._moveSpeed[0] = this._speed;
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

    let transform = this._object.getComponent(TRANSFORM_COMPONENT);
    if (transform) {
      transform.position[0] += this._moveSpeed[1];
      transform.position[2] += this._moveSpeed[0];
    }
  }
}
