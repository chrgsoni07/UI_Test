import { Skeleton, Stack } from "@mui/material";
import React from "react";

const ResumeSkeleton: React.FC = () => {
  return (
    <Stack spacing={1}>
      <Skeleton variant="rectangular" height={40} />
      <Skeleton variant="rounded" height={40} />
      <Skeleton variant="rectangular" height={40} />
      <Skeleton variant="rounded" height={40} />
      <Skeleton variant="rectangular" height={40} />
      <Skeleton variant="rounded" height={40} />
      <Skeleton variant="rectangular" height={40} />
      <Skeleton variant="rounded" height={40} />
      <Skeleton variant="rectangular" height={40} />
      <Skeleton variant="rounded" height={40} />
    </Stack>
  );
};

export default ResumeSkeleton;
