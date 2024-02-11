import { readdir, readFile } from "fs/promises";
import matter from "gray-matter";
import getPost from "@/_lib/utils/getPost";

import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";
import remarkToc from "remark-toc";

import CalenderIcon from "@/_ui/icons/CalenderIcon";

const Post = async ({ params }: { params: { slug: string } }) => {
  const post = await getPost({ params });
  const { data } = post;
  const mdxSource = post.content;
  return (
    <>
      <div className="prose dark:text-white dark:prose-headings:text-white dark:prose-blockquote:text-white">
        <div className="flex items-center gap-1 text-xs">
          <CalenderIcon />
          {data.date}
        </div>
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

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const file = await readFile(
    "./public/article/" + params.slug + "/index.md",
    "utf8"
  );
  let { data } = matter(file);
  return {
    title: data.title + " — 1eecan",
    description: data.spoiler,
  };
}
