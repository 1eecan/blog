import Link from "next/link";
import Breadcrumb from "../_ui/components/Breadcrumb/Breadcrumb";

const Home = () => {
  const cardComponentClass =
    "w-40 h-64 border-solid border-2 border-[#f1d970] flex justify-center items-center dark:border-[#a38b21]";

  return (
    <div className="flex flex-col gap-10">
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
