import NextAuth, { type DefaultSession } from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {
  userId: string;
  email: string;
  name: string;
  phone: string;
  accessToken: string;
  refreshToken: string;
  isKnown: boolean;
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}
