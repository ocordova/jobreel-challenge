"use server";
import { API_BASE_URL } from "@/lib/constants";
import { currentUser } from "@/lib/auth";
import {
  ApiResponseEnvelope,
  Profile,
  ProfileResponse,
} from "@/lib/definitions";

export const getUser = async (
  userId: string
): Promise<ApiResponseEnvelope<Profile>> => {
  const user = await currentUser();
  try {
    const response = await fetch(`${API_BASE_URL}/v1/users/${userId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.accessToken}`,
      },
    });

    const data: ProfileResponse = await response.json();

    if (!response.ok) {
      return {
        success: false,
      };
    }

    return {
      success: true,
      data: data.data,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: "An error occurred while fetching user data",
    };
  }
};
