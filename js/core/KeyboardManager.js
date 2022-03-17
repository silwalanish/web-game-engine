import * as KeyCode from "https://cdn.skypack.dev/keycode-js";

export const Keys = KeyCode;

export class KeyboardManager {
  static _KEY_STATES = {};

  static isKeyPressed(key) {
    return KeyboardManager._KEY_STATES[key];
  }

  static onKeyDown(e) {
    KeyboardManager._KEY_STATES[e.code] = true;
  }

  static onKeyUp(e) {
    KeyboardManager._KEY_STATES[e.code] = false;
  }
}
