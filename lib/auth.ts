import { auth, unstable_update as update } from "@/auth";

export const currentUser = async () => {
  const session = await auth();

  return session?.user;
};

export const updateSession = async ({
  accessToken,
  refreshToken,
}: {
  accessToken: string;
  refreshToken: string;
}) => {
  const session = await update({
    user: {
      accessToken: accessToken,
      refreshToken: refreshToken,
    },
  });
  return session;
};
