import { DisplayManager } from "../DisplayManager.js";

export let GL = null;

export function initializeRenderingContext() {
    GL = DisplayManager.CANVAS.getContext("webgl2");
    if (!GL) {
        throw new Error("The browser doesn't support webgl2.");
    }
}
