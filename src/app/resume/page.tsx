"use client";

import { useState, type ChangeEvent, type FC, type FormEvent } from "react";
import { Box, Button, CircularProgress, Grid, TextField } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { extractDataFromFile, saveResume } from "@/service/api";
import EditablePreview from "./EditablePreview";
import { type Resume } from "./Resume";
import toast from "react-hot-toast";

const Page: FC = () => {
  const [selectedFile, setSelectedFile] = useState<File>();
  const [resumeData, setResumeData] = useState<Resume>();

  const {
    data: responseData,
    mutate: postCall,
    error: postError,
    isPending,
  } = useMutation({
    mutationFn: (rData: FormData): Promise<Resume> => {
      return extractDataFromFile(rData);
    },
    onSuccess(data) {
      //   toast.success('Resume uploaded successfully');
      setResumeData(data);
    },
  });

  const { data: savedResume, mutate: postSave } = useMutation({
    mutationFn: (rData: Resume): Promise<Resume> => {
      return saveResume(rData, "JWT_TOKEN");
    },
    onSuccess(data) {
      toast.success("Resume saved successfully !");
      if (data.id) {
        //navigate to /template page
        // navigate("/dashboard/template", { state: { id: data.id } });
      } else {
        console.error("Saved resume ID is undefined");
      }
    },
    onError(error) {
      toast.error(error.message);
    },
  });

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUpload = async (): Promise<void> => {
    if (!selectedFile) return;

    const formData = new FormData();

    formData.append("file", selectedFile);

    postCall(formData);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!resumeData) return;

    postSave(resumeData);
  };

  return (
    <Box position="relative" display="flex">
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
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} container alignItems="center">
            <input
              id="file-upload"
              type="file"
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
            <label htmlFor="file-upload">
              <TextField
                variant="outlined"
                fullWidth
                InputProps={{
                  readOnly: true,
                  startAdornment: (
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Button
                        variant="contained"
                        component="span"
                        color="primary"
                      >
                        Browse
                      </Button>
                    </Box>
                  ),
                }}
                value={selectedFile ? selectedFile.name : ""}
                placeholder="No file selected"
                sx={{ marginRight: 2 }}
              />
            </label>

            <Button
              variant="contained"
              color="secondary"
              onClick={handleUpload}
              disabled={!selectedFile || isPending}
              startIcon={
                isPending ? (
                  <CircularProgress size={24} color="inherit" />
                ) : null
              }
              sx={{ textTransform: "none" }}
            >
              {isPending ? "Uploading..." : "Upload"}
            </Button>
          </Grid>

          {resumeData && (
            <EditablePreview
              resumeData={resumeData}
              setResumeData={setResumeData}
            />
          )}

          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={!resumeData}
            >
              Save
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default Page;
