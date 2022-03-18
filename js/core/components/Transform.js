import { glMatrix, vec3, mat3, mat4 } from "https://cdn.skypack.dev/gl-matrix";

import { BaseComponent } from "./BaseComponent.js";

export class Transform extends BaseComponent {
  constructor(position, rotation, scale) {
    super();

    this.position = position || vec3.fromValues(0, 0, 0);
    this.rotation = rotation || vec3.fromValues(0, 0, 0);
    this.scale = scale || vec3.fromValues(1, 1, 1);

    this._modelMatrix = mat4.create();
    this._normalMatrix = mat3.create();

    this._calculateModelMatrix();
    this._calculateNormalMatrix();
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
    this._calculateModelMatrix();
    this._calculateNormalMatrix();
  }

  getModelMatrix() {
    return this._modelMatrix;
  }

  getNormalMatrix() {
    return this._normalMatrix;
  }
}
