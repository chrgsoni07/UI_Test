import React from "react";
import { Skeleton } from "@mui/material";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";

const SavedResumeSkeleton = (): JSX.Element => {
  return (
    <TableContainer component={Paper} sx={{ mt: 4 }}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell>
              <Skeleton variant="text" width={50} />
            </TableCell>
            <TableCell>
              <Skeleton variant="text" width={100} />
            </TableCell>
            <TableCell>
              <Skeleton variant="text" width={150} />
            </TableCell>
            <TableCell>
              <Skeleton variant="text" width={100} />
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.from(new Array(5)).map((_, index) => (
            <TableRow key={index}>
              <TableCell>
                <Skeleton variant="text" width={50} />
              </TableCell>
              <TableCell>
                <Skeleton variant="text" width={100} />
              </TableCell>
              <TableCell>
                <Skeleton variant="text" width={150} />
              </TableCell>
              <TableCell>
                <Skeleton variant="text" width={100} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SavedResumeSkeleton;
