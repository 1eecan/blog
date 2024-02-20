import getPosts from "@/_lib/utils/getPosts";
import Link from "next/link";
import Card from "@/_ui/components/Card/Card";

const BlogHome = async () => {
  const posts = await getPosts();
  return (
    <>
      <header>
        <h1 className="text-4xl font-bold">Article</h1>
      </header>
      <hr className="my-5" />
      <div className="mt-10 flex flex-col gap-6">
        {posts.map((post) => (
          <Link key={post.slug} href={`/article/${post.slug}/`}>
            <Card {...post}></Card>
          </Link>
        ))}
      </div>
    </>
  );
};

export default BlogHome;
