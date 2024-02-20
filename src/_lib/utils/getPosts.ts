import { readdirSync, readFileSync } from "fs";
import matter from "gray-matter";
type Post = {
  slug: string;
  title: string;
  date: string;
  spoiler: string;
  featured: boolean;
  thumbnail: string;
};

const rootPath = "./public/post";

const getEntries = (path: string = "") => {
  const entries = readdirSync(`${rootPath}/${path}`, {
    withFileTypes: true,
  });
  return entries;
};

export default async function getPosts() {
  const entries = getEntries();
  const filePath = entries.flatMap(({ name }, index) => {
    return getEntries(name).flatMap(({ name, path }) => {
      return `${path}/${name}`;
    });
  });
  const fileContents = await Promise.all(
    filePath.map((path) => readFileSync(`${path}/index.md`, "utf8"))
  );
  const posts: Post[] = fileContents.map((fileContent, index) => {
    const slug = filePath[index].replace(rootPath + "/", "");
    const { data } = matter(fileContent) as any;
    return { slug, ...data };
  });

  posts.sort((a, b) => {
    return Date.parse(a.date) < Date.parse(b.date) ? 1 : -1;
  });

  return posts;
}
