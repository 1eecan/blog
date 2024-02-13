import ProgressBar from "@/_ui/components/ProgressBar/ProgressBar";
import ScrollUpButton from "@/_ui/components/FloatingButton/ScrollUpButton";
export default function ArticlePageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex justify-center">
      <ProgressBar />
      {children}
      <ScrollUpButton />
    </div>
  );
}
