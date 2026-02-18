"use client";

import { Button } from "@/components/ui/button";
import { useCall, useCallStateHooks } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const EndCallButton = () => {
  const call = useCall();
  const router = useRouter();

  const { useLocalParticipant } = useCallStateHooks();
  const localParticipant = useLocalParticipant();
  const isMeetingOwner =
    localParticipant &&
    call?.state.createdBy &&
    localParticipant.userId === call?.state.createdBy.id;

  if (!isMeetingOwner) return null;

  return (
    <Button
      onClick={async () => {
        await call.endCall();
        router.push("/");
        toast("Meeting Ended");
      }}
      className="bg-red-500 text-white cursor-pointer hover:bg-red-600"
    >
      End call for everyone
    </Button>
  );
};

export default EndCallButton;
