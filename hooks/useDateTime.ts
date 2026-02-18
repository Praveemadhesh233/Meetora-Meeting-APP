"use client";

import { useEffect, useState } from "react";

export const useDateTime = () => {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();

      const formattedTime = now.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      });

      const formattedDate = new Intl.DateTimeFormat("en-US", {
        dateStyle: "full",
      }).format(now);

      setTime(formattedTime);
      setDate(formattedDate);
    };

    updateTime(); // set immediately
    const interval = setInterval(updateTime, 1000); // update every second

    return () => clearInterval(interval);
  }, []);

  return { time, date };
};
