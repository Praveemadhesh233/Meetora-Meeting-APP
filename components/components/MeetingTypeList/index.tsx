"use client";

import HomeCard from "@/components/Core/HomeCard";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ReactDatePicker from "react-datepicker";
import { toast } from "sonner";
import MeetingModal from "../MeetingModal";

type MeetingStateType =
  | "isInstantMeeting"
  | "isJoiningMeeting"
  | "isScheduleMeeting"
  | undefined;

const MeetingTypeList = () => {
  const router = useRouter();
  const [meetingState, setMeetingState] = useState<MeetingStateType>();
  const [values, setValues] = useState({
    dateTime: new Date(),
    description: "",
    link: "",
  });
  const [callDetails, setCallDetails] = useState<Call>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { user } = useUser();
  const client = useStreamVideoClient();

  const createMeeting = async () => {
    if (!client || !user) return;

    setIsLoading(true);
    try {
      if (!values.dateTime) {
        toast("Please select a date and time");
        return;
      }
      const id = crypto.randomUUID();
      const call = client.call("default", id);
      if (!call) throw new Error("Failed to create meeting");
      const startsAt =
        values.dateTime.toISOString() || new Date(Date.now()).toISOString();
      const description = values.description || "Instant Meeting";
      await call.getOrCreate({
        data: {
          starts_at: startsAt,
          custom: {
            description,
          },
        },
      });
      setCallDetails(call);
      if (!values.description) {
        router.prefetch(`/meeting/${call.id}`);
        router.push(`/meeting/${call.id}`);
      }
      toast("Meeting Created Successfully");
    } catch (error) {
      console.error(error);
      toast("Failed to create Meeting");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClick = async () => {
    if (!values.link) {
      toast("Please Enter the Valid Meeting Link!");
      return;
    }

    try {
      setIsLoading(true);

      // Prefetch before navigating
      await router.prefetch(values.link);

      // Wait until the navigation completes
      await router.push(values.link);
    } finally {
      // When routing is done, set loading to false
      setIsLoading(false);
    }
  };

  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetails?.id}`;

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
      <HomeCard
        img="/icons/add-meeting.svg"
        title="New Meeting"
        description="Start an istant meeting"
        handleClick={() => {
          setMeetingState("isInstantMeeting");
        }}
        className="bg-[#FF742E]"
      />
      <HomeCard
        img="/icons/schedule.svg"
        title="Schedule Meeting"
        description="Plan your meeting"
        handleClick={() => {
          setMeetingState("isScheduleMeeting");
        }}
        className="bg-[#830EF9]"
      />
      <HomeCard
        img="/icons/join-meeting.svg"
        title="Join Meeting"
        description="Join meeting via invitation"
        handleClick={() => {
          setMeetingState("isJoiningMeeting");
        }}
        className="bg-sky-600"
      />
      <HomeCard
        img="/icons/recordings.svg"
        title="View Recordings"
        description="Check out your recordings"
        handleClick={() => {
          router.prefetch("/recordings");
          router.push("/recordings");
        }}
        className="bg-[#F9A90E]"
      />

      <MeetingModal
        isOpen={meetingState === "isInstantMeeting"}
        onClose={() => setMeetingState(undefined)}
        title="Start an Instant Meeting"
        className="text-center"
        buttonText="Start Meeting"
        handleClick={createMeeting}
        isLoading={isLoading}
      />

      {!callDetails ? (
        <MeetingModal
          isOpen={meetingState === "isScheduleMeeting"}
          onClose={() => setMeetingState(undefined)}
          title="Create Meeting"
          handleClick={createMeeting}
          isLoading={isLoading}
        >
          <div className="flex flex-col gap-2.5">
            <label className="text-base font-normal leading-[22.4px] text-sky-2">
              Add a description
            </label>
            <Textarea
              className="border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0"
              onChange={(e) =>
                setValues({ ...values, description: e.target.value })
              }
            />
          </div>
          <div className="flex w-full flex-col gap-2.5">
            <label className="text-base font-normal leading-[22.4px] text-sky-2">
              Select Date and Time
            </label>
            <ReactDatePicker
              selected={values.dateTime}
              onChange={(date) => setValues({ ...values, dateTime: date! })}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              timeCaption="time"
              dateFormat="MMMM d, yyyy h:mm aa"
              className="w-full rounded bg-zinc-800 p-2 focus:outline-none"
            />
          </div>
        </MeetingModal>
      ) : (
        <MeetingModal
          isOpen={meetingState === "isScheduleMeeting"}
          onClose={() => setMeetingState(undefined)}
          title="Meeting Created"
          handleClick={() => {
            navigator.clipboard.writeText(meetingLink);
            toast("Meeting Link Copied!");
          }}
          image={"/icons/checked.svg"}
          buttonIcon="/icons/copy.svg"
          className="text-center"
          buttonText="Copy Meeting Link"
        />
      )}

      <MeetingModal
        isOpen={meetingState === "isJoiningMeeting"}
        onClose={() => setMeetingState(undefined)}
        title="Enter the Meeting Link here"
        className="text-center"
        buttonText="Join Meeting"
        handleClick={handleClick}
        isLoading={isLoading}
      >
        <Input
          placeholder="Meeting Link"
          className="border-none bg-zinc-800 focus-visible:ring-0 focus-visible:ring-offset-0"
          onChange={(e) => setValues({ ...values, link: e.target.value })}
        />
      </MeetingModal>
    </section>
  );
};

export default MeetingTypeList;
