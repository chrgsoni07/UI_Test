"use server";

import { UserSignUp } from "@/app/auth/model/UserSignUp";
import { signUp } from "@/service/api";
import axios from "axios";

import { AuthError } from "next-auth";
import { redirect } from "next/navigation";

export const register = async (formData: FormData) => {
  const formValues = {
    email: formData.get("email"),
    password: formData.get("password"),
    firstName: formData.get("firstname"),
    lastName: formData.get("lastname"),
    repeatPassword: formData.get("password"),
  };

  try {
    // Add validations
    await signUp(formValues as UserSignUp);
    redirect("/signin");
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("error on other => ", error.response?.data?.errorMessage);
      return {
        error: { ...error.response?.data },
        data: { ...formValues },
      };
    }
    throw error;
  }
};
