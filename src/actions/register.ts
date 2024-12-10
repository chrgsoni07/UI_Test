"use server";

import { UserSignUp } from "@/app/auth/model/UserSignUp";
import { signIn } from "@/auth";
import { signUp } from "@/service/api";
import axios, { AxiosError } from "axios";

import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";

export const register = async (formData: FormData) => {
  const formValues = {
    email: formData.get("email"),
    password: formData.get("password"),
    firstName: formData.get("firstname"),
    lastName: formData.get("lastname"),
    repeatPassword: formData.get("password"),
  };

  // TODO perform server side validation
  //   const validatedFields = LoginSchema.safeParse(formValues);

  const loginFormData = {
    email: formData.get("email"),
    password: formData.get("password"),
  };
  try {
    // Add validations
    await signUp(formValues as UserSignUp);
    //   await signIn("credentials", {
    //     ...loginFormData,
    //     redirectTo: "/",
    //   });
    redirect("/signin");
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("error on other => ", error.response?.data?.errorMessage);
      //toast.error(error.response?.data?.errorMessage);
    } else {
      // toast.error(error.message);
    }
    throw error;
  }
};
