import ProgressBar from "@/_ui/components/ProgressBar/ProgressBar";

export default function ArticlePageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ProgressBar />
      {children}
    </>
  );
}
