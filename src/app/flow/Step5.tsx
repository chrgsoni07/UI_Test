import React, { useState } from "react";
import {
  Box,
  Card,
  Typography,
  CardMedia,
  IconButton,
  Dialog,
  DialogContent,
  Button,
  Container,
} from "@mui/material";
import PreviewIcon from "@mui/icons-material/Preview";
import { TemplateRenderer } from "../template/[resumeId]/TemplateSelectionPage";
import { Resume } from "../resume/Resume";
import { updateTemplateIdOfResume } from "@/service/api";

const templates = [
  { id: 1, image: "../img/template1.jpg" },
  { id: 2, image: "../img/template2.jpg" },
  { id: 3, image: "../img/template3.jpg" },
];

interface step5props {
  selectedResume: Resume;
}
const Step5: React.FC<step5props> = ({ selectedResume }) => {
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
    updateTemplateIdOfResume(selectedResume.id, id);

    alert("Template Saved successfully");
  };

  return (
    <Container>
      <Box sx={{ display: "flex", height: "70vh" }}>
        {/* Left Side: Show 3 Templates */}
        <Box
          sx={{
            width: 300,
            padding: 2,
            borderRight: "1px solid #ccc", // Optional, to add a border between left and right
          }}
        >
          <Typography variant="h6" gutterBottom>
            Templates
          </Typography>
          {templates.map((template) => (
            <Card
              sx={{
                border: "1px solid #ccc",
                borderRadius: 2,
                boxShadow: 1,
                overflow: "hidden",
                padding: 2,
              }}
            >
              <CardMedia
                component="img"
                height="100"
                image={template.image}
                alt="Template Thumbnail"
                //    onClick={() => handleClickOpen(template.image)}
                onClick={() => handleSelect(template.id)}
                sx={{ objectFit: "cover" }}
              />

              <IconButton aria-label="preview">
                <PreviewIcon onClick={() => handleSelect(template.id)} />
              </IconButton>
            </Card>
          ))}

          <Dialog open={open} onClose={handleClose}>
            <DialogContent>
              <img
                src={selectedImage}
                alt="Template Full"
                style={{ width: "100%" }}
              />
            </DialogContent>
          </Dialog>
        </Box>

        {/* Right Side: Main Content (Stepper) */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            padding: 3,
          }}
        >
          <TemplateRenderer
            resumeData={selectedResume}
            templateType={templateType}
          />
          <Button
            className="button"
            variant="contained"
            onClick={() => saveTemplateIdOnResume(templateType)}
          >
            Save
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Step5;
