import React, { useEffect, useState } from "react";
import { type JobDetail } from "@/app/apply/JobDetail";
import { Resume } from "../resume/Resume";
import {
  Box,
  Button,
  Container,
  Grid,
  Skeleton,
  TextField,
} from "@mui/material";
import {
  ResumeEvalResult,
  SuggestedImprovement,
} from "../resume/ResumeEvalResult";
import { assessResumeFit } from "@/service/api";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

interface Step3Props {
  jobDetail: JobDetail;
  selectedResume: Resume;
  setUpdatedResume: React.Dispatch<React.SetStateAction<Resume | null>>;
  onNext: () => void;
}

const Step3: React.FC<Step3Props> = ({
  jobDetail,
  selectedResume,
  setUpdatedResume,
  onNext,
}) => {
  const [resumeEvalResult, setResumeEvalResult] = useState<ResumeEvalResult>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const assessReusme = async () => {
      try {
        const resumeId = selectedResume.id;
        const responseDTO = await assessResumeFit({ jobDetail, resumeId });
        setUpdatedResume(responseDTO.resume);
        setLoading(false);
        setResumeEvalResult(responseDTO.resumeEvalResult);
      } catch (error) {
        console.error("Error fetching resumes:", error);
      }
    };
    assessReusme();
  }, []);

  const showAdditionalSuggestions = (
    suggestedImpv?: SuggestedImprovement[]
  ) => {
    if (!suggestedImpv || suggestedImpv.length === 0 || suggestedImpv === null)
      return "";

    return suggestedImpv.map((e) => `• ${e.suggestedText}`).join("\n");
  };

  const handelNextStep = () => {
    onNext();
  };

  return (
    <Container>
      {loading ? (
        <>
          <Box sx={{ display: "flex", gap: 2, marginTop: 10 }}>
            <Skeleton variant="rectangular" width="100%" height={50}></Skeleton>
            <Skeleton variant="rectangular" width="100%" height={50}></Skeleton>
          </Box>

          <Skeleton
            variant="rectangular"
            width="100%"
            height={100}
            sx={{ marginTop: 5 }}
          ></Skeleton>

          <Skeleton
            variant="rectangular"
            width="100%"
            height={200}
            sx={{ marginTop: 5 }}
          ></Skeleton>
        </>
      ) : (
        <Grid container spacing={2}>
          {/* ATS Score */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="ATS Score"
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              fullWidth
              value={resumeEvalResult?.ats_score}
            />
          </Grid>

          {/* Domain Relevance */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Domain Relevance"
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              fullWidth
              value={resumeEvalResult?.domainRelevance}
            />
          </Grid>

          {/* Feedback */}
          <Grid item xs={12}>
            <TextField
              label="Feedback"
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              fullWidth
              multiline
              rows={3}
              value={resumeEvalResult?.feedback}
            />
          </Grid>
          {resumeEvalResult?.suggestedImprovements &&
            resumeEvalResult.suggestedImprovements.length > 0 && (
              <Grid item xs={12}>
                <TextField
                  label="Suggestions"
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  multiline
                  rows={10}
                  value={showAdditionalSuggestions(
                    resumeEvalResult?.suggestedImprovements
                  )}
                />
              </Grid>
            )}
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<NavigateNextIcon />}
              onClick={handelNextStep}
            ></Button>
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default Step3;
