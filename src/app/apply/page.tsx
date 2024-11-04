"use client";

import { type FC } from "react";
import Stack from "@mui/material/Stack";
import { Toaster } from "react-hot-toast";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import JobForm from "./JobForm";
import UpdatedResume from "./updatedResume";
import TemplateSelectionPage from "../template/TemplateSelectionPage";

const Page: FC = () => {
  return (
    <Stack spacing={3}>
      <Toaster />
      <Router>
        <Routes>
          <Route path="/dashboard/apply" element={<JobForm />} />
          <Route
            path="/dashboard/apply/update-resume"
            element={<UpdatedResume />}
          />
          <Route
            path="/dashboard/template"
            element={<TemplateSelectionPage />}
          />
        </Routes>
      </Router>
    </Stack>
  );
};

export default Page;
