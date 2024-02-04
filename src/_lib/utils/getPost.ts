import { readFile } from "fs/promises";
import matter from "gray-matter";

const getPost = async ({ params }: { params: { slug: string } }) => {
  const filename = "./public/article/" + params.slug + "/index.md";
  const file = await readFile(filename, "utf8");
  const { content, data } = matter(file);
  return { content, data };
};

export default getPost;
