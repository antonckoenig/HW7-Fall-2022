import { readFile, writeFile } from "node:fs/promises";

export function writeToJSONFile(path, data) {
  return writeFile(path, JSON.stringify(data));
}

export function readFromJSONFile(path) {
  const {encoding} = "UTF-8";
  return readFile(path, {encoding}).then(text => JSON.parse(text));
}
