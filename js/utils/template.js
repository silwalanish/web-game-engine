import { isNonEmptyString } from "./string.js";

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

export function renderEngine(baseTemplate, regex, processMatch) {
  if (!isNonEmptyString(baseTemplate)) {
    throw new Error("baseTemplate is required.");
  }

  if (!regex instanceof RegExp) {
    throw new Error("regex is not a valid RegExp.");
  }

  if (typeof processMatch !== "function") {
    throw new Error("processMatch is not a function.");
  }

  let renderedString = baseTemplate;

  for (let match of baseTemplate.matchAll(regex)) {
    renderedString = renderedString.replaceAll(match[0], processMatch(match));
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

  return renderEngine(baseTemplate, /{(?<key>.*?)}/g,  (match) => {
    let key = match.groups.key.trim();
    if (keyExists(data, key)) {
      return getValue(data, key);
    }

    return match[0];
  });
}
