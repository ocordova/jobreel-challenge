"use server";
import * as z from "zod";
import { API_BASE_URL } from "@/lib/constants";
import { CheckOTPResponse } from "@/lib/definitions";
import { LoginSchema } from "@/schemas";

export const checkOTP = async (
  values: z.infer<typeof LoginSchema>
): Promise<CheckOTPResponse | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/v1/auth/phone-number/check`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ phone_number: values.phone, code: values.code }),
    });
    const data: CheckOTPResponse = await response.json();

    if (data.error) {
      return null;
    }

    return data;
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: "An unknown error occurred",
    };
  }
};
