import { readdir } from "fs/promises";

import getPost from "@/app/lib/utils/getPost";

import Breadcrumb from "../../../ui/components/Breadcrumb/Breadcrumb";

import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";
import remarkToc from "remark-toc";
import ProgressBar from "../../../ui/components/ProgressBar/ProgressBar";

const Post = async ({ params }: { params: { slug: string } }) => {
  const post = await getPost({ params });
  const { data } = post;
  const mdxSource = post.content;
  return (
    <>
      <ProgressBar />
      <Breadcrumb />
      <div className="prose dark:text-white">
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
  const entries = await readdir("./public/", { withFileTypes: true });
  const dirs = entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);
  return dirs.map((dir) => ({ slug: dir }));
}
