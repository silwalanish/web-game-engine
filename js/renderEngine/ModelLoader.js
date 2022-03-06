import { GL } from "./GL.js";
import { RawModel } from "./RawModel.js";
import {
  POSITION_ATTRIB_LOCATION,
  UV_ATTRIB_LOCATION,
} from "./shaders/ShaderAttributes.js";

export class ModelLoader {
  constructor() {
    this.VAOS = [];
    this.VBOS = [];
  }

  cleanUp() {
    this.VAOS.forEach((vao) => {
      GL.deleteVertexArray(vao);
    });

    this.VBOS.forEach((vbo) => {
      GL.deleteBuffer(vbo);
    });
  }

  loadToVAO(positions, uvs, indices) {
    let vao = this.createVAO();
    this.bindIndexBuffer(indices);
    this.storeDataInAttibuteList(POSITION_ATTRIB_LOCATION, 3, positions);
    this.storeDataInAttibuteList(UV_ATTRIB_LOCATION, 2, uvs);
    this.unbindVAO();

    return new RawModel(vao, indices.length);
  }

  createVAO() {
    let vao = GL.createVertexArray();
    this.VAOS.push(vao);
    GL.bindVertexArray(vao);

    return vao;
  }

  unbindVAO() {
    GL.bindVertexArray(null);
  }

  bindIndexBuffer(indices) {
    let vbo = GL.createBuffer();
    this.VBOS.push(vbo);

    GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, vbo);
    GL.bufferData(
      GL.ELEMENT_ARRAY_BUFFER,
      new Int32Array(indices),
      GL.STATIC_DRAW
    );
  }

  storeDataInAttibuteList(attibuteIndex, elementCount, data) {
    let vbo = GL.createBuffer();
    this.VBOS.push(vbo);

    GL.enableVertexAttribArray(attibuteIndex);
    GL.bindBuffer(GL.ARRAY_BUFFER, vbo);
    GL.bufferData(GL.ARRAY_BUFFER, new Float32Array(data), GL.STATIC_DRAW);

    GL.vertexAttribPointer(attibuteIndex, elementCount, GL.FLOAT, false, 0, 0);
    GL.bindBuffer(GL.ARRAY_BUFFER, null);
  }
}
