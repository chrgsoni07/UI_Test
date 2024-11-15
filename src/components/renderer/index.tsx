// src/Resume.tsx
import React from "react";
import { Document } from "@react-pdf/renderer";

import { type Resume } from "../../app/resume/Resume";
import ResumeTemplate1 from "./ResumeTempate1";
import ResumeTemplate2 from "./ResumeTemplate2";
import ResumeTemplateTest from "./ResumeTemplate3";

// App component
const App = ({ resumeData }: { resumeData: Resume }) => {
  return (
    <Document
      author="Chirag Soni"
      keywords="resume, milpitas communications"
      subject="The resume of Chirag Soni"
      title="Resume"
    >
      {/*  <ResumePDF size="A4" />
      <ResumePDF orientation="landscape" size="A4" />
      <ResumePDF size={[380, 1250]} />*/}
      <ResumeTemplate1 size="A4" resume={resumeData} />
      <ResumeTemplate2 resume={resumeData} />
      <ResumeTemplateTest resume={resumeData} />
    </Document>
  );
};
export default App;
