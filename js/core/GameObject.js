import { uuidv4 } from "../utils/random.js";
import { Transform } from "./components/Transform.js";
import { TRANSFORM_COMPONENT } from "./components/Components.js";
import { ComponentManager } from "./components/ComponentManager.js";

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
