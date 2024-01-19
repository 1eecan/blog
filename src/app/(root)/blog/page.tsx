import getPosts from "../../lib/utils/getPosts";
import Link from "next/link";

const BlogHome = async () => {
  const posts = await getPosts();
  return (
    <>
      <main className="bg-gray-300">
        <Link href="/">backward</Link>
      </main>
      <div>
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
