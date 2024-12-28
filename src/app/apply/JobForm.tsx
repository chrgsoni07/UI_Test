import React, { useState } from "react";
import {
  Button,
  Chip,
  Container,
  Divider,
  TextField,
  Typography,
} from "@mui/material";

import { type JobDetail } from "./JobDetail";
import { getJobDetailsFromUrl } from "@/service/api";
import UpdatedResume from "./updatedResume";

const JobForm = () => {
  const [jobDetail, setJobDetail] = useState<JobDetail>({
    jobDescription: "",
    jobTitle: "",
    jobUrl: "",
  });

  const [errors, setErrors] = useState({
    jobTitle: "",
    jobDescription: "",
  });

  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleFetch = async () => {
    const jobDetailResponse = await getJobDetailsFromUrl(jobDetail.jobUrl);

    console.log("job details comming from backend  ", jobDetailResponse);

    setJobDetail({
      ...jobDetail,
      jobTitle: jobDetailResponse?.jobTitle,
      jobDescription: jobDetailResponse?.jobDescription,
    });
  };

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
    setFormSubmitted(true);
  };

  return (
    <Container>
      {!formSubmitted ? (
        <>
          <Typography variant="h4" gutterBottom>
            Job Application Details
          </Typography>
          <Typography variant="body1" color="textSecondary" paragraph>
            Please copy and paste the job title and job description here. This
            will help us tailor your resume to match the job requirements.
          </Typography>
        </>
      ) : (
        <>
          <Typography variant="h5" gutterBottom>
            Thank you for submitting the job details!
          </Typography>
          <Typography variant="body1" color="textSecondary" paragraph>
            Please select your existing resume to proceed with the update.
          </Typography>
        </>
      )}
      {/* Render the form if it's not submitted */}
      {!formSubmitted ? (
        <form onSubmit={handleSubmit}>
          {/* <TextField
            label="Job Link"
            variant="outlined"
            fullWidth
            margin="normal"
            value={jobDetail.jobUrl}
            onChange={(e) =>
              setJobDetail((prevJobDetail) => ({
                ...prevJobDetail,
                jobUrl: e.target.value,
              }))
            }
          />
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleFetch()}
          >
            Fetch Job Details
          </Button>

          <Divider>
            <Chip label="or" size="medium" />
          </Divider> */}

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

          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
        </form>
      ) : (
        // Once form is submitted, show UpdatedResume component
        <UpdatedResume passedData={jobDetail} />
      )}
    </Container>
  );
};

export default JobForm;
