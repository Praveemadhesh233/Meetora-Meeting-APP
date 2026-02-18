"use client";

import MicCamToggle from "@/components/Core/MicCamToggle";
import { Button } from "@/components/ui/button";
import {
  DeviceSettings,
  useCall,
  VideoPreview,
} from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";

const MeetingSetup = ({
  setIsSetupComplete,
}: {
  setIsSetupComplete?: (value: boolean) => void;
}) => {
  // const [isMicCamToggledOn, setIsMicCamToggledOn] = useState<boolean>(false);
  const [isMicOff, setIsMicOff] = useState<boolean>(false);
  const [isCamOff, setIsCamOff] = useState<boolean>(false);

  const call = useCall();

  if (!call) {
    throw new Error("useCall must be used within StreamCall Component");
  }

  useEffect(() => {
    if (isMicOff) {
      call?.microphone.disable();
    } else {
      call?.microphone.enable();
    }
  }, [isMicOff]);

  useEffect(() => {
    if (isCamOff) {
      call?.camera.disable();
    } else {
      call?.camera.enable();
    }
  }, [isCamOff]);

  return (
    <div className="flex flex-col items-center justify-center gap-6 min-h-screen w-full bg-zinc-950 px-4 text-white">
      {/* Title */}
      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-center">
        Setup Your Meeting
      </h1>

      <div className="flex gap-8 max-[905px]:flex-col">
        {/* Video Preview */}
        <div className="max-[540px]:relative w-full max-w-3xl max-[540]:w-[] aspect-video rounded-xl flex items-center overflow-hidden justify-center shadow-lg">
          <VideoPreview className="max-[540px]:absolute w-full h-full object-cover" />
        </div>

        <div className="flex flex-col items-center justify-center gap-6">
          {/* Mic / Camera + Settings */}
          <div className="flex flex-col items-center justify-center gap-2 sm:gap-6 w-full max-w-md max-[905px]:flex-row">
            <MicCamToggle
              checked={isCamOff}
              onChange={(v) => setIsCamOff(v)}
              label="Join with camera off"
              type="cam"
            />
            <MicCamToggle
              checked={isMicOff}
              onChange={(v) => setIsMicOff(v)}
              label="Join with microphone off"
              type="mic"
            />
          </div>

          <div className="flex flex-col max-[905px]:flex-row gap-8 items-center justify-center mb-8 w-full">
            <div className="flex items-center justify-center gap-2 bg-[#151c29] px-4 py-1 rounded-md">
              <p className="text-sm select-none">Call Settings {"->"}</p>
              <DeviceSettings />
            </div>

            {/* Join Button */}
            <Button
              className="bg-blue-600 font-medium text-white hover:bg-blue-700 transition-all duration-300 ease-in-out cursor-pointer"
              onClick={() => {
                call?.join();
                setIsSetupComplete?.(true);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="lucide lucide-square-plus-icon lucide-square-plus"
              >
                <rect width="18" height="18" x="3" y="3" rx="2" />
                <path d="M8 12h8" />
                <path d="M12 8v8" />
              </svg>
              Join Meeting
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeetingSetup;
