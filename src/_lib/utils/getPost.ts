import { readFileSync } from "fs";
import matter from "gray-matter";

const getPost = ({ params }: { params: { slug: string[] } }) => {
  const filePath = params.slug.join("/");
  const filename = "./public/article/" + filePath + "/index.md";
  const file = readFileSync(filename, "utf8");
  const { content, data } = matter(file);
  return { content, data };
};

export default getPost;
