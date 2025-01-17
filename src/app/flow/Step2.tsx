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
  Skeleton,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Resume } from "../resume/Resume";
import { getAllResumeOfUser, isUserUploadLimitReached } from "@/service/api";
import moment from "moment";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import toast from "react-hot-toast";

interface Step2Props {
  setSelectedResume: React.Dispatch<React.SetStateAction<any>>;
  onNext: () => void;
}

const Step2: React.FC<Step2Props> = ({ setSelectedResume, onNext }) => {
  const [allResume, setAllResume] = useState<Resume[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRow, setSelectedRow] = useState<Resume | null>(null);

  useEffect(() => {
    const fetchResumeData = async () => {
      try {
        const resumeOfUser = await getAllResumeOfUser();
        setLoading(false);
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

  const handleSelectOld = async () => {
    const isLimitReached = await isUserUploadLimitReached();

    if (isLimitReached) {
      toast.error("max limit reached");
      return;
    }

    setSelectedResume(selectedRow);
    onNext();
  };

  return (
    <Container>
      {loading ? (
        <>
          {[...Array(5)].map((_, index) => (
            <TableRow key={index}>
              <TableCell>
                <Skeleton variant="text" width={200} height={20} />
              </TableCell>
              <TableCell>
                <Skeleton variant="text" width={200} height={20} />
              </TableCell>
              <TableCell>
                <Skeleton variant="text" width={200} height={20} />
              </TableCell>
            </TableRow>
          ))}
        </>
      ) : (
        <Box sx={{ width: "100%" }}>
          <Typography variant="body2">
            Below is the list of resumes. You can select a resume and click the
            Submit button.
          </Typography>
          <TableContainer
            component={Paper}
            sx={{
              maxHeight: allResume.length > 10 ? 400 : "auto", // Make table scrollable if more than 10 rows
              overflowY: allResume.length > 10 ? "auto" : "unset", // Enable vertical scrolling if more than 10 rows
            }}
          >
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
                    onClick={() => handleSelect(resume)} // Select row on click
                    selected={selectedRow?.id === resume.id} // Highlight the selected row
                    sx={{
                      backgroundColor:
                        selectedRow?.id === resume.id
                          ? "#d3d3d3"
                          : "transparent", // Conditional styling for selected row
                      cursor: "pointer", // Make the row clickable
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
              startIcon={<NavigateNextIcon />}
            ></Button>
          </Box>
        </Box>
      )}
    </Container>
  );
};

export default Step2;
