import { MouseManager } from "./MouseManager.js";
import { KeyboardManager } from "./KeyboardManager.js";

export class DisplayManager {
  static CANVAS = null;
  static _IS_FULLSCREEN = false;

  static _updateDimensions(width, height) {
    DisplayManager.CANVAS.width = width;
    DisplayManager.CANVAS.height = height;
  }

  static _requestFullScreen() {
    DisplayManager.CANVAS.requestFullscreen();
  }

  static _onFullscreen() {
    DisplayManager._IS_FULLSCREEN = document.fullscreenElement ? true : false;
  }

  static isFullscreen() {
    return DisplayManager._IS_FULLSCREEN;
  }

  static createDisplay(width, height) {
    if (!DisplayManager.CANVAS) {
      DisplayManager.CANVAS = document.createElement("canvas");
      document.body.appendChild(DisplayManager.CANVAS);

      document.addEventListener("keydown", KeyboardManager.onKeyDown);
      document.addEventListener("keyup", KeyboardManager.onKeyUp);

      DisplayManager.CANVAS.addEventListener(
        "mousedown",
        MouseManager.onMouseDown
      );
      DisplayManager.CANVAS.addEventListener("mouseup", MouseManager.onMouseUp);
      DisplayManager.CANVAS.addEventListener(
        "mouseenter",
        MouseManager.onMouseEnter
      );
      DisplayManager.CANVAS.addEventListener(
        "mouseleave",
        MouseManager.onMouseLeave
      );
      DisplayManager.CANVAS.addEventListener(
        "mousemove",
        MouseManager.onMouseMove
      );

      DisplayManager.CANVAS.addEventListener(
        "fullscreenchange",
        DisplayManager._onFullscreen
      );

      DisplayManager.CANVAS.addEventListener(
        "dblclick",
        DisplayManager._requestFullScreen
      );
    }

    DisplayManager._updateDimensions(width, height);
  }
}
