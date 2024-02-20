import getEntries from "@/_lib/utils/getEntries";
import Link from "next/link";
import getPosts from "@/_lib/utils/getPosts";
import Card from "@/_ui/components/Card/Card";

const SeriesPage = async ({ params }: { params: { slug: string } }) => {
  const posts = await getPosts();
  const series = posts.filter(
    (post) => post.slug.split("/")[0] === params.slug
  );
  return (
    <>
      <header>
        <h1 className="text-4xl font-bold">Series</h1>
      </header>
      <hr className="my-5" />
      <section className="my-12 flex flex-col gap-2">
        {series.map((post) => (
          <Link key={post.title} href={`/article/${post.slug}/`}>
            <Card {...post} />
          </Link>
        ))}
      </section>
    </>
  );
};

export function generateStaticParams() {
  const entries = getEntries();
  return entries.map((entry) => ({ slug: entry }));
}

export default SeriesPage;
