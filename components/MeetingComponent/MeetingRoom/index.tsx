type CallLayoutType = "speaker-left" | "speaker-right" | "grid";

import EndCallButton from "@/components/components/EndCallButton";
import Loader from "@/components/Core/Loader";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { meetingLayout } from "@/constants";
import {
  CallControls,
  CallingState,
  CallParticipantsList,
  CallStatsButton,
  PaginatedGridLayout,
  SpeakerLayout,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";
import { LayoutList, Users } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const MeetingRoom = () => {
  const searchParams = useSearchParams();
  const isPersonal = !!searchParams.get("personal");
  const [layout, setLayout] = useState<CallLayoutType>("speaker-left");
  const [showParticipants, setShowParticipants] = useState(false);

  const router = useRouter();

  const { useCallCallingState } = useCallStateHooks();

  const callingState = useCallCallingState();

  if (callingState !== CallingState.JOINED) return <Loader />;

  const CallLayout = () => {
    switch (layout) {
      case "grid":
        return <PaginatedGridLayout />;
      case "speaker-right":
        return <SpeakerLayout participantsBarPosition={"left"} />;
      default:
        return <SpeakerLayout participantsBarPosition={"right"} />;
    }
  };

  return (
    <section className="relative w-full h-screen overflow-hidden pt-4 text-white">
      <div className="relative flex size-full items-center justify-center">
        <div className="flex size-full max-w-[1000px] items-center">
          <CallLayout />
        </div>
        <div
          className={`h-[calc(100vh-86px)] bg-[#19232d] p-5 rounded-2xl ${
            showParticipants ? "visible" : "hidden"
          } ml-2`}
        >
          <CallParticipantsList onClose={() => setShowParticipants(false)} />
        </div>
      </div>
      {/* <div className="fixed bottom-0 w-full flex justify-center items-center"> */}
        <div className="fixed bottom-1 z-0 flex w-full items-center justify-center gap-5 flex-wrap">
          <CallControls
            onLeave={() => {
              router.push("/");
              toast("Meeting Ended");
            }}
          />
          <DropdownMenu>
            <title>Change Layout</title>
            <div className="flex items-center">
              <DropdownMenuTrigger className="cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]">
                <LayoutList size={18} className="text-white" />
              </DropdownMenuTrigger>
            </div>

            <DropdownMenuContent className="bg-[#19232d] shadow-xl shadow-black border-none">
              {meetingLayout.map((item, index) => (
                <div key={index}>
                  <DropdownMenuItem
                    className="cursor-pointer hover:bg-amber-50"
                    onClick={() => {
                      setLayout(item.toLowerCase() as CallLayoutType);
                    }}
                  >
                    {item}
                  </DropdownMenuItem>
                  {index !== meetingLayout.length - 1 && (
                    <DropdownMenuSeparator className="border-zinc-900" />
                  )}
                </div>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <CallStatsButton />
          <button onClick={() => setShowParticipants((prev) => !prev)}>
            <div className="cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]">
              <Users size={18} className="text-white" />
            </div>
          </button>
          {!isPersonal && <EndCallButton />}
        </div>
      {/* </div> */}
    </section>
  );
};

export default MeetingRoom;
