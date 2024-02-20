import getPosts from "@/_lib/utils/getPosts";
import Link from "next/link";
import Card from "@/_ui/components/Card/Card";

export default async function PostListPage() {
  const posts = await getPosts();
  return (
    <>
      <header>
        <h1 className="text-4xl font-bold">Post</h1>
      </header>
      <hr className="my-5" />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {posts.map((post) => (
          <Link key={post.slug} href={`/post/${post.slug}/`}>
            <Card {...post}></Card>
          </Link>
        ))}
      </div>
    </>
  );
}
