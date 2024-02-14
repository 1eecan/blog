export default function ProjectCard({
  title,
  subTitle,
  techStack,
  servicePage,
}: {
  title: string;
  subTitle: string;
  techStack: (JSX.Element | string)[];
  servicePage: JSX.Element[];
}) {
  return (
    <div className="flex flex-col gap-5 hover:bg-slate-800">
      <div className="font-black text-xl">{title}</div>
      <div>{subTitle}</div>
      <div className="max-w-[400px] flex justify-between items-baseline">
        <div className="flex gap-3 items-end">{techStack}</div>
        <div className="flex gap-1.5">{servicePage}</div>
      </div>
    </div>
  );
}
