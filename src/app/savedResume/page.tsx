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
  Typography,
} from "@mui/material";
import { useState, type FC } from "react";
import { Resume } from "../resume/Resume";
import { getAllResumeOfUser, getResumeById } from "@/service/api";
import { useQuery } from "@tanstack/react-query";
import PreviewIcon from "@mui/icons-material/Preview";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DownloadIcon from "@mui/icons-material/Download";
import CloseIcon from "@mui/icons-material/Close";
import React from "react";
import { TemplateRenderer } from "../template/[resumeId]/TemplateSelectionPage";
import { pdf, PDFDownloadLink } from "@react-pdf/renderer";
import moment from "moment";
import SavedResumeSkeleton from "./SavedResumeSkeleton";
import ReactPDF from "@react-pdf/renderer";
import { redirect } from "next/navigation";

const Page: FC = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const [selectedResume, setSelectedResume] = useState<Resume>();

  const handleClose = () => {
    console.log("close evenet called");
    setOpen(false);
    setSelectedResume(undefined);
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
    return <SavedResumeSkeleton />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const handleDownload = async (resume: Resume) => {
    console.log(
      `Downloading Resume ID: ${resume.id} & template id ${resume.metadata.templateId}`
    );

    if (!resume) {
      console.error("No resume data available");
      return;
    }
  };

  const handleEdit = (resumeId: string) => {
    redirect(`/updateResume/${resumeId}`);
  };

  return (
    <>
      <Typography variant="h4" gutterBottom align="center">
        Your Saved Resumes
      </Typography>
      <Typography
        variant="body1"
        color="textSecondary"
        paragraph
        align="center"
      >
        Here you can view and download your previously saved resumes. Click on
        the preview icon to see the resume or the download icon to save it
        directly to your device.
      </Typography>

      <TableContainer component={Paper} sx={{ mt: 4 }}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Id</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Title</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Date Saved</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allResume.map((resume: Resume) => (
              <TableRow
                key={resume.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>{resume.id}</TableCell>
                <TableCell>{resume.jobTitle}</TableCell>
                <TableCell>
                  {moment(resume.metadata.createdAt).format(
                    "DD-MMM-YYYY HH:mm:ss"
                  )}
                </TableCell>
                <TableCell>
                  <IconButton aria-label="preview">
                    <PreviewIcon
                      onClick={() => {
                        setSelectedResume(resume);
                        handleOpen();
                      }}
                    />
                  </IconButton>
                  <IconButton>
                    <EditNoteIcon
                      onClick={() => handleEdit(resume.id)}
                    ></EditNoteIcon>
                  </IconButton>
                  {/* <IconButton aria-label="download">
                    <DownloadIcon onClick={() => handleDownload(resume)} />
                  </IconButton> */}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box
            sx={{
              bgcolor: "background.paper",
              p: 4,
              outline: "none",
              position: "relative",
            }}
          >
            <IconButton
              onClick={handleClose}
              sx={{ position: "absolute", top: 8, right: 8 }}
            >
              <CloseIcon />
            </IconButton>
            {selectedResume ? (
              selectedResume.metadata?.templateId ? (
                <TemplateRenderer
                  resumeData={selectedResume}
                  templateType={selectedResume.metadata.templateId}
                />
              ) : (
                <Typography variant="h6" color="error">
                  Error: No template ID found for this resume. Please save a
                  template ID and try again.
                </Typography>
              )
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
