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

export default async function Page({
  params,
}: {
  params: Promise<{ resumeId: string }>;
}) {
  const { resumeId } = await params;

  return (
    <Suspense fallback={<TemplateSelectionSkeleton />}>
      <TemplatePageContents resumeId={resumeId} />
    </Suspense>
  );
}
