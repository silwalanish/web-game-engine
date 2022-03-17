export class DisplayManager {
  static CANVAS = null;

  static _updateDimensions(width, height) {
    DisplayManager.CANVAS.width = width;
    DisplayManager.CANVAS.height = height;
  }

  static createDisplay(width, height) {
    if (!DisplayManager.CANVAS) {
      DisplayManager.CANVAS = document.createElement("canvas");
      document.body.appendChild(DisplayManager.CANVAS);
    }

    DisplayManager._updateDimensions(width, height);
  }
}
