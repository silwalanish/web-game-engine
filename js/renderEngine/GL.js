import { DisplayManager } from "../core/DisplayManager.js";

export let GL = null;

export function initializeRenderingContext() {
  GL = DisplayManager.CANVAS.getContext("webgl2", {
    antialias: true,
  });
  if (!GL) {
    throw new Error("The browser doesn't support webgl2.");
  }

  // Images are flipped in WebGL.
  GL.pixelStorei(GL.UNPACK_FLIP_Y_WEBGL, true);
}
