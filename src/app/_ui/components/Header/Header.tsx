import Link from "next/link";

const Header = () => {
  return (
    <nav className="w-full flex justify-between">
      <div className="w-1/3 flex justify-between">
        <Link href={`/blog`}>Article</Link>
        <Link href={`/projects`}>Project</Link>
        <Link href={`/bookmark`}>Bookmark</Link>
      </div>
      <Link href={`/`}>about</Link>
    </nav>
  );
};

export default Header;
