"use client";

import { useEffect, useState, type FC } from "react";
import { Toaster } from "react-hot-toast";

const Page: FC = () => {
  const [data, setData] = useState<{
    jobForm?: string;
    jobDescription?: string;
  }>({
    jobForm: "",
    jobDescription: "",
  });

  useEffect(() => {
    const jobForm = sessionStorage.getItem("jobTitle");
    const jobDescription = sessionStorage.getItem("jobDescription");
    if (jobForm && jobDescription) {
      setData({ jobForm, jobDescription });
    }
  }, []);

  return (
    <div>
      <h2>Job Form Data</h2>
      <p>Job Form: {data.jobForm}</p>
      <p>Job Description: {data.jobDescription}</p>
    </div>
  );
};

export default Page;
