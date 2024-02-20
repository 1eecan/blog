import Link from "next/link";
import getPosts from "@/_lib/utils/getPosts";
import Card from "@/_ui/components/Card/Card";

const Home = async () => {
  const posts = await getPosts();
  return (
    <>
      <header>
        <h1 className="text-4xl font-bold">Home</h1>
      </header>
      <hr className="my-5" />
      <h1 className="text-4xl font-bold">Featured Articles</h1>
      <div className="mt-10 flex flex-col gap-6">
        {posts
          .filter((post) => post.featured)
          .map((post) => (
            <Link key={post.slug} href={`/article/${post.slug}/`}>
              <Card {...post}></Card>
            </Link>
          ))}
      </div>
    </>
  );
};

export default Home;
