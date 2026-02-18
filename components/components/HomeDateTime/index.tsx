"use client";

import { useDateTime } from "@/hooks/useDateTime";
import { useUser } from "@clerk/nextjs";

const HomeDateTime = () => {
  const { time, date } = useDateTime();
  const { user } = useUser();

  return (
    <div className="flex h-full flex-col justify-between px-5 py-8 lg:p-11">
      <h2 className="glassmorphism max-w-[270px] rounded py-2 text-center text-3xl font-bold space-x-0.5">
        Hello {user?.firstName}
      </h2>

      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-extrabold lg:text-5xl">{time}</h1>
        <p className="text-lg font-medium text-sky-1 lg:text-2xl">{date}</p>
      </div>
    </div>
  );
};

export default HomeDateTime;
