import { Mesh } from "./core/Mesh.js";
import { Light } from "./core/Light.js";
import { Camera } from "./core/Camera.js";
import { Texture } from "./core/Texture.js";
import { GameObject } from "./core/GameObject.js";
import { Renderer } from "./renderEngine/Renderer.js";
import { DisplayManager } from "./core/DisplayManager.js";
import { PhongMaterial } from "./materials/PhongMaterial.js";
import { ColorMaterial } from "./materials/ColorMaterial.js";
import { initializeRenderingContext } from "./renderEngine/GL.js";
import { MeshComponent } from "./core/components/MeshComponent.js";
import { MovementControl } from "./core/components/MovementControl.js";
import {
  MESH_COMPONENT,
  MOVEMENT_COMPONENT,
  TRANSFORM_COMPONENT,
} from "./core/components/Components.js";

const FOV = 70;
const WIDTH = 750;
const HEIGHT = 600;

window.onload = async () => {
  DisplayManager.createDisplay(WIDTH, HEIGHT);
  initializeRenderingContext();

  let camera = new Camera(FOV, WIDTH / HEIGHT);
  camera.addComponent(MOVEMENT_COMPONENT, new MovementControl(0.08));
  camera.getComponent(TRANSFORM_COMPONENT).position[1] += 3.0;
  camera.getComponent(TRANSFORM_COMPONENT).position[2] += 10.0;

  let renderer = new Renderer();
  let objects = [];

  let cubeMesh = await Mesh.loadFromURL("assets/meshes/cube.mesh");
  let texMat = new PhongMaterial(
    await Texture.loadFromURL("assets/textures/cubeTex.png"),
    await Texture.loadFromURL("assets/textures/cubeSpecTex.png"),
    32
  );

  let light = new Light([1.0, 0.0, 0.0], [0.2, 0.2, 0.1]);
  light.addComponent(
    MESH_COMPONENT,
    new MeshComponent(cubeMesh, new ColorMaterial(light.diffuse))
  );
  light.getComponent(TRANSFORM_COMPONENT).position = [0, 7, 0];
  light.getComponent(TRANSFORM_COMPONENT).scale = [0.5, 0.5, 0.5];

  let cube = new GameObject();
  cube.addComponent(MESH_COMPONENT, new MeshComponent(cubeMesh, texMat));

  let cube2 = new GameObject();
  cube2.addComponent(MESH_COMPONENT, new MeshComponent(cubeMesh, texMat));

  let cube3 = new GameObject();
  cube3.addComponent(MESH_COMPONENT, new MeshComponent(cubeMesh, texMat));

  cube.getComponent(TRANSFORM_COMPONENT).position[0] -= 3;
  cube2.getComponent(TRANSFORM_COMPONENT).position[0] += 3;
  cube3.getComponent(TRANSFORM_COMPONENT).position[2] -= 3;

  objects.push(camera);
  objects.push(cube);
  objects.push(cube2);
  objects.push(cube3);
  objects.push(light);

  let lightDir = 1;

  function gameloop() {
    light.getComponent(TRANSFORM_COMPONENT).position[2] += lightDir * 0.08;
    light.getComponent(TRANSFORM_COMPONENT).position[0] += lightDir * 0.08;

    if (Math.abs(light.getComponent(TRANSFORM_COMPONENT).position[2]) > 5) {
      lightDir *= -1;
    }

    cube.getComponent(TRANSFORM_COMPONENT).rotation[0] -= 1;
    cube2.getComponent(TRANSFORM_COMPONENT).rotation[1] += 1;
    cube3.getComponent(TRANSFORM_COMPONENT).rotation[2] += 1;

    for (let object of objects) {
      object.update();
    }

    renderer.prepare();
    for (let object of objects) {
      renderer.render(camera, object, light);
    }

    window.requestAnimationFrame(gameloop);
  }

  window.requestAnimationFrame(gameloop);
};
