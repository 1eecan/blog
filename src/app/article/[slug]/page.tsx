import { readdir } from "fs/promises";

import getPost from "@/_lib/utils/getPost";

import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";
import remarkToc from "remark-toc";

const Post = async ({ params }: { params: { slug: string } }) => {
  const post = await getPost({ params });
  const { data } = post;
  const mdxSource = post.content;
  return (
    <>
      <div className="prose dark:text-white dark:prose-headings:text-white">
        <div>{data.date}</div>
        <MDXRemote
          source={mdxSource}
          options={{
            mdxOptions: {
              useDynamicImport: true,
              remarkPlugins: [
                remarkGfm,
                remarkBreaks,
                [remarkToc, { tight: true, maxDepth: 3 }],
              ],
              rehypePlugins: [
                rehypeSlug,
                [
                  rehypePrettyCode,
                  {
                    theme: "rose-pine",
                  },
                ],
              ],
            },
          }}
        />
      </div>
    </>
  );
};

export default Post;

export async function generateStaticParams() {
  const entries = await readdir("./public/article/", { withFileTypes: true });
  const dirs = entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);
  return dirs.map((dir) => ({ slug: dir }));
}
