import { getResumeById } from "@/service/api";
// import TemplateSelectionPage from "./TemplateSelectionPage";
import dynamic from "next/dynamic";

export default async function Page({
  params,
}: {
  params: { resumeId: string };
}) {
  const { resumeId } = params;

  const data = await getResumeById(resumeId);
  const TemplateSelectionPage = dynamic(
    () => import("./TemplateSelectionPage"),
    { ssr: false }
  );

  return <TemplateSelectionPage resume={data} />;
}
