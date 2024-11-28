import React, { useEffect, useState } from "react";
import { JobDetail } from "./JobDetail";
import { Resume } from "../resume/Resume";
import { Container, Grid, TextField, Typography } from "@mui/material";
import {
  ResumeEvalResult,
  SuggestedImprovement,
} from "../resume/ResumeEvalResult";
import { assessResumeFit } from "@/service/api";

interface Step3Props {
  jobDetail: JobDetail;
  selectedResume: Resume;
  setUpdatedResume: React.Dispatch<React.SetStateAction<any>>;
}

const Step3: React.FC<Step3Props> = ({
  jobDetail,
  selectedResume,
  setUpdatedResume,
}) => {
  const [resumeEvalResult, setResumeEvalResult] = useState<ResumeEvalResult>();

  useEffect(() => {
    const assessReusme = async () => {
      try {
        const resumeId = selectedResume.id;
        const responseDTO = await assessResumeFit({ jobDetail, resumeId });
        setUpdatedResume(responseDTO.resume);
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

  return (
    <Container>
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
                rows={3}
                value={showAdditionalSuggestions(
                  resumeEvalResult?.suggestedImprovements
                )}
              />
            </Grid>
          )}
      </Grid>
    </Container>
  );
};

export default Step3;
