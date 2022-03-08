import { Transform } from "./Transform.js";
import { uuidv4 } from "../utils/random.js";
import { TRANSFORM_COMPONENT } from "./Components.js";
import { ComponentManager } from "./ComponentManager.js";

export class GameObject extends ComponentManager {
  constructor() {
    super();
    this._id = uuidv4();

    this.addComponent(TRANSFORM_COMPONENT, new Transform());
  }

  update() {
    super.update();
  }
}
