import React, { useState } from "react";
import { Button, Container, IconButton, TextField } from "@mui/material";
import { JobDetail } from "./JobDetail";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

interface Step1Props {
  jobDetail: JobDetail;
  setJobDetail: React.Dispatch<React.SetStateAction<any>>;
  onNext: () => void;
}

const Step1: React.FC<Step1Props> = ({ jobDetail, setJobDetail, onNext }) => {
  const [errors, setErrors] = useState({
    jobTitle: "",
    jobDescription: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let hasErrors = false;
    const newErrors = {
      jobTitle: "",
      jobDescription: "",
    };

    if (!jobDetail.jobTitle.trim()) {
      newErrors.jobTitle = "Job Title is required";
      hasErrors = true;
    }

    if (!jobDetail.jobDescription.trim()) {
      newErrors.jobDescription = "Job Description is required";
      hasErrors = true;
    }

    setErrors(newErrors);
    if (hasErrors) return;

    setJobDetail(jobDetail);

    onNext();
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Job Title"
          variant="outlined"
          fullWidth
          margin="normal"
          value={jobDetail.jobTitle}
          onChange={(e) =>
            setJobDetail({ ...jobDetail, jobTitle: e.target.value })
          }
          error={!!errors.jobTitle}
          helperText={errors.jobTitle}
        />
        <TextField
          label="Job Description"
          variant="outlined"
          fullWidth
          margin="normal"
          multiline
          rows={10}
          value={jobDetail.jobDescription}
          onChange={(e) =>
            setJobDetail({ ...jobDetail, jobDescription: e.target.value })
          }
          error={!!errors.jobDescription}
          helperText={errors.jobDescription}
        />

        {/* <IconButton aria-label="nextNavigation">
          <NavigateNextIcon
            onClick={() => handleSubmit}
            color="info"
          ></NavigateNextIcon>
        </IconButton> */}

        <Button
          variant="contained"
          color="primary"
          type="submit"
          startIcon={<NavigateNextIcon />}
        ></Button>
      </form>
    </Container>
  );
};

export default Step1;
