import { readdirSync } from "fs";

const rootPath = "./public/article";

const getEntries = (path: string = "") => {
  const entries = readdirSync(`${rootPath}/${path}`, {
    withFileTypes: true,
  }).map((entry) => entry.name);
  return entries;
};

export default getEntries;
