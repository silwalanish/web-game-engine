import { GL } from "./GL.js";

export class Renderer {
  constructor() {
    this._shaderCache = new Map();
  }

  prepare() {
    GL.clearColor(0.0, 0.0, 0.0, 1.0);
    GL.clear(GL.COLOR_BUFFER_BIT);
  }

  _prepareMaterial(material) {
    let shader;
    if (!this._shaderCache.has(material.id)) {
      shader = new material.shaderClass(material.meta);
      shader.compile();

      this._shaderCache.set(material.id, shader);
    }

    shader = this._shaderCache.get(material.id);
    shader.loadMaterial(material);

    return shader;
  }

  render(model, material) {
    let shader = this._prepareMaterial(material);

    shader.start();
    shader.loadUniformsToGPU();
    GL.bindVertexArray(model.VAO);
    GL.enableVertexAttribArray(0);
    GL.drawElements(GL.TRIANGLES, model.vertexCount, GL.UNSIGNED_INT, 0);
    GL.disableVertexAttribArray(0);
    GL.bindVertexArray(null);
    shader.stop();
  }
}
