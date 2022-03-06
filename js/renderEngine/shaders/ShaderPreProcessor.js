import { mergeMap } from "../../utils/map.js";
import { isNonEmptyString } from "../../utils/string.js";
import { SHADER_CHUNKS } from "./shaderChunks/shaderChunks.js";
import { render, templateEngine } from "../../utils/template.js";
import { FRAGMENT_SHADER, VERTEX_SHADER } from "./ShaderTypes.js";

const BASE_VERTEX_SHADER_TEMPLATE = `
#version 300 es
precision highp float;

{vertex_source}

void main() {
  vertex();
}
`;

const BASE_FRAGMENT_SHADER_TEMPLATE = `
#version 300 es
precision highp float;

{fragment_source}

void main() {
  fragment();
}
`;

class PreProcessorDirective {
  constructor(regex) {
    this._regex = regex;
  }

  reset() {
    // Reset states
  }

  onPropertyNotFound(key) {
    throw new Error(`Couldn't find property: ${key}`);
  }

  renderLine(key, meta) {
    throw new Error("renderLine not implemented!");
  }

  expand(source, meta) {
    if (!isNonEmptyString(source)) {
      throw new Error("source is required.");
    }

    if (!meta || !(meta instanceof Map)) {
      console.warn("Provide meta as a Map. Skipping template rendering.");

      return source;
    }

    return templateEngine(source, this._regex, (match) => {
      let key = match.groups.key.trim();
      if (meta.has(key)) {
        return this.renderLine(key, meta) + "\n";
      } else {
        return this.onPropertyNotFound(key);
      }
    });
  }
}

class IncludePreProcessorDirective extends PreProcessorDirective {
  constructor() {
    super(/#include <(?<key>.*?)>/g);
    this.attribsMeta = new Map();
    this.uniformsMeta = new Map();
  }

  reset() {
    this.attribsMeta.clear();
    this.uniformsMeta.clear();
  }

  onPropertyNotFound(key) {
    throw new Error(`Couldn't find include: ${key}`);
  }

  renderLine(key, meta) {
    let include = meta.get(key);
    this.attribsMeta = mergeMap(this.attribsMeta, include.attribsMeta);
    this.uniformsMeta = mergeMap(this.uniformsMeta, include.uniformsMeta);

    return include.source + "\n";
  }
}

class UniformPreProcessorDirective extends PreProcessorDirective {
  constructor(regex) {
    super(regex || /#uniform (?<key>.*?)\n/g);
  }

  onPropertyNotFound(key) {
    throw new Error(`Couldn't find uniform property: ${key}`);
  }

  renderLine(key, meta) {
    return `uniform ${meta.get(key).type} ${key};`;
  }
}

class MaterialPreProcessorDirective extends UniformPreProcessorDirective {
  constructor() {
    super(/#material (?<key>.*?)\n/g);
  }

  onPropertyNotFound(key) {
    throw new Error(`Couldn't find material property: ${key}`);
  }
}

class AttributePreProcessorDirective extends PreProcessorDirective {
  constructor(regex) {
    super(regex || /#attribute (?<key>.*?)\n/g);

    this.shaderType = null;
  }

  reset() {
    this.shaderType = null;
  }

  hasLayout() {
    return this.shaderType === VERTEX_SHADER;
  }

  onPropertyNotFound(key) {
    throw new Error(`Couldn't find input attribute: ${key}`);
  }

  renderLayout(meta) {
    if (this.hasLayout() && (meta.location || meta.location === 0)) {
      return `layout(location = ${meta.location})`;
    }

    return "";
  }

  renderAttributeDefn(key, meta) {
    return `in ${meta.type} ${key};`;
  }

  renderLine(key, metas) {
    let meta = metas.get(key);

    return `${this.renderLayout(meta)} ${this.renderAttributeDefn(key, meta)}`;
  }

  expand(source, meta, shaderType) {
    this.shaderType = shaderType;

    return super.expand(source, meta);
  }
}

class OutputPreProcessorDirective extends AttributePreProcessorDirective {
  constructor() {
    super(/#output (?<key>.*?)\n/g);
  }

  hasLayout() {
    return this.shaderType === FRAGMENT_SHADER;
  }

  onPropertyNotFound(key) {
    throw new Error(`Couldn't find output attribute: ${key}`);
  }

  renderAttributeDefn(key, meta) {
    return `out ${meta.type} ${key};`;
  }
}

export class ShaderPreProcessor {
  constructor() {
    this._includeExpander = new IncludePreProcessorDirective();
    this._attributeExpander = new AttributePreProcessorDirective();
    this._outputExpander = new OutputPreProcessorDirective();
    this._uniformExpander = new UniformPreProcessorDirective();
    this._materialExpander = new MaterialPreProcessorDirective();
  }

  _resetState() {
    this._includeExpander.reset();
    this._attributeExpander.reset();
    this._outputExpander.reset();
    this._uniformExpander.reset();
    this._materialExpander.reset();
  }

  _generateGLSL(baseTemplate, shaderType, params) {
    this._resetState();

    let shaderSource = render(baseTemplate, params.sourceMap);

    shaderSource = this._includeExpander.expand(shaderSource, SHADER_CHUNKS);

    let attribsMeta = mergeMap(
      this._includeExpander.attribsMeta,
      params.attribsMeta
    );
    shaderSource = this._attributeExpander.expand(
      shaderSource,
      attribsMeta,
      shaderType
    );
    shaderSource = this._outputExpander.expand(
      shaderSource,
      attribsMeta,
      shaderType
    );

    let uniformsMeta = mergeMap(
      this._includeExpander.uniformsMeta,
      params.uniformsMeta
    );
    shaderSource = this._uniformExpander.expand(shaderSource, uniformsMeta);
    shaderSource = this._materialExpander.expand(shaderSource, uniformsMeta);

    return shaderSource;
  }

  generate(params) {
    return {
      vertex: this._generateGLSL(
        BASE_VERTEX_SHADER_TEMPLATE,
        VERTEX_SHADER,
        params
      ),
      fragment: this._generateGLSL(
        BASE_FRAGMENT_SHADER_TEMPLATE,
        FRAGMENT_SHADER,
        params
      ),
    };
  }
}
