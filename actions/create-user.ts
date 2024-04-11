"use server";
import * as z from "zod";
import { API_BASE_URL } from "@/lib/constants";
import { CreateUserSchema } from "@/schemas";
import { currentUser, updateSession } from "@/lib/auth";
import { CreateUserResponse } from "@/lib/definitions";

export const createUser = async (values: z.infer<typeof CreateUserSchema>) => {
  const user = await currentUser();
  const validatedFields = CreateUserSchema.safeParse(values);

  if (!validatedFields.success) {
    throw new Error(validatedFields.error.errors[0].message);
  }

  try {
    const response = await fetch(`${API_BASE_URL}/v1/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.accessToken}`,
      },
      body: JSON.stringify({
        phone_number: user?.phone,
        name: values.fullName,
      }),
    });

    const data: CreateUserResponse = await response.json();

    if (!data.success) {
      return {
        error: data.error,
      };
    }
    // If the user is created, we need to update the session with the new tokens received
    if (data.data) {
      await updateSession({
        accessToken: data.data.access_token,
        refreshToken: data.data.refresh_token,
      });
      return {
        success: true,
      };
    }

    return {
      success: true,
    };
  } catch (error) {
    console.error(error);
    return {
      error: "An error occurred",
    };
  }
};
