import { readdir } from "fs/promises";

import getPost from "@/app/lib/utils/getPost";

const Post = async ({ params }: { params: { slug: string } }) => {
  const post = await getPost({ params });
  const { data } = post;
  return (
    <>
      <div>{data.date}</div>
      <div>{post.content}</div>
    </>
  );
};

export default Post;

export async function generateStaticParams() {
  const entries = await readdir("./public/", { withFileTypes: true });
  const dirs = entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);
  return dirs.map((dir) => ({ slug: dir }));
}
