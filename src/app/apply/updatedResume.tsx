import React, { useEffect, useState, type FC, type FormEvent } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
  assessResumeFit,
  getAllResumeOfUser,
  saveJobSpecificResume,
  saveResume,
} from "@/service/api";
import { type Resume } from "../resume/Resume";
import EditablePreview from "../resume/EditablePreview";
import {
  ResumeEvalResult,
  SuggestedImprovement,
} from "../resume/ResumeEvalResult";
import { JobDetail } from "./JobDetail";

type PropTypes = {
  passedData: JobDetail;
};

const UpdatedResume: FC<PropTypes> = ({ passedData: jobDetailProps }) => {
  const [updatedResume, setUpdatedResume] = useState<Resume>();
  const [resumeEvalResult, setResumeEvalResult] = useState<ResumeEvalResult>();
  const [openAccordion, setOpenAccordion] = useState(0);
  const [jobDetail, setJobDetail] = useState<JobDetail>(jobDetailProps);
  const [allResume, setAllResume] = useState<Resume[]>([]);

  useEffect(() => {
    const fetchResumes = async () => {
      if (jobDetail && jobDetail.jobTitle && jobDetail.jobDescription) {
        try {
          const resumes = await getAllResumeOfUser(); // Fetch resumes
          setAllResume(resumes); // Set the fetched resumes in state
        } catch (error) {
          console.error("Error fetching resumes:", error);
        }
      }
    };

    fetchResumes(); // Call the async function
  }, [jobDetail]); // Dependency array, this will trigger when jobDetail changes

  const { data: savedResume, mutate: postSave } = useMutation({
    mutationFn: (rData: Resume): Promise<Resume> => {
      return saveJobSpecificResume(rData);
    },
    onSuccess(data) {
      toast.success("updated resume saved successfully !");
      if (data.id) {
        //navigate to the template page
      } else {
        console.error("Saved resume ID is undefined");
      }
    },
    onError(error) {
      toast.error(error.message);
    },
  });

  const handleAccordionChange = (accordionIndex: number) => {
    setOpenAccordion(openAccordion === accordionIndex ? -1 : accordionIndex);
  };

  const openSecondAccordion = () => {
    setOpenAccordion(1);
    setOpenAccordion(2);
  };

  const handleSelect = async (row: Resume) => {
    const jobDetail = {
      jobUrl: "",
      jobTitle: "JAva developer",
      jobDescription: "complete job description comming through form",
    };

    toast.success("Resume got selected please wait");

    const responseDTO = await assessResumeFit({ jobDetail, resumeId: row.id });

    setUpdatedResume(responseDTO.resume);

    setResumeEvalResult(responseDTO.resumeEvalResult);

    openSecondAccordion();
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!updatedResume) return;

    postSave(updatedResume);
  };

  const showAdditionalSuggestions = (
    suggestedImpv?: SuggestedImprovement[]
  ) => {
    if (!suggestedImpv || suggestedImpv.length === 0 || suggestedImpv === null)
      return "";

    return suggestedImpv.map((e) => `• ${e.suggestedText}`).join("\n");
  };

  const accordionStyle = {
    bgcolor: "rgba(0, 0, 0, 0.1)",
    boxShadow: 3,
    marginBottom: 2,
  };

  return (
    <>
      <Accordion
        expanded={openAccordion === 0}
        onChange={() => handleAccordionChange(0)}
        sx={accordionStyle}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography>Select a Resume</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Job Title</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {allResume.map((resume: Resume) => (
                  <TableRow key={resume.id}>
                    <TableCell>{resume.id}</TableCell>
                    <TableCell>{resume.jobTitle}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleSelect(resume)}
                      >
                        Select
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={openAccordion === 2}
        onChange={() => handleAccordionChange(2)}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
          sx={accordionStyle}
        >
          <Typography>Resume evaluation result</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                label="ATS Score"
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                fullWidth
                value={resumeEvalResult?.ats_score}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                label="Domain Relevance"
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                fullWidth
                value={resumeEvalResult?.domainRelevance}
              />
            </Grid>

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
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={openAccordion === 1}
        onChange={() => handleAccordionChange(1)}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
          sx={accordionStyle}
        >
          <Typography>Details</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <form onSubmit={handleSubmit}>
            {updatedResume && (
              <EditablePreview resumeData={updatedResume} buttonType="save" />
            )}
            {/* <Button type="submit" variant="contained" color="primary">
              Save
            </Button> */}
          </form>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default UpdatedResume;
