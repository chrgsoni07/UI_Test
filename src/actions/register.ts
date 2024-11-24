"use server";

import { signIn } from "@/auth";

import { AuthError } from "next-auth";

export const register = async (formData: FormData) => {
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
    // console.log("idhar aa gaya");
    // redirect("/apply");
  } catch (error) {
    if (error instanceof AuthError) {
      console.log("Auth error");
      //   return redirect(`${SIGNIN_ERROR_URL}?error=${error.type}`)
    }
    throw error;
  }
};
