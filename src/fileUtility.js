// We coded this as a group

import { readFile, writeFile } from "node:fs/promises";

export function writeToJSONFile(path, data) {
  return writeFile(path, JSON.stringify(data));
}

export function readFromJSONFile(path) {
  const options = { encoding: "utf8" };
  return readFile(path, options).then((text) => JSON.parse(text));
}
