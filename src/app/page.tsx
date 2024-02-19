import Link from "next/link";
import getPosts from "@/_lib/utils/getPosts";

const Home = async () => {
  const posts = await getPosts();
  console.log(posts);
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
              <div>{post.title}</div>
              <div>{post.date}</div>
              <div>{post.spoiler}</div>
            </Link>
          ))}
      </div>
    </>
  );
};

export default Home;
