import { uuidv4 } from "../utils/random.js";
import { ComponentManager } from "./ComponentManager.js";

export class GameObject extends ComponentManager {
  constructor() {
    super();
    this._id = uuidv4();
  }

  update() {
    super.update();
  }
}
