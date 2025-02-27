"use client";
import React, { useState } from "react";
import {
  Button,
  Card,
  CardMedia,
  Container,
  Dialog,
  DialogContent,
  Grid,
} from "@mui/material";
import { Document, Font, Page, Text, PDFViewer } from "@react-pdf/renderer";

import ResumeTemplate1 from "../../../components/renderer/ResumeTempate1";
import ResumeTemplate2 from "../../../components/renderer/ResumeTemplate2";
import ResumeTemplate3 from "../../../components/renderer/ResumeTemplate3";
import { type Resume } from "../../resume/Resume";
import { updateTemplateIdOfResume } from "@/service/api";
import toast from "react-hot-toast";

const templates = [
  { id: 1, image: "../img/template1.jpg" },
  { id: 2, image: "../img/template2.jpg" },
  { id: 3, image: "../img/template3.jpg" },
];

// Ensure Lato font is loaded for consistency
Font.register({
  family: "Lato",
  src: `https://fonts.gstatic.com/s/lato/v16/S6uyw4BMUTPHjx4wWw.ttf`,
});

interface TemplateSelectionPageProps {
  resume: Resume;
}

const TemplateSelectionPage: React.FC<TemplateSelectionPageProps> = ({
  resume,
}) => {
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [templateType, setTemplateType] = useState(0);

  const handleSelect = async (templateId: number) => {
    setTemplateType(templateId);
  };

  const handleClickOpen = (image: string) => {
    setSelectedImage(image);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedImage("");
  };

  const saveTemplateIdOnResume = (id: number) => {
    updateTemplateIdOfResume(resume.id, id);

    toast.success("Resume template saved successfully ");
  };

  return (
    <Container>
      <Grid container spacing={3}>
        {templates.map((template) => (
          <Grid item xs={12} sm={6} md={4} key={template.id}>
            <Card>
              <CardMedia
                component="img"
                height="280"
                image={template.image}
                alt="Template Thumbnail"
                onClick={() => handleClickOpen(template.image)}
                sx={{ objectFit: "cover" }}
              />
              <Button
                className="button"
                variant="contained"
                onClick={() => handleSelect(template.id)}
              >
                Select
              </Button>
            </Card>

            <Dialog open={open} onClose={handleClose}>
              <DialogContent>
                <img
                  src={selectedImage}
                  alt="Template Full"
                  style={{ width: "100%" }}
                />
              </DialogContent>
            </Dialog>
          </Grid>
        ))}
      </Grid>

      <TemplateRenderer resumeData={resume} templateType={templateType} />
      <Button
        className="button"
        variant="contained"
        onClick={() => saveTemplateIdOnResume(templateType)}
        disabled={templateType === 0}
      >
        Save
      </Button>
    </Container>
  );
};

interface TemplateRendererProps {
  resumeData: Resume;
  templateType: number;
}

export const TemplateRenderer: React.FC<TemplateRendererProps> = ({
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

export default TemplateSelectionPage;
