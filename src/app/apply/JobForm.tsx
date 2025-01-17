import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";

import { type JobDetail } from "./JobDetail";
import { getJobDetailsFromUrl } from "@/service/api";
import UpdatedResume from "./updatedResume";

const JobForm = () => {
  const [jobDetail, setJobDetail] = useState<JobDetail>({
    id: "",
    resumeId: "",
    jobTitle: "",
    jobDescription: "",
    companyName: "",
    location: "",
    jobUrl: "",
  });

  const [errors, setErrors] = useState({
    jobTitle: "",
    jobDescription: "",
    companyName: "",
    location: "",
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
      companyName: "",
      location: "",
    };

    if (!jobDetail.companyName.trim()) {
      newErrors.companyName = "Company name is required";
      hasErrors = true;
    }
    if (!jobDetail.location.trim()) {
      newErrors.location = "Location is required";
      hasErrors = true;
    }

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
    <Container maxWidth="lg">
      {!formSubmitted ? (
        <>
          <Box sx={{ mt: 4, mb: 4 }}>
            <Typography variant="h4" gutterBottom align="center">
              Job Application Details
            </Typography>
            <Typography
              variant="body1"
              color="textSecondary"
              paragraph
              align="center"
            >
              Please fill in the details below to help us tailor your resume
              according to the job title, description, company, and location.
            </Typography>
          </Box>
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
          <Grid container spacing={1}>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Company Name"
                variant="outlined"
                fullWidth
                margin="normal"
                value={jobDetail.companyName}
                onChange={(e) =>
                  setJobDetail({ ...jobDetail, companyName: e.target.value })
                }
                error={!!errors.companyName}
                helperText={errors.companyName}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Location"
                variant="outlined"
                fullWidth
                margin="normal"
                value={jobDetail.location}
                onChange={(e) =>
                  setJobDetail({ ...jobDetail, location: e.target.value })
                }
                error={!!errors.location}
                helperText={errors.location}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
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
            </Grid>
            <Grid item xs={12}>
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
            </Grid>
          </Grid>
          <Box sx={{ mt: 2, textAlign: "center" }}>
            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
          </Box>
        </form>
      ) : (
        // Once form is submitted, show UpdatedResume component
        <UpdatedResume passedData={jobDetail} />
      )}
    </Container>
  );
};

export default JobForm;
