export default function Card({
  title,
  spoiler,
  date,
  thumbnail,
}: {
  title: string;
  spoiler: string;
  date: string;
  thumbnail: string;
}) {
  return (
    <div className="bg-zinc-800 max-w-sm rounded overflow-hidden shadow-lg transition-transform duration-300 ease-in-out hover:scale-105">
      <img className="w-full" alt={title} src={thumbnail} />
      <div className="px-6 pt-4 pb-2">{date}</div>
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
        <p className="text-gray-400 text-base">{spoiler}</p>
      </div>
    </div>
  );
}
