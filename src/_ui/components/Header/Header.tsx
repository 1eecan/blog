import Link from "next/link";

export default function Header() {
  return (
    <nav className="w-full flex justify-between mb-[30px]">
      <div className="flex gap-3 justify-between">
        <Link href={`/`}>Home</Link>
        <Link href={`/post`}>Post</Link>
        <Link href={`/series`}>Series</Link>
        <Link href={`/project`}>Project</Link>
        <Link href={`/bookmark`}>Bookmark</Link>
      </div>
      <Link href={`/about`}>
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
}
