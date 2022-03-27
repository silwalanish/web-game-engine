import { GL } from "./GL.js";
import { ModelLoader } from "./ModelLoader.js";
import { TextureLoader } from "./TextureLoader.js";
import { TRANSFORM_COMPONENT } from "../core/components/Components.js";
import {
  LIGHTS_UNIFORM,
  VIEW_MATRIX_UNIFORM,
  MODEL_MATRIX_UNIFORM,
  NORMAL_MATRIX_UNIFORM,
  CAMERA_POSITION_UNIFORM,
  PROJECTION_MATRIX_UNIFORM,
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

  _prepareUniforms(shader, transform, camera, lights) {
    let uniforms = {
      [VIEW_MATRIX_UNIFORM]: camera.getViewMatrix(),
      [MODEL_MATRIX_UNIFORM]: transform.getModelMatrix(),
      [NORMAL_MATRIX_UNIFORM]: transform.getNormalMatrix(),
      [PROJECTION_MATRIX_UNIFORM]: camera.getProjectionMatrix(),
      [CAMERA_POSITION_UNIFORM]:
        camera.getComponent(TRANSFORM_COMPONENT).position,
    };

    let lightUniformMeta = shader.getUniformMeta(LIGHTS_UNIFORM);
    if (lightUniformMeta) {
      for (let i = 0; i < lightUniformMeta.count; i++) {
        if (lights[i]) {
          uniforms[`${LIGHTS_UNIFORM}[${i}].isActive`] = 1;
          uniforms[`${LIGHTS_UNIFORM}[${i}].type`] = lights[i].type;
          uniforms[`${LIGHTS_UNIFORM}[${i}].ambient`] = lights[i].ambient;
          uniforms[`${LIGHTS_UNIFORM}[${i}].ambient`] = lights[i].ambient;
          uniforms[`${LIGHTS_UNIFORM}[${i}].diffuse`] = lights[i].diffuse;
          uniforms[`${LIGHTS_UNIFORM}[${i}].attenuation`] =
            lights[i].attenuation;
          uniforms[`${LIGHTS_UNIFORM}[${i}].position`] = lights[i].position;
          uniforms[`${LIGHTS_UNIFORM}[${i}].orientation`] =
            lights[i].orientation;
        } else {
          uniforms[`${LIGHTS_UNIFORM}[${i}].isActive`] = 0;
        }
      }
    }

    shader.loadUniforms(uniforms);
  }

  render(mesh, transform, camera, lights) {
    let model = this._prepareMesh(mesh.mesh);
    let shader = this._prepareMaterial(mesh.material);
    this._prepareUniforms(shader, transform, camera, lights);

    shader.start();
    shader.loadUniformsToGPU();
    shader.bindTextures();
    GL.bindVertexArray(model.VAO);
    GL.drawElements(GL.TRIANGLES, model.vertexCount, GL.UNSIGNED_INT, 0);
    GL.bindVertexArray(null);
    shader.stop();
  }
}
