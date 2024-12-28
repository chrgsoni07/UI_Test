import { Skeleton, Stack } from "@mui/material";
import React, { JSX } from "react";

const ResumeSkeleton = (): JSX.Element => {
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
