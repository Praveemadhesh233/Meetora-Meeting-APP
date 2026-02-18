"use client";

import { Button } from "@/components/ui/button";
import { avatarImages } from "@/constants";
import Image from "next/image";
import { toast } from "sonner";

interface MeetingCardProps {
  title: string;
  date: string;
  icon: string;
  isPreviousMeeting?: boolean;
  buttonIcon1?: string;
  buttonText?: string;
  handleClick: () => void;
  link: string;
}

const MeetingCard = ({
  icon,
  title,
  date,
  isPreviousMeeting,
  buttonIcon1,
  handleClick,
  link,
  buttonText,
}: MeetingCardProps) => {
  return (
    <section className="flex min-h-[258px] w-full flex-col justify-between rounded-[14px] bg-zinc-800 px-6 py-6 xl:max-w-[568px] transition-all duration-300 hover:bg-zinc-700/60">
      {/* Header */}
      <article className="flex flex-col gap-5">
        <Image src={icon} alt="meeting-icon" width={28} height={28} />
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-semibold text-white">{title}</h1>
            <p className="text-sm text-zinc-300">{date}</p>
          </div>
        </div>
      </article>

      {/* Footer */}
      <article className="flex justify-between items-center w-full mt-4 flex-wrap gap-3">
        {/* Attendees */}
        <div className="relative flex items-center max-sm:hidden">
          {avatarImages.slice(0, 4).map((img: string, index: number) => (
            <div
              key={index}
              className="relative"
              style={{ marginLeft: index === 0 ? 0 : "-12px" }}
            >
              <Image
                src={img}
                alt="attendee"
                width={40}
                height={40}
                className="rounded-full border-2 border-zinc-800"
              />
            </div>
          ))}
          <div className="ml-2 flex items-center justify-center size-10 rounded-full border-2 border-zinc-700 bg-zinc-900 text-sm text-white font-medium">
            +5
          </div>
        </div>

        {/* Buttons */}
        {!isPreviousMeeting && (
          <div className="flex items-center gap-3">
            <Button
              onClick={handleClick}
              className="flex items-center gap-2 rounded-md bg-blue-500 hover:bg-blue-600 px-5 py-2.5 text-white transition-all duration-300 cursor-pointer"
            >
              {buttonIcon1 && (
                <Image
                  src={buttonIcon1}
                  alt="button-icon"
                  width={18}
                  height={18}
                />
              )}
              <span className="text-sm font-medium">{buttonText}</span>
            </Button>

            <Button
              onClick={() => {
                navigator.clipboard.writeText(link);
                toast.success("Link copied!");
              }}
              className="flex items-center gap-2 rounded-md bg-zinc-900 hover:bg-zinc-950 px-4 py-2.5 text-white transition-all duration-300 cursor-pointer"
            >
              <Image src="/icons/copy.svg" alt="copy" width={18} height={18} />
              <span className="text-sm font-medium">Copy Link</span>
            </Button>
          </div>
        )}
      </article>
    </section>
  );
};

export default MeetingCard;
