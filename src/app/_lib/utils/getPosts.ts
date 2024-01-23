import { readdir, readFile } from "fs/promises";
import matter from "gray-matter";
import path from "path";

type Post = {
  slug: string;

  title: string;
  date: string;
  spoiler: string;
};

const getPosts = async () => {
  const target = path.join(process.cwd(), "public");
  const entries = await readdir(target, {
    withFileTypes: true,
  });
  const dirs = entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);
  const fileContents = await Promise.all(
    dirs.map((dir) => readFile(target + "/" + dir + "/index.md", "utf8"))
  );
  const posts: Post[] = dirs.map((slug, i) => {
    const fileContent = fileContents[i];
    const { data } = matter(fileContent);
    return { slug, title: data.title, date: data.date, spoiler: data.spoiler };
  });
  posts.sort((a, b) => {
    return Date.parse(a.date) < Date.parse(b.date) ? 1 : -1;
  });
  return posts;
};

export default getPosts;
