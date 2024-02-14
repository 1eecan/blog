import ProgressBar from "@/_ui/components/ProgressBar/ProgressBar";
import ScrollUpButton from "@/_ui/components/FloatingButton/ScrollUpButton";
export default function ArticlePageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <ProgressBar />
      <div>{children}</div>
      <ScrollUpButton />
    </div>
  );
}
