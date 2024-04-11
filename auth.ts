import NextAuth from "next-auth";
import authConfig from "@/auth.config";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
  unstable_update,
} = NextAuth({
  pages: {
    signIn: "/auth/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ session, token, trigger, newSession }) {
      // When the user is created we trigger the update callback to update the tokens
      // https://next-auth.js.org/getting-started/client#updating-the-session
      if (
        trigger === "update" &&
        newSession.accessToken &&
        newSession.refreshToken
      ) {
        session.user.accessToken = newSession.accessToken;
        session.user.refreshToken = newSession.refreshToken;
      }
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (session.user) {
        session.user.name = token.name!;
        session.user.phone = token.phone! as string;
        session.user.userId = token.userId! as string;
        session.user.accessToken = token.accessToken! as string;
        session.user.refreshToken = token.refreshToken! as string;
        session.user.isKnown = token.isKnown! as boolean;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (!token.sub) return token;
      return {
        ...token,
        ...user,
      };
    },
  },
  ...authConfig,
});
