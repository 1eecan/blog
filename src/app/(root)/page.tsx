import getPosts from "../lib/utils/getPosts";
import Link from "next/link";

const Home = async () => {
  const posts = await getPosts();

  const cardComponentClass =
    "w-40 h-64 border-solid border-2 border-sky-500 flex justify-center items-center";

  return (
    <>
      <main className="bg-gray-300">1eecan</main>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab hic ducimus
        dolore dolorem nam, accusantium magni suscipit possimus quidem non eius
        laborum eum eaque inventore ut modi doloribus, sint provident.
      </p>
      <div className="flex justify-between">
        {" "}
        <div className={cardComponentClass}>
          <Link href="/projects">Projects</Link>
        </div>
        <div className={cardComponentClass}>
          <Link href="/blog">Blog</Link>
        </div>
        <div className={cardComponentClass}>
          <Link href="/bookmark">Bookmark</Link>
        </div>
      </div>
    </>
  );
};

export default Home;
