import ProgressBar from "@/_ui/components/ProgressBar/ProgressBar";

export default function ArticlePageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex justify-center">
      <ProgressBar />
      {children}
    </div>
  );
}
