import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const session = await auth();

  const user = session?.user;

  const isKnownUser = user?.isKnown;

  if (isKnownUser) {
    redirect("/profile");
  } else {
    redirect("onboarding");
  }
}
