import { Dirent, existsSync, promises as fsp } from "fs";
import { join } from "path";

export const getFiles = async (dirPath: string, pattern: RegExp) => {
  if (fsp === undefined) {
    return [];
  }

  const dirs = await fsp.readdir(dirPath, { withFileTypes: true });

  return dirs
    .filter((f: Dirent | string) => {
      try {
        if (typeof f === "string") {
          return existsSync(join(dirPath, f)) && pattern.test(f);
        } else {
          return f.isFile() && pattern.test(f.name);
        }
      } catch {
        return false;
      }
    })
    .map((f) => join(dirPath, typeof f === "string" ? f : f.name));
};
