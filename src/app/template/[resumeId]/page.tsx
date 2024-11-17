import TemplateSelectionPage from "./TemplateSelectionPage";

export default function Page({
  params,
}: {
  params: { resumeId: string };
}): React.JSX.Element {
  const { resumeId } = params;

  return <TemplateSelectionPage resumeId={resumeId} />;
}
