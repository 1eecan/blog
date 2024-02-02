import getPosts from "@/_lib/utils/getPosts";
import Link from "next/link";

const BlogHome = async () => {
  const posts = await getPosts();
  return (
    <>
      <div className="mt-10 flex flex-col gap-6">
        {posts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}/`}>
            <div>{post.title}</div>
            <div>{post.date}</div>
            <div>{post.spoiler}</div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default BlogHome;