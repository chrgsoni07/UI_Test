"use server";

import { signIn } from "@/auth";

import { AuthError } from "next-auth";

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
      return {
        error: { ...error.cause },
        data: { ...formValues },
      };
      //    return redirect(`/signin?error=${error.type}`);
    }
    throw error;
  }
};
