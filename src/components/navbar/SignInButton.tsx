import { Button } from "@mui/material";
import Link from "next/link";
import React from "react";

const SignInButton = () => {
  return (
    <Link href={"/signin"}>
      <Button key="signin" sx={{ my: 2, color: "white" }}>
        Sign In
      </Button>
    </Link>
  );
};

export default SignInButton;
