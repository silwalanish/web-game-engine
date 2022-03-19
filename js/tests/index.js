import { TestScene } from "./TestScene.js";
import { Renderer } from "../renderEngine/Renderer.js";
import { DisplayManager } from "../core/DisplayManager.js";
import { initializeRenderingContext } from "../renderEngine/GL.js";

const WIDTH = 750;
const HEIGHT = 600;

window.onload = async () => {
  DisplayManager.createDisplay(WIDTH, HEIGHT);
  initializeRenderingContext();

  let renderer = new Renderer();
  let scene = new TestScene();
  await scene.initialize();

  function gameloop() {
    scene.update();

    renderer.prepare();
    renderer.render(scene);

    window.requestAnimationFrame(gameloop);
  }

  window.requestAnimationFrame(gameloop);
};
