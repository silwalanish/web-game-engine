export class DisplayManager {
  static CANVAS = null;
  static WIDTH = 750;
  static HEIGHT = 600;

  static _updateDimensions() {
    DisplayManager.CANVAS.width = this.WIDTH;
    DisplayManager.CANVAS.height = this.HEIGHT;
  }

  static createDisplay() {
    if (!DisplayManager.CANVAS) {
      DisplayManager.CANVAS = document.createElement("canvas");
      document.body.appendChild(DisplayManager.CANVAS);
    }

    DisplayManager._updateDimensions();
  }
}
