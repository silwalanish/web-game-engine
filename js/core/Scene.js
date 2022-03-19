import { Camera } from "./Camera.js";
import { DisplayManager } from "./DisplayManager.js";

const FOV = 70;

export class Scene {
  constructor() {
    this.camera = new Camera(
      FOV,
      DisplayManager.CANVAS.width / DisplayManager.CANVAS.height
    );
    this.objects = [this.camera];
    this.lights = [];
  }

  async initialize() {
    await this.onInit();
  }

  addObject(object) {
    this.objects.push(object);
  }

  addLight(light) {
    this.lights.push(light);
    this.addObject(light);
  }

  update() {
    for (let object of this.objects) {
      object.update();
    }

    this.onUpdate();
  }

  async onInit() {}

  onUpdate() {}
}
