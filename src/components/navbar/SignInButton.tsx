"use client";

// import { auth } from "@/auth";
import { Button } from "@mui/material";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";

const SignInButton = () => {
  const session = useSession();

  const router = useRouter();

  if (session.status === "authenticated") {
    return null;
  }
  return (
    <Button
      key="signin"
      onClick={() => router.push("/signin")}
      sx={{ my: 2, color: "white" }}
    >
      Sign In
    </Button>
  );
};

export default SignInButton;
