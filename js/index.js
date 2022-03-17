import { Mesh } from "./core/Mesh.js";
import { Camera } from "./core/Camera.js";
import { Texture } from "./core/Texture.js";
import { GameObject } from "./core/GameObject.js";
import { Renderer } from "./renderEngine/Renderer.js";
import { DisplayManager } from "./core/DisplayManager.js";
import { TextureMaterial } from "./materials/TextureMaterial.js";
import { initializeRenderingContext } from "./renderEngine/GL.js";
import { MovementControl } from "./core/components/MovementControl.js";
import {
  MESH_COMPONENT,
  MOVEMENT_COMPONENT,
  TRANSFORM_COMPONENT,
} from "./core/components/Components.js";
import { MeshComponent } from "./core/components/MeshComponent.js";

const FOV = 60;
const WIDTH = 750;
const HEIGHT = 600;

window.onload = async () => {
  DisplayManager.createDisplay(WIDTH, HEIGHT);
  initializeRenderingContext();

  let camera = new Camera(FOV, WIDTH / HEIGHT);
  camera.addComponent(MOVEMENT_COMPONENT, new MovementControl(0.08));
  camera.getComponent(TRANSFORM_COMPONENT).position[2] += 2.0;

  let renderer = new Renderer();

  let cubeMesh = await Mesh.loadFromURL("assets/meshes/cube.mesh");
  let texMat = new TextureMaterial(
    await Texture.loadFromURL("assets/textures/texture.jpg")
  );

  let cube = new GameObject();
  cube.addComponent(MESH_COMPONENT, new MeshComponent(cubeMesh, texMat));

  function gameloop() {
    camera.update();

    cube.getComponent(TRANSFORM_COMPONENT).rotation[0] += 1;
    cube.getComponent(TRANSFORM_COMPONENT).rotation[1] += 1;
    cube.update();

    renderer.prepare();
    renderer.render(camera, cube);

    window.requestAnimationFrame(gameloop);
  }

  window.requestAnimationFrame(gameloop);
};
