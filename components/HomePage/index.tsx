"use client";

import Sidebar from "@/components/Core/Sidebar";
import LandingPage from "@/components/LandingPage";
import { useUser } from "@clerk/nextjs";
import { ReactNode } from "react";
import Loader from "../Core/Loader";

const HomePage = ({ children }: { children: ReactNode }) => {
  const { isSignedIn, isLoaded } = useUser();

  if (!isLoaded) return <Loader />;
  return isSignedIn ? (
    <div className="flex">
      <Sidebar />
      <section className="flex min-h-screen flex-1 flex-colpx-6 pb-6 max-md:pt-28 pt-14 max-md:pb-14 px-4 sm:px-14">
        <div className="w-full">{children}</div>
      </section>
    </div>
  ) : (
    <LandingPage />
  );
};

export default HomePage;
