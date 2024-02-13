import getEntries from "@/_lib/utils/getEntries";
import Link from "next/link";

const SeriesPage = ({ params }: { params: { slug: string } }) => {
  const series = getEntries(params.slug);
  return (
    <>
      <header>
        <h1 className="text-4xl font-bold">Series</h1>
      </header>
      <hr className="my-5" />
      <section className="my-12 flex flex-col  gap-2">
        {series.map((_) => (
          <Link key={_} href={`/article/${params.slug}/${_}/`}>
            <div>{_}</div>
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
