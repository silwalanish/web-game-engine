import { BaseComponent } from "./BaseComponent.js";

export class MeshComponent extends BaseComponent {
  constructor(mesh, material) {
    super();

    this.mesh = mesh;
    this.material = material;
  }

  update() {}
}
