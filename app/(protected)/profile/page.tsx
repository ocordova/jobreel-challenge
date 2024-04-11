import { getUser } from "@/actions/get-user";
import { auth } from "@/auth";
import UpdateNameForm from "@/components/profile/update-name-form";
import { Skeleton } from "@/components/ui/skeleton";
import { unstable_noStore as noStore } from "next/cache";
import { Suspense } from "react";

const FormSkeleton = () => (
  <div className="mt-4 flex flex-col space-y-3">
    <Skeleton className="h-8 w-[184]" />
    <Skeleton className="h-4 w-[80px]" />
    <Skeleton className="h-10 w-full" />
    <Skeleton className="h-10 w-full rounded-full" />
  </div>
);

async function DisplayUpdateNameForm() {
  noStore();
  const session = await auth();
  const userId = session!.user.userId;
  const response = await getUser(userId!);
  if (response.data) {
    return <UpdateNameForm profile={response.data} />;
  }
}

export default async function ProfilePage() {
  return (
    <>
      <Suspense fallback={<FormSkeleton />}>
        <DisplayUpdateNameForm />
      </Suspense>
    </>
  );
}
