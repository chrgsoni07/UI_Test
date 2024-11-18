"use client";

// import { auth } from "@/auth";
import { Button } from "@mui/material";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import React from "react";

const SignInButton = () => {
  const session = useSession();

  console.log({ session });

  if (session.status === "authenticated") {
    return null;
  }
  return (
    <Button
      key="signin"
      onClick={() => redirect("/signin")}
      sx={{ my: 2, color: "white" }}
    >
      Sign In
    </Button>
  );
};

export default SignInButton;
