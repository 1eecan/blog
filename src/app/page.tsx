import getPosts from "./lib/utils/getPosts";
import Link from "next/link";

const Home = async () => {
  const posts = await getPosts();
  return (
    <>
      <main className="bg-gray-300">Home</main>
      <div>
        {posts.map((post) => (
          <Link key={post.slug} href={`/post/${post.slug}/`}>
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
