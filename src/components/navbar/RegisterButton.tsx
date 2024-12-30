import { Button } from "@mui/material";
import Link from "next/link";
import React from "react";

const RegisterButton = () => {
  return (
    <Link href={"/register"}>
      <Button key="register" sx={{ my: 2, color: "white" }}>
        Register
      </Button>
    </Link>
  );
};

export default RegisterButton;
