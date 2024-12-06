import React, { useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Step1 from "./Step1";
import Step2 from "./Step2";
import { type Resume } from "../resume/Resume";
import Step3 from "./Step3";
import EditablePreview from "../resume/EditablePreview";
import Step5 from "./Step5";
import { Container } from "@mui/material";

const steps = [
  "Job details",
  "Select Resume",
  "Evaluation Result",
  "Updated Resume",
  "Save Template",
];

const ApplyFlow = () => {
  const [activeStep, setActiveStep] = useState(0);

  const [jobDetail, setJobDetail] = useState({
    jobTitle: "",
    jobDescription: "",
    jobUrl: "",
  });
  const [selectedResume, setSelectedResume] = useState<Resume | null>(null);
  const [updatedResume, setUpdatedResume] = useState<Resume>();

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1);
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };

  // Function to render content for each step
  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Step1
            jobDetail={jobDetail}
            setJobDetail={setJobDetail}
            onNext={handleNext}
          />
        );
      case 1:
        if (!jobDetail) return <div>Please provide job detail</div>;
        return (
          <Step2 setSelectedResume={setSelectedResume} onNext={handleNext} />
        );

      case 2:
        if (!selectedResume) return <div>Please select a resume</div>;
        return (
          <Step3
            jobDetail={jobDetail}
            selectedResume={selectedResume}
            setUpdatedResume={setUpdatedResume}
            onNext={handleNext}
          />
        );

      case 3:
        if (!updatedResume)
          return <div>Updated resume is not available please try later ..</div>;

        return (
          <Container>
            <EditablePreview
              resumeData={updatedResume}
              buttonType="next"
              onNext={handleNext}
              setUpdatedResume={setUpdatedResume}
            />
          </Container>
        );
      case 4:
        if (!updatedResume) return <div>Please selected any resume</div>;

        return <Step5 selectedResume={updatedResume} />;
      default:
        return <div>Unknown Step</div>;
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {/* Step Content */}
      <Box sx={{ marginTop: "20px" }}>{renderStepContent(activeStep)}</Box>

      {/* Navigation buttons */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleBack}
          disabled={activeStep === 0}
        >
          Back
        </Button>
        {/* <Button onClick={handleNext} disabled={activeStep === steps.length - 1}>
          {activeStep === steps.length - 1 ? "Finish" : "Next"}
        </Button> */}
      </Box>
    </Box>
  );
};

export default ApplyFlow;
