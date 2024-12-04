import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Container,
  Box,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Resume } from "../resume/Resume";
import { getAllResumeOfUser } from "@/service/api";
import moment from "moment";

interface Step2Props {
  setSelectedResume: React.Dispatch<React.SetStateAction<any>>;
  onNext: () => void;
}

const Step2: React.FC<Step2Props> = ({ setSelectedResume, onNext }) => {
  const [allResume, setAllResume] = useState<Resume[]>([]);

  const [selectedRow, setSelectedRow] = useState<Resume | null>(null);

  useEffect(() => {
    const fetchResumeData = async () => {
      try {
        const resumeOfUser = await getAllResumeOfUser();
        setAllResume(resumeOfUser);
      } catch (error) {
        console.error("Error fetching resumes:", error);
      }
    };
    fetchResumeData();
  }, []);

  const handleSelect = (resume: Resume) => {
    if (selectedRow && selectedRow.id === resume.id) {
      setSelectedRow(null); // Deselect the row if it's already selected
    } else {
      setSelectedRow(resume); // Select the row
    }
  };

  const handleSelectOld = () => {
    setSelectedResume(selectedRow);
    onNext();
  };

  return (
    <Container>
      <Box sx={{ width: "100%" }}>
        <Typography variant="body2" paragraph>
          Below is the list of resumes with job titles and creation dates. You
          can select a resume and click the Submit button.
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Job Title</TableCell>
                <TableCell>Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allResume.map((resume: Resume) => (
                <TableRow
                  key={resume.id}
                  onClick={() => handleSelect(resume)} // Make row clickable
                  selected={selectedRow?.id === resume.id} // Highlight the selected row
                  sx={{
                    backgroundColor:
                      selectedRow?.id === resume.id ? "#d3d3d3" : "transparent", // Conditional row styling
                    cursor: "pointer", // Make the cursor pointer to indicate clickability
                  }}
                >
                  <TableCell>{resume.id}</TableCell>
                  <TableCell>{resume.jobTitle}</TableCell>
                  <TableCell>
                    {moment(resume.metadata.createdAt).format(
                      "DD-MMM-YYYY HH:mm:ss"
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box sx={{ marginTop: 2 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSelectOld}
            disabled={!selectedRow} // Disable button if no row is selected
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Step2;
