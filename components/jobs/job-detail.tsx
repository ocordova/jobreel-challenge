"use client";
import { Button } from "@/components/ui/button";
import { Job } from "@/lib/definitions";
import { MuxPlayerRefAttributes } from "@mux/mux-player-react";
import MuxPlayer from "@mux/mux-player-react/lazy";
import { LucideMapPin, LucideVolume2, LucideVolumeX } from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

function Tag({ children }: { children: string }) {
  return (
    <span className="rounded-full px-2.5 py-1 bg-white/30">{children}</span>
  );
}

function MuteButton({
  muted,
  onClick,
}: {
  muted: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="absolute top-4 right-4 z-30 p-2 bg-white/30 rounded-full"
    >
      {muted ? (
        <LucideVolumeX className="w-6 h-6 text-white" />
      ) : (
        <LucideVolume2 className="w-6 h-6 text-white" />
      )}
    </button>
  );
}

function JobDescription({ job, onApply }: { job: Job; onApply: () => void }) {
  return (
    <div className="pt-16 z-30 flex flex-col gap-3 w-full text-white absolute bottom-0 left-0 p-4 bg-gradient-to-b from-transparent from-10% via-black/60 via-30% to-black to-90%">
      <div className="text-sm font-medium leading-none">{job.businessName}</div>
      <div className=" text-xl font-bold leading-none">{job.title}</div>
      <div className="text-xs font-medium leading-none">
        <LucideMapPin className="inline-block w-4 h-4 mr-1" />
        {job.location}
      </div>
      <div className="text-xs space-x-2">
        {job.tags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </div>
      <div className="mt-4 flex gap-2 w-full space-x-3 text-sm">
        <Button onClick={onApply} className="w-full grow">
          Apply on Jobreel
        </Button>
        <Button variant="secondary" className="flex-none">
          View Details
        </Button>
      </div>
    </div>
  );
}

export default function JobDetail({ job }: { job: Job }) {
  const playerRef = useRef<MuxPlayerRefAttributes>(null);
  const [muted, setMuted] = useState(true);
  const router = useRouter();

  const toggleMute = () => {
    if (playerRef.current) {
      playerRef.current.muted = !muted;
      setMuted(!muted);
    }
  };

  const handleApply = () => {
    router.push("/apply");
  };

  return (
    <div className="relative flex items-center justify-center h-screen overflow-hidden">
      <MuteButton muted={muted} onClick={toggleMute} />
      <MuxPlayer
        ref={playerRef}
        autoPlay="muted"
        muted={muted}
        loading="viewport"
        streamType="on-demand"
        playbackId={job.playbackId}
        loop={true}
        className="absolute z-10 w-auto min-w-full min-h-full max-w-none"
      />
      <JobDescription job={job} onApply={handleApply} />
    </div>
  );
}
