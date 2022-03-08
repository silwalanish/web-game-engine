import { GL } from "./GL.js";
import { MeshRenderer } from "./MeshRenderer.js";
import { MATERIAL_COMPONENT, MESH_COMPONENT } from "../core/Components.js";

export class Renderer {
  constructor() {
    this._meshRenderer = new MeshRenderer();
  }

  prepare() {
    GL.clearColor(0.0, 0.0, 0.0, 1.0);
    GL.clear(GL.COLOR_BUFFER_BIT);
  }

  render(gameObject) {
    if (
      gameObject.hasComponent(MESH_COMPONENT) &&
      gameObject.hasComponent(MATERIAL_COMPONENT)
    ) {
      this._meshRenderer.render(
        gameObject.getComponent(MESH_COMPONENT),
        gameObject.getComponent(MATERIAL_COMPONENT)
      );
    }
  }
}
