import { getJob } from "@/actions/get-job";
import JobDetail from "@/components/jobs/job-detail";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Job detail",
};

export default async function JobDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const job = await getJob(params.id);

  if (!job) {
    notFound();
  }

  return (
    <div className="w-full mx-auto max-w-xl">
      <JobDetail job={job} />
    </div>
  );
}
