import React, { useState } from "react";
import { Button, Container, TextField } from "@mui/material";
import { JobDetail } from "./JobDetail";

interface Step1Props {
  jobDetail: JobDetail;
  setJobDetail: React.Dispatch<React.SetStateAction<any>>;
  onNext: () => void;
}

const Step1: React.FC<Step1Props> = ({ jobDetail, setJobDetail }) => {
  const [errors, setErrors] = useState({
    jobTitle: "",
    jobDescription: "",
  });

  // const [formSubmitted, setFormSubmitted] = useState(false);

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
    //  setFormSubmitted(true);
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
      </form>
    </Container>
  );
};

export default Step1;
