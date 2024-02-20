import Link from "next/link";
import getPosts from "@/_lib/utils/getPosts";
import Card from "@/_ui/components/Card/Card";

export default async function HomePage() {
  const posts = await getPosts();
  return (
    <>
      <header>
        <h1 className="text-4xl font-bold">Home</h1>
      </header>
      <hr className="my-5" />
      <h1 className="text-4xl font-bold">Featured Posts</h1>
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {posts
          .filter((post) => post.featured)
          .map((post) => (
            <Link key={post.slug} href={`/post/${post.slug}/`}>
              <Card {...post}></Card>
            </Link>
          ))}
      </div>
    </>
  );
}
