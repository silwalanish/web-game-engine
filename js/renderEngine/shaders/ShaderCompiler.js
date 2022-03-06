import { GL } from "../GL.js";
import { isNonEmptyString } from "../../utils/string.js";

export class ShaderCompiler {
  static _createShader(type, source) {
    let shader = GL.createShader(type);
    GL.shaderSource(shader, source);
    GL.compileShader(shader);
    let success = GL.getShaderParameter(shader, GL.COMPILE_STATUS);
    if (success) {
      return shader;
    }

    let error = GL.getShaderInfoLog(shader);
    GL.deleteShader(shader);

    throw new Error(
      `Failed to compile shader:
${error}
Source:
${source}`);
  }

  static _createProgram(vertexShader, fragmentShader) {
    let program = GL.createProgram();
    GL.attachShader(program, vertexShader);
    GL.attachShader(program, fragmentShader);
    GL.linkProgram(program);
    let success = GL.getProgramParameter(program, GL.LINK_STATUS);
    if (success) {
      return program;
    }

    let error = GL.getProgramInfoLog(program);
    GL.deleteProgram(program);

    throw new Error("Failed to link shader program: " + error);
  }

  static compile(shaderSource) {
    if (!shaderSource) {
      throw new Error("shaderSource can't be empty.");
    }

    if (!isNonEmptyString(shaderSource.vertex)) {
      throw new Error("Invalid vertex shader source.");
    }

    if (!isNonEmptyString(shaderSource.fragment)) {
      throw new Error("Invalid fragment shader source.");
    }

    let vertexShader = ShaderCompiler._createShader(
      GL.VERTEX_SHADER,
      shaderSource.vertex.trim()
    );
    let fragmentShader = ShaderCompiler._createShader(
      GL.FRAGMENT_SHADER,
      shaderSource.fragment.trim()
    );

    let program = ShaderCompiler._createProgram(vertexShader, fragmentShader);

    // It's safe to detach and delete shader once the program is linked
    GL.detachShader(program, vertexShader);
    GL.detachShader(program, fragmentShader);
    GL.deleteShader(vertexShader);
    GL.deleteShader(fragmentShader);

    return program;
  }
}
