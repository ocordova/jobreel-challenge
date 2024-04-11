import NameForm from "@/components/onboarding/name-form";
import { currentUser } from "@/lib/auth";

export default async function OnboardingPage() {
  const user = await currentUser();

  return (
    <>
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <NameForm />
    </>
  );
}
