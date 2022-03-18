import { GL } from "./GL.js";
import { ModelLoader } from "./ModelLoader.js";
import { TextureLoader } from "./TextureLoader.js";
import { TRANSFORM_COMPONENT } from "../core/components/Components.js";
import {
  CAMERA_POSITION_UNIFORM,
  LIGHT_AMBIENT_COLOR_UNIFORM,
  LIGHT_DIFFUSE_COLOR_UNIFORM,
  LIGHT_POSITION_UNIFORM,
  MODEL_MATRIX_UNIFORM,
  NORMAL_MATRIX_UNIFORM,
  PROJECTION_MATRIX_UNIFORM,
  VIEW_MATRIX_UNIFORM,
} from "./shaders/ShaderUniforms.js";

export class MeshRenderer {
  constructor() {
    this._shaderCache = new Map();
    this.modelLoader = new ModelLoader();
    this.textureLoader = new TextureLoader();
  }

  _prepareMesh(mesh) {
    return this.modelLoader.loadMeshToModel(mesh);
  }

  _prepareMaterial(material) {
    let shader;
    if (!this._shaderCache.has(material.id)) {
      shader = new material.shaderClass(this, material.meta);
      shader.compile();

      this._shaderCache.set(material.id, shader);
    }

    shader = this._shaderCache.get(material.id);
    shader.reset();
    shader.loadMaterial(material);

    return shader;
  }

  _prepareUniforms(shader, transform, camera, light) {
    let uniforms = {
      [LIGHT_AMBIENT_COLOR_UNIFORM]: light.ambient,
      [LIGHT_DIFFUSE_COLOR_UNIFORM]: light.diffuse,
      [VIEW_MATRIX_UNIFORM]: camera.getViewMatrix(),
      [MODEL_MATRIX_UNIFORM]: transform.getModelMatrix(),
      [NORMAL_MATRIX_UNIFORM]: transform.getNormalMatrix(),
      [PROJECTION_MATRIX_UNIFORM]: camera.getProjectionMatrix(),
      [CAMERA_POSITION_UNIFORM]:
        camera.getComponent(TRANSFORM_COMPONENT).position,
      [LIGHT_POSITION_UNIFORM]:
        light.getComponent(TRANSFORM_COMPONENT).position,
    };

    shader.loadUniforms(uniforms);
  }

  render(mesh, transform, camera, light) {
    let model = this._prepareMesh(mesh.mesh);
    let shader = this._prepareMaterial(mesh.material);
    this._prepareUniforms(shader, transform, camera, light);

    shader.start();
    shader.loadUniformsToGPU();
    shader.bindTextures();
    GL.bindVertexArray(model.VAO);
    GL.drawElements(GL.TRIANGLES, model.vertexCount, GL.UNSIGNED_INT, 0);
    GL.bindVertexArray(null);
    shader.stop();
  }
}
