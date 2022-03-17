import { GL } from "./GL.js";
import { ModelLoader } from "./ModelLoader.js";
import { TextureLoader } from "./TextureLoader.js";
import {
  MODEL_MATRIX_UNIFORM,
  PROJECTION_MATRIX_UNIFORM,
  VIEW_MATRIX_UNIFORM,
} from "./shaders/ShaderUniforms.js";

export class MeshRenderer {
  constructor(projectionMatrix) {
    this._projectionMatrix = projectionMatrix;
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

  _prepareUniforms(shader, transform, camera) {
    let uniforms = {
      [VIEW_MATRIX_UNIFORM]: camera.getViewMatrix(),
      [MODEL_MATRIX_UNIFORM]: transform.getModelMatrix(),
      [PROJECTION_MATRIX_UNIFORM]: this._projectionMatrix,
    };

    shader.loadUniforms(uniforms);
  }

  render(mesh, material, transform, camera) {
    let model = this._prepareMesh(mesh);
    let shader = this._prepareMaterial(material);
    this._prepareUniforms(shader, transform, camera);

    shader.start();
    shader.loadUniformsToGPU();
    shader.bindTextures();
    GL.bindVertexArray(model.VAO);
    GL.drawElements(GL.TRIANGLES, model.vertexCount, GL.UNSIGNED_INT, 0);
    GL.bindVertexArray(null);
    shader.stop();
  }
}
