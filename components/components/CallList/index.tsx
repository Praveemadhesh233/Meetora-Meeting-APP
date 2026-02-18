"use client";

import Loader from "@/components/Core/Loader";
import MeetingCard from "@/components/MeetingComponent/MeetingCard";
import { useGetCalls } from "@/hooks/useGetCalls";
import { Call, CallRecording } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const CallList = ({ type }: { type: "upcoming" | "ended" | "recordings" }) => {
  const { endedCalls, upcomingCalls, callRecordings, isLoading } =
    useGetCalls();
  const router = useRouter();

  const [recordings, setRecordings] = useState<CallRecording[]>([]);

  const getCalls = () => {
    switch (type) {
      case "ended":
        return endedCalls;
      case "recordings":
        return recordings;
      case "upcoming":
        return upcomingCalls;
      default:
        return [];
    }
  };

  const getNoCallsMessage = () => {
    switch (type) {
      case "ended":
        return "No Previous Calls";
      case "recordings":
        return "No Recordings";
      case "upcoming":
        return "No Upcoming calls";
      default:
        return "";
    }
  };

  useEffect(() => {
    const fetchRecordings = async () => {
      try {
        const callData = await Promise.all(
          callRecordings?.map((meeting) => meeting.queryRecordings()) ?? []
        );

        const allRecordings = callData
          .filter((call) => call.recordings.length > 0)
          .flatMap((call) => call.recordings);

        setRecordings(allRecordings);
      } catch {
        toast("Try Again Later");
      }
    };

    if (type === "recordings") {
      fetchRecordings();
    }
  }, [type, callRecordings]);

  const calls = getCalls();
  const noCallsMessage = getNoCallsMessage();

  if (isLoading) return <Loader />;

  return (
    <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
      {calls && calls.length > 0 ? (
        calls.map((meeting) => {
          const isCall = (m: Call | CallRecording): m is Call => "state" in m;

          const title = isCall(meeting)
            ? meeting.state?.custom?.description?.substring(0, 26) ||
              "Personal Meeting"
            : meeting.filename?.substring(0, 20) || "Recording";

          const date = isCall(meeting)
            ? meeting.state?.startsAt?.toLocaleString?.() ?? ""
            : new Date(meeting.start_time).toLocaleString();

          const link =
            type === "recordings"
              ? "url" in meeting && typeof meeting.url === "string"
                ? meeting.url
                : undefined
              : "id" in meeting
              ? `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meeting.id}`
              : undefined;

          const handleClick =
            type === "recordings"
              ? () => {
                  if ("url" in meeting && typeof meeting.url === "string") {
                    window.open(meeting.url, "_blank", "noopener,noreferrer");
                  }
                }
              : () => {
                  if ("id" in meeting) {
                    router.push(`/meeting/${meeting.id}`);
                  }
                };

          return (
            <MeetingCard
              key={
                (isCall(meeting) ? meeting.id : meeting.filename) ??
                Math.random()
              }
              icon={
                type === "ended"
                  ? "/icons/previous.svg"
                  : type === "upcoming"
                  ? "/icons/upcoming.svg"
                  : "/icons/recordings.svg"
              }
              title={title}
              date={date}
              isPreviousMeeting={type === "ended"}
              buttonIcon1={
                type === "recordings" ? "/icons/play.svg" : undefined
              }
              buttonText={type === "recordings" ? "Play" : "Start"}
              link={link ?? ""}
              handleClick={handleClick}
            />
          );
        })
      ) : (
        <h1>{noCallsMessage}</h1>
      )}
    </div>
  );
};

export default CallList;
