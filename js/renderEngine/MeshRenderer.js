import { GL } from "./GL.js";
import { ModelLoader } from "./ModelLoader.js";
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

  render(mesh, material) {
    let model = this._prepareMesh(mesh);
    let shader = this._prepareMaterial(material);

    shader.start();
    shader.loadUniformsToGPU();
    shader.bindTextures();
    GL.bindVertexArray(model.VAO);
    GL.drawElements(GL.TRIANGLES, model.vertexCount, GL.UNSIGNED_INT, 0);
    GL.bindVertexArray(null);
    shader.stop();
  }
}
