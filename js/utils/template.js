import { isNonEmptyString } from "./string.js";

const MAX_ITERATION = 50;

function keyExists(object, key) {
  if (object instanceof Map) {
    return object.has(key);
  }

  return key in object;
}

function getValue(object, key) {
  if (object instanceof Map) {
    return object.get(key).trim();
  }

  return object[key].trim();
}

export function templateEngine(baseTemplate, regex, processMatch) {
  if (!isNonEmptyString(baseTemplate)) {
    throw new Error("baseTemplate is required.");
  }

  if (!regex instanceof RegExp) {
    throw new Error("regex is not a valid RegExp.");
  }

  if (typeof processMatch !== "function") {
    throw new Error("processMatch is not a function.");
  }

  let iterationCount = 0;

  let renderedString = baseTemplate;
  let matches = [...renderedString.matchAll(regex)];
  while (matches.length > 0) {
    for (let match of matches) {
      renderedString = renderedString.replaceAll(match[0], processMatch(match));
    }

    matches = [...renderedString.matchAll(regex)];

    if (iterationCount++ > MAX_ITERATION) {
      throw new Error("Max iteration reached.");
    }
  }

  return renderedString;
}

export function render(baseTemplate, data) {
  if (!isNonEmptyString(baseTemplate)) {
    throw new Error("baseTemplate is required.");
  }

  if (!data || typeof data !== "object" || data instanceof Array) {
    console.warn(
      "Invalid data provided. data needs to be a Map. Skipping template rendering."
    );

    return baseTemplate;
  }

  if (!(data instanceof Map)) {
    console.warn("Provide data as a Map.");
  }

  return templateEngine(baseTemplate, /{(?<key>.*?)}/g, (match) => {
    let key = match.groups.key.trim();
    if (keyExists(data, key)) {
      return getValue(data, key);
    }

    throw new Error(`${key} doesn't exists in the data.`);
  });
}
