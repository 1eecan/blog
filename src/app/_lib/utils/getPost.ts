import { readFile } from "fs/promises";
import matter from "gray-matter";
import path from "path";

const getPost = async ({ params }: { params: { slug: string } }) => {
  const target = path.join(process.cwd(), "public/");
  const filename = target + params.slug + "/index.md";
  const file = await readFile(filename, "utf8");
  const { content, data } = matter(file);
  return { content, data };
};

export default getPost;
