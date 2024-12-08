import { getResumeById } from "@/service/api";
import TemplateSelectionPage from "./TemplateSelectionPage";

import React, { Suspense } from "react";
import TemplateSelectionSkeleton from "./TemplateSelectionSkeleton";

const TemplatePageContents: React.FC<{ resumeId: string }> = async ({
  resumeId,
}) => {
  const data = await getResumeById(resumeId);

  return <TemplateSelectionPage resume={data} />;
};

export default function Page({ params }: { params: { resumeId: string } }) {
  const { resumeId } = params;

  return (
    <Suspense fallback={<TemplateSelectionSkeleton />}>
      <TemplatePageContents resumeId={resumeId} />
    </Suspense>
  );
}
