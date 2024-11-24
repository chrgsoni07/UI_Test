"use client";

import { type FC } from "react";
import { Toaster } from "react-hot-toast";
import JobForm from "./JobForm";

const Page: FC = () => {
  return (
    <>
      <Toaster></Toaster>
      <JobForm />
    </>
  );
};

export default Page;
