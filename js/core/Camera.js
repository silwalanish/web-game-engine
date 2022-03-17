import { glMatrix, vec3, mat4 } from "https://cdn.skypack.dev/gl-matrix";

import { GameObject } from "./GameObject.js";
import { TRANSFORM_COMPONENT } from "./Components.js";

export class Camera extends GameObject {
  constructor() {
    super();

    this._viewMatrix = mat4.create();
  }

  update() {
    super.update();

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

  getViewMatrix() {
    return this._viewMatrix;
  }
}
