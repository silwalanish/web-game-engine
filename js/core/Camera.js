import { glMatrix, vec3, mat4 } from "https://cdn.skypack.dev/gl-matrix";

import { GameObject } from "./GameObject.js";
import { TRANSFORM_COMPONENT } from "./components/Components.js";

const CAMERA_NEAR = 0.01;
const CAMERA_FAR = 1000;

export class Camera extends GameObject {
  constructor(fieldOfView, aspect) {
    super();

    this._aspect = aspect;
    this._fieldOfView = fieldOfView;
    this._viewMatrix = mat4.create();
    this._projectionMatrix = mat4.create();
  }

  get fov() {
    return this._fieldOfView;
  }

  set fov(fov) {
    this._fieldOfView = fov;
  }

  get aspect() {
    return this._aspect;
  }

  set aspect(aspect) {
    this._aspect = aspect;
  }

  calculateViewMatrix() {
    let transform = this.getComponent(TRANSFORM_COMPONENT);

    this._viewMatrix = mat4.create();
    this._viewMatrix = mat4.rotateX(
      mat4.create(),
      this._viewMatrix,
      glMatrix.toRadian(transform.rotation[0])
    );
    this._viewMatrix = mat4.rotateY(
      mat4.create(),
      this._viewMatrix,
      glMatrix.toRadian(transform.rotation[1])
    );

    this._viewMatrix = mat4.translate(
      mat4.create(),
      this._viewMatrix,
      vec3.negate(vec3.create(), transform.position)
    );
  }

  calculateProjectionMatrix() {
    this._projectionMatrix = mat4.perspective(
      mat4.create(),
      glMatrix.toRadian(this._fieldOfView),
      this.aspect,
      CAMERA_NEAR,
      CAMERA_FAR
    );
  }

  update() {
    super.update();

    this.calculateViewMatrix();
    this.calculateProjectionMatrix();
  }

  getViewMatrix() {
    return this._viewMatrix;
  }

  getProjectionMatrix() {
    return this._projectionMatrix;
  }
}
