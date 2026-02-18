import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Spinner } from "@/components/ui/spinner";
import Image from "next/image";
import React from "react";
import { Button } from "../../ui/button";

interface MeetingModalProps {
  isOpen: boolean;
  onClose: (open: boolean) => void;
  title: string;
  className?: string;
  buttonText?: string;
  handleClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  image?: string;
  buttonIcon?: string;
  isLoading?: boolean;
  children?: React.ReactNode;
}

const MeetingModal = ({
  isOpen,
  onClose,
  title,
  className,
  buttonText,
  handleClick,
  image,
  buttonIcon,
  children,
  isLoading,
}: MeetingModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="flex w-full max-w-[520px] flex-col gap-6 border-none bg-zinc-900 px-6 py-9 text-white">
        <DialogHeader>
          <div className="flex flex-col gap-6">
            {image && (
              <div className="flex justify-center">
                <Image
                  src={image}
                  alt="meeting"
                  width={72}
                  height={72}
                  className=""
                />
              </div>
            )}
            <DialogTitle
              className={`text-2xl font-bold leading-[42px] ${className}`}
            >
              {title}
            </DialogTitle>
            {children}
            {isLoading ? (
              <Button className="focus-visible:ring-0 focus-visible:ring-offset-0 bg-blue-300 hover:bg-blue-300 py-2 text-white cursor-not-allowed">
                <Spinner />
              </Button>
            ) : (
              <Button
                onClick={handleClick}
                className="focus-visible:ring-0 focus-visible:ring-offset-0 bg-[var(--landing-primary)] hover:bg-[var(--landing-primary)] text-white cursor-pointer"
              >
                {buttonIcon && (
                  <Image src={buttonIcon} alt="button" width={13} height={13} />
                )}
                &nbsp;
                {buttonText || "Schedule Meeting"}
              </Button>
            )}
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default MeetingModal;
