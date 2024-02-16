import { readFileSync } from "fs";
import matter from "gray-matter";
import getPost from "@/_lib/utils/getPost";
import getPosts from "@/_lib/utils/getPosts";

import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";
import remarkToc from "remark-toc";

import CalenderIcon from "@/_ui/icons/CalenderIcon";

import "./markdown.css";

const Post = async ({ params }: { params: { slug: string[] } }) => {
  const post = getPost({ params });
  const { data, content } = post;
  const mdxSource = content;
  return (
    <>
      <div className="prose dark:text-white dark:prose-headings:text-white dark:prose-blockquote:text-white mx-auto">
        <header className="text-4xl font-bold mb-5">{data.title}</header>
        <div className="flex items-center gap-1 text-xs">
          <CalenderIcon />
          {data.date}
        </div>
        <hr className="my-5" />
        <div className="markdown">
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
      </div>
    </>
  );
};

export default Post;

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({ slug: post.slug.split("/") }));
}

export function generateMetadata({ params }: { params: { slug: string[] } }) {
  const filePath = params.slug.join("/");
  const file = readFileSync(
    "./public/article/" + filePath + "/index.md",
    "utf8"
  );
  const { data } = matter(file);
  return {
    title: data.title + " — 1eecan",
    description: data.spoiler,
  };
}
