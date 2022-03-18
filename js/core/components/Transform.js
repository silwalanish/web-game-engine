import { glMatrix, vec3, mat3, mat4 } from "https://cdn.skypack.dev/gl-matrix";

import { BaseComponent } from "./BaseComponent.js";

const WORLD_UP = vec3.fromValues(0, 1, 0);

export class Transform extends BaseComponent {
  constructor(position, rotation, scale) {
    super();

    this.position = position || vec3.fromValues(0, 0, 0);
    this.rotation = rotation || vec3.fromValues(0, 0, 0);
    this.scale = scale || vec3.fromValues(1, 1, 1);

    this._modelMatrix = mat4.create();
    this._normalMatrix = mat3.create();

    this._front = vec3.fromValues(0, 0, -1);
    this._right = vec3.fromValues(1, 0, 0);
    this._up = vec3.fromValues(0, 1, 0);
  }

  _calculateVectors() {
    let sinPitch = Math.sin(glMatrix.toRadian(this.rotation[0]));
    let cosPitch = Math.cos(glMatrix.toRadian(this.rotation[0]));
    let sinYaw = Math.sin(glMatrix.toRadian(this.rotation[1]));
    let cosYaw = Math.cos(glMatrix.toRadian(this.rotation[1]));

    this._front[0] = cosPitch * cosYaw;
    this._front[1] = sinPitch;
    this._front[2] = cosPitch * sinYaw;
    this._front = vec3.normalize(vec3.create(), this._front);

    this._right = vec3.normalize(
      vec3.create(),
      vec3.cross(vec3.create(), this._front, WORLD_UP)
    );

    this._up = vec3.normalize(
      vec3.create(),
      vec3.cross(vec3.create(), this._right, this._front)
    );
  }

  _calculateModelMatrix() {
    this._modelMatrix = mat4.create();
    this._modelMatrix = mat4.translate(
      mat4.create(),
      this._modelMatrix,
      this.position
    );

    this._modelMatrix = mat4.rotateX(
      mat4.create(),
      this._modelMatrix,
      glMatrix.toRadian(this.rotation[0])
    );
    this._modelMatrix = mat4.rotateY(
      mat4.create(),
      this._modelMatrix,
      glMatrix.toRadian(this.rotation[1])
    );
    this._modelMatrix = mat4.rotateZ(
      mat4.create(),
      this._modelMatrix,
      glMatrix.toRadian(this.rotation[2])
    );

    this._modelMatrix = mat4.scale(
      mat4.create(),
      this._modelMatrix,
      this.scale
    );
  }

  _calculateNormalMatrix() {
    let tempMat = mat4.invert(mat4.create(), this._modelMatrix);
    tempMat = mat4.transpose(mat4.create(), tempMat);

    this._normalMatrix = mat3.fromMat4(this._normalMatrix, tempMat);
  }

  update() {
    this._calculateVectors();
    this._calculateModelMatrix();
    this._calculateNormalMatrix();
  }

  getModelMatrix() {
    return this._modelMatrix;
  }

  getNormalMatrix() {
    return this._normalMatrix;
  }

  get front() {
    return this._front;
  }

  get right() {
    return this._right;
  }

  get up() {
    return this._up;
  }
}
