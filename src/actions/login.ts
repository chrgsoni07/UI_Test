"use server";

import { signIn } from "@/auth";

import { AuthError } from "next-auth";
import { redirect } from "next/navigation";

export const login = async (formData: FormData) => {
  const formValues = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  // TODO perform server side validation
  //   const validatedFields = LoginSchema.safeParse(formValues);

  try {
    await signIn("credentials", {
      ...formValues,
      redirectTo: "/",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      console.log(" ------------------------ ");
      console.log("ERROR in ACTION ");
      console.error(error.cause?.err?.name);

      console.error(error.cause?.err?.message); //Request failed with status code 401

      console.error(error.name);

      console.error(error.message);

      console.log(" ------------------------ ");

      return redirect(`/signin?error=${error.type}`);
    }
    throw error;
  }
};
