import { readdirSync } from "fs";

const rootPath = "./public/post";

export default function getEntries(path: string = "") {
  const entries = readdirSync(`${rootPath}/${path}`, {
    withFileTypes: true,
  }).map((entry) => entry.name);
  return entries;
}
