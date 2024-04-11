import { jobs } from "@/data/jobs";
import { Job } from "@/lib/definitions";

export const getJob = async (jobId: string): Promise<Job | undefined> => {
  return jobs.find((job) => job.id === jobId);
};
