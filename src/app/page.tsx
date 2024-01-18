import Link from "next/link";

const Home = () => {
  return (
    <>
      <main className="bg-gray-300">Home</main>
      <Link href={"/about"}>go to about</Link>
      <br></br>
      <Link href={"/post"}>go to post-list</Link>
    </>
  );
};

export default Home;
