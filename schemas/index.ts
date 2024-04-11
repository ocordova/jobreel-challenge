import * as z from "zod";
import { isValidPhoneNumber } from "react-phone-number-input";

export const LoginSchema = z.object({
  phone: z.string().min(1, {
    message: "Phone number must be at least 10 characters",
  }),
  // phone: z
  //   .string()
  //   .refine(isValidPhoneNumber, { message: "Invalid phone number" }),
  code: z
    .string()
    .min(6, {
      message: "Code must be at least 6 characters",
    })
    .nullish(),
});

export const CreateUserSchema = z.object({
  fullName: z.string().min(2, {
    message: "Full name must be at least 2 characters",
  }),
});

export const UpdateUserSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters",
    })
    .max(50, {
      message: "Name must be at most 50 characters",
    }),
});
