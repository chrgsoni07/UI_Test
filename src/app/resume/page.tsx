"use client";

import { type ChangeEvent, type FC } from "react";
import { Box, Button, CircularProgress, Grid } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { extractDataFromFile } from "@/service/api";
import EditablePreview from "@/app/resume/EditablePreview";
import { type Resume } from "./Resume";
import toast from "react-hot-toast";

const Page: FC = () => {
  const {
    data: resumeData,
    mutate: postCall,
    error: postError,
    isPending,
  } = useMutation({
    mutationFn: (rData: FormData): Promise<Resume> => {
      return extractDataFromFile(rData);
    },
    onSuccess(data) {
      toast.success("Resume uploaded successfully");
    },
  });

  const handleUpload = async (
    e: ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    if (!e.target.files) {
      return;
    }
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    const formData = new FormData();

    formData.append("file", selectedFile);

    postCall(formData);
  };

  return (
    <Box display="flex">
      {isPending && (
        <Box
          position="absolute"
          top="50%"
          left="50%"
          style={{ transform: "translate(-50%, -50%)" }}
        >
          <CircularProgress />
        </Box>
      )}

      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} container alignItems="center">
          <Button
            component="label"
            variant="contained"
            disabled={isPending}
            startIcon={
              isPending ? <CircularProgress size={24} color="inherit" /> : null
            }
            sx={{ textTransform: "none" }}
          >
            {isPending ? "Uploading..." : "Upload"}
            <input
              id="file-upload"
              type="file"
              onChange={handleUpload}
              hidden
            />
          </Button>
        </Grid>

        {resumeData && <EditablePreview resumeData={resumeData} />}
      </Grid>
    </Box>
  );
};

export default Page;
