import { Texture } from "./Texture.js";
import { DisplayManager } from "./DisplayManager.js";
import { Renderer } from "./renderEngine/Renderer.js";
import { ModelLoader } from "./renderEngine/ModelLoader.js";
import { TextureMaterial } from "./materials/TextureMaterial.js";
import { initializeRenderingContext } from "./renderEngine/GL.js";

window.onload = async () => {
  DisplayManager.createDisplay();
  initializeRenderingContext();

  let renderer = new Renderer();
  let modelLoader = new ModelLoader();

  let material = new TextureMaterial(await Texture.loadFromURL("assets/textures/texture.jpg"));

  let vertices = [-0.5, -0.5, 0, 0.5, -0.5, 0, 0.5, 0.5, 0, -0.5, 0.5, 0];
  let uvs = [0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0];

  let indices = [0, 1, 2, 0, 2, 3];

  let model = modelLoader.loadToVAO(vertices, uvs, indices);

  function gameloop() {
    renderer.prepare();

    renderer.render(model, material);

    window.requestAnimationFrame(gameloop);
  }

  window.requestAnimationFrame(gameloop);
};
