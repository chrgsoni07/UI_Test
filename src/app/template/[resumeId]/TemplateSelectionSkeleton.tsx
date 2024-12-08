import { Box, Skeleton } from "@mui/material";
import React from "react";

const TemplateSelectionSkeleton = (): JSX.Element => {
  return (
    <>
      <Box sx={{ display: "flex", gap: 2, marginTop: 10 }}>
        <Skeleton variant="rectangular" width="100%" height={200}></Skeleton>
        <Skeleton variant="rectangular" width="100%" height={200}></Skeleton>
        <Skeleton variant="rectangular" width="100%" height={200}></Skeleton>
      </Box>
      <Skeleton
        variant="rectangular"
        width="100%"
        height={400}
        sx={{ marginTop: 5 }}
      ></Skeleton>
    </>
  );
};

export default TemplateSelectionSkeleton;
