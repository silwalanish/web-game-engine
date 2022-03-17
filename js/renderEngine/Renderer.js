import { GL } from "./GL.js";
import { MeshRenderer } from "./MeshRenderer.js";
import {
  MATERIAL_COMPONENT,
  MESH_COMPONENT,
  TRANSFORM_COMPONENT,
} from "../core/Components.js";

export class Renderer {
  constructor(projectionMatrix) {
    this._meshRenderer = new MeshRenderer(projectionMatrix);
  }

  prepare() {
    GL.clearColor(0.0, 0.0, 0.0, 1.0);
    GL.clear(GL.COLOR_BUFFER_BIT | GL.DEPTH_BUFFER_BIT);

    GL.enable(GL.DEPTH_TEST);
  }

  render(camera, gameObject) {
    if (
      gameObject.hasComponent(MESH_COMPONENT) &&
      gameObject.hasComponent(MATERIAL_COMPONENT) &&
      gameObject.hasComponent(TRANSFORM_COMPONENT)
    ) {
      this._meshRenderer.render(
        gameObject.getComponent(MESH_COMPONENT),
        gameObject.getComponent(MATERIAL_COMPONENT),
        gameObject.getComponent(TRANSFORM_COMPONENT),
        camera
      );
    }
  }
}
