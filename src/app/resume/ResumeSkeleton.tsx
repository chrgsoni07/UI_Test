import { Skeleton, Stack } from "@mui/material";
import React from "react";

const ResumeSkeleton = (): JSX.Element => {
  return (
    <Stack spacing={1}>
      <Skeleton variant="rectangular" height={60} />
      <Skeleton variant="rounded" height={60} />
      <Skeleton variant="rectangular" height={60} />
      <Skeleton variant="rounded" height={60} />
      <Skeleton variant="rectangular" height={60} />
      <Skeleton variant="rounded" height={60} />
      <Skeleton variant="rectangular" height={60} />
      <Skeleton variant="rounded" height={60} />
      <Skeleton variant="rectangular" height={60} />
      <Skeleton variant="rounded" height={60} />
    </Stack>
  );
};

export default ResumeSkeleton;
