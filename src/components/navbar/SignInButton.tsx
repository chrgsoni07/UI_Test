"use client";

// import { auth } from "@/auth";
import { Button } from "@mui/material";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

const SignInButton = () => {
  const session = useSession();

  if (session.status === "authenticated") {
    return null;
  }
  return (
    <Link href={"/signin"}>
      <Button key="signin" sx={{ my: 2, color: "white" }}>
        Sign In
      </Button>
    </Link>
  );
};

export default SignInButton;
