"use server";
import * as z from "zod";
import { API_BASE_URL } from "@/lib/constants";
import { LoginSchema } from "@/schemas";
import { sendOTPResponse } from "@/lib/definitions";

export const sendOTP = async (
  values: z.infer<typeof LoginSchema>
): Promise<sendOTPResponse> => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      success: false,
      error: "Invalid phone number",
    };
  }

  try {
    const response = await fetch(`${API_BASE_URL}/v1/auth/phone-number`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ phone_number: values.phone }),
    });
    const data = await response.json();

    if (data.error) {
      return {
        success: false,
        error: data.error,
      };
    }

    if (!data.success) {
      return {
        success: false,
        error: data.error,
      };
    }

    return {
      success: true,
      twoFactorRequired: true,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: "An unknown error occurred",
    };
  }
};
