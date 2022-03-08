import { GL } from "./GL.js";
import { ModelLoader } from "./ModelLoader.js";
import { MODEL_MATRIX_UNIFORM } from "./shaders/ShaderUniforms.js";
import { TextureLoader } from "./TextureLoader.js";

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

  _prepareUniforms(shader, transform) {
    let uniforms = {
      [MODEL_MATRIX_UNIFORM]: transform.getModelMatrix(),
    };

    shader.loadUniforms(uniforms);
  }

  render(mesh, material, transform) {
    let model = this._prepareMesh(mesh);
    let shader = this._prepareMaterial(material);
    this._prepareUniforms(shader, transform);

    shader.start();
    shader.loadUniformsToGPU();
    shader.bindTextures();
    GL.bindVertexArray(model.VAO);
    GL.drawElements(GL.TRIANGLES, model.vertexCount, GL.UNSIGNED_INT, 0);
    GL.bindVertexArray(null);
    shader.stop();
  }
}
