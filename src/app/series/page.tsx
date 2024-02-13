import getEntries from "@/_lib/utils/getEntries";
import Link from "next/link";

const SeriesListPage = () => {
  const seriesList = getEntries();
  return (
    <>
      <header>
        <h1 className="text-4xl font-bold">Series</h1>
      </header>
      <hr className="my-5" />
      <section className="my-12 flex flex-col  gap-2">
        {seriesList.map((seriesItem) => (
          <Link key={seriesItem} href={`/series/${seriesItem}/`}>
            <div>{seriesItem}</div>
          </Link>
        ))}
      </section>
    </>
  );
};

export default SeriesListPage;
