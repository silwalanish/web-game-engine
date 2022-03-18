import { vec2 } from "https://cdn.skypack.dev/gl-matrix";

export class MouseManager {
  static _MOUSE_DOWN = false;
  static _FIRST_MOVE = true;

  static POSITION = vec2.fromValues(0, 0);
  static _OLD_POSITION = vec2.fromValues(0, 0);

  static DELTA = vec2.create();

  static _saveOldPosition(e) {
    MouseManager._OLD_POSITION = vec2.clone(MouseManager.POSITION);
    MouseManager.POSITION = vec2.fromValues(e.clientX, e.clientY);
  }

  static onMouseDown(e) {
    MouseManager._MOUSE_DOWN = true;
    MouseManager._saveOldPosition(e);
  }

  static onMouseUp(e) {
    MouseManager._MOUSE_DOWN = false;
    MouseManager._saveOldPosition(e);
  }

  static onMouseEnter(e) {
    MouseManager._MOUSE_DOWN = false;
    MouseManager.POSITION = vec2.fromValues(e.clientX, e.clientY);
    MouseManager._OLD_POSITION = vec2.clone(MouseManager.POSITION);
    MouseManager.DELTA = vec2.create();
  }

  static onMouseLeave(e) {
    MouseManager._MOUSE_DOWN = false;
    MouseManager.POSITION = vec2.fromValues(e.clientX, e.clientY);
    MouseManager._OLD_POSITION = vec2.clone(MouseManager.POSITION);
    MouseManager.DELTA = vec2.create();
  }

  static onMouseMove(e) {
    MouseManager._saveOldPosition(e);

    if (!MouseManager._FIRST_MOVE) {
      MouseManager.DELTA = vec2.create();
      vec2.sub(
        MouseManager.DELTA,
        MouseManager.POSITION,
        MouseManager._OLD_POSITION
      );
    }

    MouseManager._FIRST_MOVE = false;
  }

  static isLeftMouseButtonDown() {
    return MouseManager._MOUSE_DOWN;
  }
}
