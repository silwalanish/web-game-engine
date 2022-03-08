import { uuidv4 } from "../utils/random.js";

export class Texture {
  static TEXTURE_CACHE = new Map();

  constructor(imageData, width, height) {
    this._id = uuidv4();
    this._width = width;
    this._height = height;
    this._imageData = imageData;
  }

  get id() {
    return this._id;
  }

  get imageData() {
    return this._imageData;
  }

  get width() {
    return this._width;
  }

  get height() {
    return this._height;
  }

  static loadFromURL(url) {
    return new Promise((resolve, reject) => {
      if (Texture.TEXTURE_CACHE.has(url)) {
        resolve(Texture.TEXTURE_CACHE.get(url));
        return;
      }

      let image = new Image();
      image.onload = () => {
        let texture = new Texture(image, image.width, image.height);

        Texture.TEXTURE_CACHE.set(url, texture);
        resolve(texture);
      };
      image.onerror = (error) => {
        reject(error);
      };
      image.src = url;
    });
  }
}
