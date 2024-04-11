"use server";
import * as z from "zod";
import { signIn } from "@/auth";
import { LoginSchema } from "@/schemas";
import { AuthError } from "next-auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export const login = async (
  values: z.infer<typeof LoginSchema>,
  callbackUrl?: string | null
) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!values.code) {
    return {
      error: "Please enter the code",
    };
  }

  if (!validatedFields.success) {
    return {
      error: "Invalid phone number",
    };
  }

  try {
    await signIn("credentials", {
      phone: values.phone,
      code: values.code,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
    return { success: true };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "We were'nt able to check the code" };
        default:
          return { error: "Something went wrong!" };
      }
    }

    throw error;
  }
};
