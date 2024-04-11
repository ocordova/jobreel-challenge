import Credentials from "next-auth/providers/credentials";

import type { NextAuthConfig } from "next-auth";

import { LoginSchema } from "./schemas";
import { checkOTP } from "./actions/check-otp";

export default {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        phone: { label: "Phone", type: "text" },
        code: { label: "Code", type: "text" },
      },
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);

        if (!validatedFields.success) {
          return null;
        }

        if (validatedFields.success) {
          const { phone, code } = credentials;
          const data = await checkOTP({
            phone: phone as string,
            code: code as string,
          });

          if (!data?.data) {
            return null;
          }

          return {
            name: null,
            phone: phone,
            userId: data.data.user_id,
            accessToken: data.data.access_token,
            refreshToken: data.data.refresh_token,
            isKnown: data.data.is_known,
          };
        }
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
