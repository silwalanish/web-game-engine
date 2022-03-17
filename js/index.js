import { Mesh } from "./core/Mesh.js";
import { Texture } from "./core/Texture.js";
import { GameObject } from "./core/GameObject.js";
import { Renderer } from "./renderEngine/Renderer.js";
import { DisplayManager } from "./core/DisplayManager.js";
import { TextureMaterial } from "./materials/TextureMaterial.js";
import { initializeRenderingContext } from "./renderEngine/GL.js";
import {
  MATERIAL_COMPONENT,
  MESH_COMPONENT,
  TRANSFORM_COMPONENT,
} from "./core/Components.js";

window.onload = async () => {
  DisplayManager.createDisplay();
  initializeRenderingContext();

  let renderer = new Renderer();

  let cube = new GameObject();
  cube.addComponent(
    MESH_COMPONENT,
    await Mesh.loadFromURL("assets/meshes/cube.mesh")
  );
  cube.addComponent(
    MATERIAL_COMPONENT,
    new TextureMaterial(
      await Texture.loadFromURL("assets/textures/texture.jpg")
    )
  );

  function gameloop() {
    cube.getComponent(TRANSFORM_COMPONENT).rotation[0] += 1;
    cube.getComponent(TRANSFORM_COMPONENT).rotation[1] += 1;
    cube.update();

    renderer.prepare();
    renderer.render(cube);

    window.requestAnimationFrame(gameloop);
  }

  window.requestAnimationFrame(gameloop);
};
