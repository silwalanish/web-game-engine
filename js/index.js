import { Mesh } from "./core/Mesh.js";
import { Texture } from "./core/Texture.js";
import { Renderer } from "./renderEngine/Renderer.js";
import { DisplayManager } from "./core/DisplayManager.js";
import { TextureMaterial } from "./materials/TextureMaterial.js";
import { initializeRenderingContext } from "./renderEngine/GL.js";

window.onload = async () => {
  DisplayManager.createDisplay();
  initializeRenderingContext();

  let renderer = new Renderer();

  let material = new TextureMaterial(
    await Texture.loadFromURL("assets/textures/texture.jpg")
  );

  let mesh = await Mesh.loadFromURL("assets/meshes/rectangle.mesh");

  function gameloop() {
    renderer.prepare();

    renderer.render(mesh, material);

    window.requestAnimationFrame(gameloop);
  }

  window.requestAnimationFrame(gameloop);
};
