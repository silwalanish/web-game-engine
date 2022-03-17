import { glMatrix, mat4 } from "https://cdn.skypack.dev/gl-matrix";

import { Mesh } from "./core/Mesh.js";
import { Camera } from "./core/Camera.js";
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

const WIDTH = 750;
const HEIGHT = 600;
const FOV = 60;

window.onload = async () => {
  DisplayManager.createDisplay(WIDTH, HEIGHT);
  initializeRenderingContext();

  let perspectiveMat = mat4.perspective(
    mat4.create(),
    glMatrix.toRadian(FOV),
    WIDTH / HEIGHT,
    0.001,
    1000
  );

  let camera = new Camera();
  let renderer = new Renderer(perspectiveMat);

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

  camera.getComponent(TRANSFORM_COMPONENT).position[2] += 2.0;

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
