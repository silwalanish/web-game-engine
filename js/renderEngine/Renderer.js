import { GL } from "./GL.js";
import { MeshRenderer } from "./MeshRenderer.js";
import {
  MESH_COMPONENT,
  TRANSFORM_COMPONENT,
} from "../core/components/Components.js";

export class Renderer {
  constructor() {
    this._meshRenderer = new MeshRenderer();
  }

  prepare() {
    GL.clearColor(0.0, 0.0, 0.0, 1.0);
    GL.clear(GL.COLOR_BUFFER_BIT | GL.DEPTH_BUFFER_BIT);

    GL.enable(GL.DEPTH_TEST);
  }

  render(scene) {
    for (let gameObject of scene.objects) {
      if (
        gameObject.hasComponent(MESH_COMPONENT) &&
        gameObject.hasComponent(TRANSFORM_COMPONENT)
      ) {
        this._meshRenderer.render(
          gameObject.getComponent(MESH_COMPONENT),
          gameObject.getComponent(TRANSFORM_COMPONENT),
          scene.camera,
          scene.lights
        );
      }
    }
  }
}
