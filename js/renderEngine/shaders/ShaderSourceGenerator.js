import { isNonEmptyString } from "../../utils/string.js";
import { render, renderEngine } from "../../utils/template.js";

const BASE_VERTEX_SHADER_TEMPLATE = `
#version 300 es
precision highp float;

{vertex_input_attrib}

{vertex_output_attrib}

{vertex_source}

void main() {
  vertex();
}
`;

const BASE_FRAGMENT_SHADER_TEMPLATE = `
#version 300 es
precision highp float;

{fragment_input_attrib}

{fragment_output_attrib}

{fragment_source}

void main() {
  fragment();
}
`;

class HashTagExpander {
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

    return renderEngine(source, this._regex, (match) => {
      let key = match.groups.key.trim();
      if (meta.has(key)) {
        return this.renderLine(key, meta) + "\n";
      } else {
        return this.onPropertyNotFound(key);
      }
    });
  }
}

class UniformHashTagExpander extends HashTagExpander {
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

class MaterialHashTagExpander extends UniformHashTagExpander {
  constructor() {
    super(/#material (?<key>.*?)\n/g);
  }

  onPropertyNotFound(key) {
    throw new Error(`Couldn't find material property: ${key}`);
  }
}

class AttributeHashTagExpander extends HashTagExpander {
  constructor(regex) {
    super(regex || /#attribute (?<key>.*?)\n/g);
    this._index = 0;
  }

  reset() {
    this._index = 0;
  }

  onPropertyNotFound(key) {
    throw new Error(`Couldn't find input attribute: ${key}`);
  }

  renderLayout(meta) {
    if (!meta.location && meta.location !== 0) {
      meta.location = this._index++;
    }
    return `layout(location = ${meta.location})`;
  }

  renderAttributeDefn(key, meta) {
    return `in ${meta.type} ${key};`;
  }

  renderLine(key, metas) {
    let meta = metas.get(key);
    return `${this.renderLayout(meta)} ${this.renderAttributeDefn(key, meta)}`;
  }
}

class OutputHashTagExpander extends AttributeHashTagExpander {
  constructor() {
    super(/#output (?<key>.*?)\n/g);
  }

  onPropertyNotFound(key) {
    throw new Error(`Couldn't find output attribute: ${key}`);
  }

  renderAttributeDefn(key, meta) {
    return `out ${meta.type} ${key};`;
  }
}

export class ShaderSourceGenerator {
  constructor() {
    this._attributeExpander = new AttributeHashTagExpander();
    this._outputExpander = new OutputHashTagExpander();
    this._uniformExpander = new UniformHashTagExpander();
    this._materialExpander = new MaterialHashTagExpander();
  }

  _resetState() {
    this._attributeExpander.reset();
    this._outputExpander.reset();
    this._uniformExpander.reset();
    this._materialExpander.reset();
  }

  _generateGLSL(baseTemplate, params) {
    this._resetState();

    let shaderSource = render(baseTemplate, params.sourceMap);

    shaderSource = render(shaderSource, params.attribsMap);

    shaderSource = this._attributeExpander.expand(
      shaderSource,
      params.attribsMeta
    );
    shaderSource = this._outputExpander.expand(
      shaderSource,
      params.attribsMeta
    );
    shaderSource = this._uniformExpander.expand(
      shaderSource,
      params.uniformsMeta
    );
    shaderSource = this._materialExpander.expand(
      shaderSource,
      params.uniformsMeta
    );

    return shaderSource;
  }

  generate(params) {
    return {
      vertex: this._generateGLSL(BASE_VERTEX_SHADER_TEMPLATE, params),
      fragment: this._generateGLSL(BASE_FRAGMENT_SHADER_TEMPLATE, params),
    };
  }
}
