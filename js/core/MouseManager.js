import { vec2 } from "https://cdn.skypack.dev/gl-matrix";

export class MouseManager {
  static _MOUSE_DOWN = false;

  static POSITION = vec2.fromValues(0, 0);

  static onMouseDown(e) {
    MouseManager._MOUSE_DOWN = true;
    MouseManager.POSITION = vec2.fromValues(e.clientX, e.clientY);
  }

  static onMouseUp(e) {
    MouseManager._MOUSE_DOWN = false;
    MouseManager.POSITION = vec2.fromValues(e.clientX, e.clientY);
  }

  static onMouseEnter(e) {
    MouseManager._MOUSE_DOWN = false;
    MouseManager.POSITION = vec2.fromValues(e.clientX, e.clientY);
  }

  static onMouseLeave(e) {
    MouseManager._MOUSE_DOWN = false;
    MouseManager.POSITION = vec2.fromValues(e.clientX, e.clientY);
  }

  static onMouseMove(e) {
    MouseManager.POSITION = vec2.fromValues(e.clientX, e.clientY);
  }

  static isLeftMouseButtonDown() {
    return MouseManager._MOUSE_DOWN;
  }
}
