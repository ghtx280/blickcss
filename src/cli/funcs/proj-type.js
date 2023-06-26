import fs from "fs";
import path from "path";

export function getProjectType(is_type) {
  try {
    const pkg_raw = fs.readFileSync(path.resolve(process.cwd(), 'package.json'), 'utf-8');
    const pkg = JSON.parse(pkg_raw);
    if (is_type) {
      return pkg.type === is_type
    }
    return pkg.type;
  } catch (error) { return null }
}