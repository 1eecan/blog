import Link from "next/link";

const Header = () => {
  return (
    <nav className="w-full flex justify-between mb-[50px]">
      <div className="flex gap-3 justify-between">
        <Link href={`/blog`}>Article</Link>
        <Link href={`/projects`}>Project</Link>
        <Link href={`/bookmark`}>Bookmark</Link>
      </div>
      <Link href={`/`}>
        <img
          src={"https://avatars.githubusercontent.com/u/120288440?v=4"}
          width={"30"}
          height={"30"}
          className="rounded-full"
          alt="profile image"
        />
      </Link>
    </nav>
  );
};

export default Header;
