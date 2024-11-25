"use server";

import { UserSignUp } from "@/app/auth/model/UserSignUp";
import { signIn } from "@/auth";
import { signUp } from "@/service/api";

import { AuthError } from "next-auth";

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
    await signIn("credentials", {
      ...loginFormData,
      redirectTo: "/",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      console.log("Auth error");
      //   return redirect(`${SIGNIN_ERROR_URL}?error=${error.type}`)
    }
    throw error;
  }
};
