// TemplateSelectionPage.tsx
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

import ResumeTemplate1 from "../renderer/ResumeTempate1";
import ResumeTemplate2 from "../renderer/ResumeTemplate2";
import ResumeTemplate3 from "../renderer/ResumeTemplate3";
import { type Resume } from "../resume/Resume";
import { getResumeById } from "@/service/api";

const templates = [
  { id: 1, image: "/assets/template1.jpg" },
  { id: 2, image: "/assets/template2.jpg" },
  { id: 3, image: "/assets/template3.jpg" },
];

// Ensure Lato font is loaded for consistency
Font.register({
  family: "Lato",
  src: `https://fonts.gstatic.com/s/lato/v16/S6uyw4BMUTPHjx4wWw.ttf`,
});

const TemplateSelectionPage: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  // const location = useLocation();
  const [templateType, setTemplateType] = useState(0);
  // const navigate = useNavigate();
  // const resumeID = location.state?.id;
  //Hardcode resume ID
  const resumeID = "6707fbd1cb200b6b9a936aa2";

  useEffect(() => {
    if (resumeID === null || resumeID === undefined) {
      //   navigate("/dashboard/resume");
    }
  }, [resumeID, navigate]);

  const {
    isLoading,
    error,
    data,
    refetch: getResumeByIDRQ,
  } = useQuery({
    queryKey: ["oneResume", resumeID],
    queryFn: () => getResumeById(resumeID),
    enabled: false,
  });

  const handleSelect = async (templateId: number) => {
    console.log("show the resume in template format ", templateId);

    //if (!location.state.id) {
    //   navigate("/dashboard/resume");
    // }

    setTemplateType(templateId);

    if (!data) {
      try {
        await getResumeByIDRQ();
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
