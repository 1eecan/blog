import { readFileSync } from "fs";
import matter from "gray-matter";

export default function getPost({ params }: { params: { slug: string[] } }) {
  const filePath = params.slug.join("/");
  const filename = "./public/post/" + filePath + "/index.md";
  const file = readFileSync(filename, "utf8");
  const { content, data } = matter(file);
  return { content, data };
}
