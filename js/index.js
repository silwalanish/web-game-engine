import { DisplayManager } from "./DisplayManager.js";
import { Renderer } from "./renderEngine/Renderer.js";
import { ModelLoader } from "./renderEngine/ModelLoader.js";
import { ColorMaterial } from "./materials/ColorMaterial.js";
import { initializeRenderingContext } from "./renderEngine/GL.js";

window.onload = () => {
  DisplayManager.createDisplay();
  initializeRenderingContext();

  let renderer = new Renderer();
  let modelLoader = new ModelLoader();

  let material = new ColorMaterial();
  material.color = [1.0, 0.0, 0.0];

  let vertices = [-0.5, 0.5, 0, -0.5, -0.5, 0, 0.5, -0.5, 0, 0.5, 0.5, 0];

  let indices = [0, 1, 3, 3, 1, 2];

  let model = modelLoader.loadToVAO(vertices, indices);

  let loopCount = 0;
  function gameloop() {
    renderer.prepare();

    renderer.render(model, material);

    loopCount++;
    material.color[0] = Math.sin((loopCount * Math.PI) / 180.0);
    material.color[1] = Math.cos((loopCount * Math.PI) / 180.0);
    material.color[2] = 1 - material.color[0] - material.color[1];

    window.requestAnimationFrame(gameloop);
  }

  window.requestAnimationFrame(gameloop);
};
