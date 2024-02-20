import ProgressBar from "@/_ui/components/ProgressBar/ProgressBar";
import ScrollUpButton from "@/_ui/components/FloatingButton/ScrollUpButton";
import Comment from "@/_ui/components/Comment/Comment";
export default function PostPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <ProgressBar />
      <div>{children}</div>
      <ScrollUpButton />
      <Comment />
    </div>
  );
}
