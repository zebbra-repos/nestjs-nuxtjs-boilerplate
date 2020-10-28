import { promises as fsp } from "fs";
import { basename, dirname, join, relative, sep } from "path";
import { flatten } from "flat";

import { getFiles } from "~/utils/i18n/file";

export const loadTranslations = async (
  dirPath: string,
  i18nPath: string,
  pattern: RegExp = new RegExp(".*.json"),
) => {
  const files = await getFiles(join(i18nPath, dirPath), pattern);
  const translations: { [x: string]: string } = {};

  for (const file of files) {
    const prefix = basename(file).split(".")[0];
    const data = JSON.parse(await fsp.readFile(file, "utf8"));
    const key = dirname(relative(i18nPath, file)).split(sep)[0];
    const global = prefix === key;

    const flatData: { [x: string]: string } = flatten(data);

    for (const property of Object.keys(flatData)) {
      translations[`${global ? "" : `${prefix}.`}${property}`] =
        flatData[property];
    }
  }

  return translations;
};
