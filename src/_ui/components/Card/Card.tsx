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
    <div className="bg-zinc-800 max-w-md mx-auto rounded overflow-hidden transition-transform duration-300 ease-in-out hover:scale-105 h-96">
      <div className="w-full h-48 overflow-hidden">
        <img
          className="w-full h-full object-cover"
          alt={title}
          src={thumbnail}
        />
      </div>
      <div className="px-6 pt-4 pb-2 h-12 text-white">{date}</div>
      <div className="px-6 py-4 h-36">
        <div className="font-bold text-xl h-16 text-white">{title}</div>
        <p className="text-gray-400 text-base h-12 line-clamp-2">{spoiler}</p>
      </div>
    </div>
  );
}
