import { Document, Font, Page, Text, PDFViewer } from "@react-pdf/renderer";
import { type Resume } from "../../resume/Resume";
import ResumeTemplate1 from "../../../components/renderer/ResumeTempate1";
import ResumeTemplate2 from "../../../components/renderer/ResumeTemplate2";
import ResumeTemplate3 from "../../../components/renderer/ResumeTemplate3";

interface TemplateRendererProps {
  resumeData: Resume;
  templateType: number;
}

// Ensure Lato font is loaded for consistency
Font.register({
  family: "Lato",
  src: `https://fonts.gstatic.com/s/lato/v16/S6uyw4BMUTPHjx4wWw.ttf`,
});

const TemplateOptions: React.FC<TemplateRendererProps> = ({
  resumeData,
  templateType,
}) => {
  if (templateType === 1) {
    return <ResumeTemplate1 resume={resumeData} orientation="portrait" />;
  }
  if (templateType === 2) {
    return <ResumeTemplate2 resume={resumeData} />;
  }
  if (templateType === 3) {
    return <ResumeTemplate3 resume={resumeData} />;
  }
  return (
    <PDFViewer width="100%" height="600">
      <Document keywords="resume, ATS, multinational company" title="Resume">
        <Page>
          <Text>select the template to generate your resume PDF.</Text>
        </Page>
      </Document>
    </PDFViewer>
  );
};

export default TemplateOptions;
