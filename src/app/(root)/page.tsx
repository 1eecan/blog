import getPosts from "../lib/utils/getPosts";
import Link from "next/link";
import Breadcrumb from "../ui/components/Breadcrumb/Breadcrumb";

const Home = async () => {
  const posts = await getPosts();

  const cardComponentClass =
    "w-40 h-64 border-solid border-2 border-[#a38b21] flex justify-center items-center";

  return (
    <div className="flex flex-col gap-10">
      <Breadcrumb />
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab hic ducimus
        dolore dolorem nam, accusantium magni suscipit possimus quidem non eius
        laborum eum eaque inventore ut modi doloribus, sint provident.
      </p>
      <div className="flex justify-around">
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
    </div>
  );
};

export default Home;
