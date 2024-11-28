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
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Resume } from "../resume/Resume";
import { JobDetail } from "./JobDetail";
import { getAllResumeOfUser } from "@/service/api";

interface Step2Props {
  jobDetail: JobDetail;
  setSelectedResume: React.Dispatch<React.SetStateAction<any>>;
}

const Step2: React.FC<Step2Props> = ({ jobDetail, setSelectedResume }) => {
  const [allResume, setAllResume] = useState<Resume[]>([]);

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

  const handleSelect = async (row: Resume) => {
    setSelectedResume(row);
  };

  return (
    <Container>
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
    </Container>
  );
};

export default Step2;
