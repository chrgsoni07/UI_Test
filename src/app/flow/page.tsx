"use client";

import { type FC } from "react";
import { Toaster } from "react-hot-toast";
import ApplyFlow from "../flow/ApplySteps";

const Page: FC = () => {
  return (
    <>
      <Toaster />
      <ApplyFlow />
    </>
  );
};

export default Page;
