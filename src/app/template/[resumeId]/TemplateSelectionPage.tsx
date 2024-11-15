"use client";
import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardMedia,
  Container,
  Dialog,
  DialogContent,
  Grid,
} from "@mui/material";
import { Font } from "@react-pdf/renderer";
import { useQuery } from "@tanstack/react-query";

import ResumeTemplate1 from "../../../components/renderer/ResumeTempate1";
import ResumeTemplate2 from "../../../components/renderer/ResumeTemplate2";
import ResumeTemplate3 from "../../../components/renderer/ResumeTemplate3";
import { type Resume } from "../../resume/Resume";
import { getResumeById } from "@/service/api";

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
  resumeId: string;
}

const TemplateSelectionPage: React.FC<TemplateSelectionPageProps> = ({
  resumeId,
}) => {
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [templateType, setTemplateType] = useState(0);

  if (!resumeId) {
    return <p>Loading...</p>;
  }

  const {
    isLoading,
    error,
    data,
    refetch: getById,
  } = useQuery({
    queryKey: ["oneResume", resumeId],
    queryFn: () => getResumeById(resumeId),
    enabled: false,
  });

  const handleSelect = async (templateId: number) => {
    setTemplateType(templateId);
    if (!data) {
      try {
        await getById();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleClickOpen = (image: string) => {
    setSelectedImage(image);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedImage("");
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
      {data && (
        <TemplateRenderer resumeData={data} templateType={templateType} />
      )}
    </Container>
  );
};

interface TemplateRendererProps {
  resumeData: Resume;
  templateType: number;
}

const TemplateRenderer: React.FC<TemplateRendererProps> = ({
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
  return <div>Please select template to preview resume...</div>;
};

export default TemplateSelectionPage;
