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

import { type Resume } from "../../resume/Resume";
import { updateTemplateIdOfResume } from "@/service/api";
import toast from "react-hot-toast";
// import TemplateOptions from "./TemplateOptions";

import dynamic from "next/dynamic";

const TemplateOptions = dynamic(
  () => import("./TemplateOptions").then((mod) => mod),
  {
    ssr: false,
    loading: () => <p>Loading...</p>,
  }
);

const templates = [
  { id: 1, image: "../img/template1.jpg" },
  { id: 2, image: "../img/template2.jpg" },
  { id: 3, image: "../img/template3.jpg" },
];

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

      <TemplateOptions resumeData={resume} templateType={templateType} />
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

export default TemplateSelectionPage;
