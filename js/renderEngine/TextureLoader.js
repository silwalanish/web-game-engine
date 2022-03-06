import { GL } from "./GL.js";

export class TextureLoader {
  constructor() {
    this._textureCache = new Map();
  }

  cleanUp() {
    for (let [_, id] of this._textureCache) {
      GL.deleteTexture(id);
    }
  }

  loadToWebGLTexture(texture) {
    if (this._textureCache.has(texture.id)) {
      return this._textureCache.get(texture.id);
    }

    const webGLTextureId = GL.createTexture();
    GL.bindTexture(GL.TEXTURE_2D, webGLTextureId);

    GL.texImage2D(
      GL.TEXTURE_2D,
      0,
      GL.RGBA,
      texture.width,
      texture.height,
      0,
      GL.RGBA,
      GL.UNSIGNED_BYTE,
      texture.imageData
    );

    GL.generateMipmap(GL.TEXTURE_2D);
    GL.bindTexture(GL.TEXTURE_2D, null);

    this._textureCache.set(texture.id, webGLTextureId);
    return webGLTextureId;
  }
}
