import fs from "fs";
import { dirname, join, relative } from "path";

export function getRelPathSync(fileName, from) {
  try {
    fs.accessSync(fileName, fs.constants.F_OK);
    return relative(dirname(from), join(process.cwd(), fileName));
  } catch {}
  return null;
}
