import { GameObject } from "./GameObject.js";

export class Light extends GameObject {
  constructor(diffuse, ambient) {
    super();
    this.diffuse = diffuse;
    this.ambient = ambient || [0.1, 0.1, 0.1];
  }
}
