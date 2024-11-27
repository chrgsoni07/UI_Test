"use client";

import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Backdrop,
  Box,
  Fade,
  Modal,
} from "@mui/material";
import { useState, type FC } from "react";
import { Resume } from "../resume/Resume";
import { getAllResumeOfUser, getResumeById } from "@/service/api";
import { useQuery } from "@tanstack/react-query";
import PreviewIcon from "@mui/icons-material/Preview";
import DownloadIcon from "@mui/icons-material/Download";
import CloseIcon from "@mui/icons-material/Close";
import React from "react";
import { TemplateRenderer } from "../template/[resumeId]/TemplateSelectionPage";
import { pdf, PDFDownloadLink } from "@react-pdf/renderer";
import moment from "moment";

const Page: FC = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const [selectedResume, setSelectedResume] = useState<Resume>();

  const handleClose = () => {
    console.log("close evenet called");
    setOpen(false);
    setSelectedResume(undefined);
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 1200,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const {
    isLoading,
    error,
    data: allResume,
  } = useQuery({
    queryKey: ["getSavedResume"],
    queryFn: () => getAllResumeOfUser(),
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const handlePreview = async (resume: Resume) => {
    console.log(
      `Previewing Resume ID: ${resume.id} & template id ${resume.metadata.templateId}`
    );
    setSelectedResume(resume);
    handleOpen();
  };

  const handlePreview1 = async (resume: Resume) => {
    console.log(
      `Previewing Resume ID: ${resume.id} & template id ${resume.metadata.templateId}`
    );
    try {
      const resumeDB = await getResumeById(resume.id);
      setSelectedResume(resumeDB);
      handleOpen();
    } catch (error) {
      console.error("Error fetching resume:", error);
    }
  };

  const handelDownload = (resume: Resume) => {
    setSelectedResume(resume);
    console.log(`download Resume ID : ${resume.id} `);

    if (!selectedResume) {
      console.error("No resume data available");
      return;
    }

    const pdfDocument = (
      <TemplateRenderer
        resumeData={selectedResume}
        templateType={selectedResume.metadata.templateId}
      />
    );

    pdf(pdfDocument)
      .toBlob()
      .then((blob) => {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "resume.pdf";
        link.click();
      })
      .catch((error) => {
        console.error("Error generating the PDF:", error);
      });
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ maxWidth: 1000 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Job Title</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Preview</TableCell>
              <TableCell>Download</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allResume.map((resume: Resume) => (
              <TableRow key={resume.id}>
                <TableCell>{resume.id}</TableCell>
                <TableCell>{resume.jobTitle}</TableCell>
                <TableCell>
                  {moment(resume.metadata.createdAt).format(
                    "DD-MMM-YYYY HH:mm:ss"
                  )}
                </TableCell>
                <TableCell>
                  <IconButton aria-label="preview">
                    <PreviewIcon onClick={() => handlePreview(resume)} />
                  </IconButton>
                </TableCell>
                <TableCell>
                  <IconButton aria-label="download">
                    <DownloadIcon onClick={() => handelDownload(resume)} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <IconButton aria-label="download">
              <CloseIcon onClick={handleClose}></CloseIcon>
            </IconButton>
            {selectedResume ? (
              <TemplateRenderer
                resumeData={selectedResume}
                templateType={selectedResume?.metadata?.templateId}
              />
            ) : (
              <div>Loading...</div>
            )}
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default Page;
