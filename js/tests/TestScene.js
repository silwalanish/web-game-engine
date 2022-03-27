import { Mesh } from "../core/Mesh.js";
import { Scene } from "../core/Scene.js";
import { Texture } from "../core/Texture.js";
import { GameObject } from "../core/GameObject.js";
import { ColorMaterial } from "../materials/ColorMaterial.js";
import { PhongMaterial } from "../materials/PhongMaterial.js";
import { MeshComponent } from "../core/components/MeshComponent.js";
import { DIRECTION_LIGHT, Light, POINT_LIGHT } from "../core/Light.js";
import { MovementControl } from "../core/components/MovementControl.js";
import { LookAroundControl } from "../core/components/LookAroundControl.js";
import {
  MESH_COMPONENT,
  MOVEMENT_COMPONENT,
  TRANSFORM_COMPONENT,
} from "../core/components/Components.js";

const MOVEMENT_SPEED = 0.1;
const MOUSE_SENSITIVITY = 0.1;
const CAMERA_POSITION = [0.0, 15.0, 0.0];

export class TestScene extends Scene {
  constructor() {
    super();
    this.lightDir = 1;
  }

  async onInit() {
    this.camera.addComponent(
      MOVEMENT_COMPONENT,
      new MovementControl(MOVEMENT_SPEED)
    );
    this.camera.addComponent(
      MOVEMENT_COMPONENT,
      new LookAroundControl(MOUSE_SENSITIVITY)
    );
    this.camera.getComponent(TRANSFORM_COMPONENT).position = CAMERA_POSITION;

    let cubeMesh = await Mesh.loadFromURL("assets/meshes/cube.mesh");
    let planeMesh = await Mesh.loadFromURL("assets/meshes/rectangle.mesh");
    let texMat = new PhongMaterial(
      await Texture.loadFromURL("assets/textures/cubeTex.png"),
      await Texture.loadFromURL("assets/textures/cubeSpecTex.png"),
      32
    );

    let ground = new GameObject();
    ground.addComponent(MESH_COMPONENT, new MeshComponent(planeMesh, texMat));
    ground.getComponent(TRANSFORM_COMPONENT).position[1] -= 6;
    ground.getComponent(TRANSFORM_COMPONENT).rotation = [-90, 0, 0];
    ground.getComponent(TRANSFORM_COMPONENT).scale = [50, 50, 50];
    this.addObject(ground);

    let cube = new GameObject();
    cube.addComponent(MESH_COMPONENT, new MeshComponent(cubeMesh, texMat));
    cube.getComponent(TRANSFORM_COMPONENT).position[0] -= 3;
    this.addObject(cube);

    let cube2 = new GameObject();
    cube2.addComponent(MESH_COMPONENT, new MeshComponent(cubeMesh, texMat));
    cube2.getComponent(TRANSFORM_COMPONENT).position[0] += 3;
    this.addObject(cube2);

    let cube3 = new GameObject();
    cube3.addComponent(MESH_COMPONENT, new MeshComponent(cubeMesh, texMat));
    cube3.getComponent(TRANSFORM_COMPONENT).position[2] -= 3;
    this.addObject(cube3);

    let light = new Light(POINT_LIGHT, [0.0, 1.0, 0.0], [0.0, 0.0, 0.0]);
    light.addComponent(
      MESH_COMPONENT,
      new MeshComponent(cubeMesh, new ColorMaterial(light.diffuse))
    );
    light.getComponent(TRANSFORM_COMPONENT).position = [0, 7, 0];
    light.getComponent(TRANSFORM_COMPONENT).scale = [0.5, 0.5, 0.5];
    this.addLight(light);

    let light2 = new Light(POINT_LIGHT, [1.0, 0.0, 0.0], [0.0, 0.0, 0.0]);
    light2.addComponent(
      MESH_COMPONENT,
      new MeshComponent(cubeMesh, new ColorMaterial(light2.diffuse))
    );
    light2.getComponent(TRANSFORM_COMPONENT).position = [8, 0, 0];
    light2.getComponent(TRANSFORM_COMPONENT).scale = [0.5, 0.5, 0.5];
    this.addLight(light2);

    let light3 = new Light(POINT_LIGHT, [0.0, 0.0, 1.0], [0.0, 0.0, 0.0]);
    light3.addComponent(
      MESH_COMPONENT,
      new MeshComponent(cubeMesh, new ColorMaterial(light3.diffuse))
    );
    light3.getComponent(TRANSFORM_COMPONENT).position = [0, 0, -10];
    light3.getComponent(TRANSFORM_COMPONENT).scale = [0.5, 0.5, 0.5];
    this.addLight(light3);

    let light4 = new Light(
      DIRECTION_LIGHT,
      [1.0, 1.0, 1.0],
      [0.1, 0.1, 0.1],
      [1.0, 0.0014, 0.000007]
    );
    light4.addComponent(
      MESH_COMPONENT,
      new MeshComponent(cubeMesh, new ColorMaterial(light4.diffuse))
    );
    light4.getComponent(TRANSFORM_COMPONENT).position = [0, 10, 0];
    light4.getComponent(TRANSFORM_COMPONENT).rotation = [90, 0, 0];
    light4.getComponent(TRANSFORM_COMPONENT).scale = [0.5, 0.5, 0.5];
    this.addLight(light4);
  }

  onUpdate() {
    this.lights[0].getComponent(TRANSFORM_COMPONENT).position[0] +=
      this.lightDir * MOVEMENT_SPEED;
    this.lights[1].getComponent(TRANSFORM_COMPONENT).position[1] +=
      this.lightDir * MOVEMENT_SPEED;
    this.lights[2].getComponent(TRANSFORM_COMPONENT).position[2] +=
      this.lightDir * MOVEMENT_SPEED;

    if (
      Math.abs(this.lights[0].getComponent(TRANSFORM_COMPONENT).position[0]) > 5
    ) {
      this.lightDir *= -1;
    }
  }
}
