import { uuidv4 } from "../utils/random.js";

export class Vertex {
  constructor(position, uv, normal) {
    this.position = position;
    this.uv = uv;
    this.normal = normal || [0, 1, 0];
  }
}

export class Mesh {
  static MESH_CACHE = new Map();

  constructor(vertices, faces) {
    this._id = uuidv4();
    this.vertices = vertices || [];
    this.faces = faces || [];
  }

  get id() {
    return this._id;
  }

  static async loadFromURL(url) {
    if (!Mesh.MESH_CACHE.has(url)) {
      let response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Mesh file (${url}) not found!`);
      }

      let meshData = await response.json();
      if (
        !meshData.vertices ||
        !meshData.faces ||
        meshData.vertices.length === 0 ||
        meshData.faces.length === 0
      ) {
        throw new Error(`Invalid mesh file: ${url}`);
      }

      let vertices = [];
      for (let vertexData of meshData.vertices) {
        vertices.push(new Vertex(vertexData[0], vertexData[1], vertexData[2]));
      }

      Mesh.MESH_CACHE.set(url, new Mesh(vertices, meshData.faces));
    }

    return Mesh.MESH_CACHE.get(url);
  }
}
