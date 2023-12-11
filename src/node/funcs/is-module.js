import { readFileSync } from "fs";
import { resolve } from "path";

export function isModule() {
  try {
    const path = resolve("package.json");
    const content = readFileSync(path, "utf-8");
    const json = JSON.parse(content);
    
    return json.type === "module"
  } catch (error) {
    return null;
  }
}
