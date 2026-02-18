import Navbar from "@/components/Core/Navbar";

import HomePage from "@/components/HomePage";
import { ReactNode } from "react";

const HomeLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="relative">
      <div className="min-md:hidden">
        <Navbar />
      </div>
      <HomePage>{children}</HomePage>
    </main>
  );
};

export default HomeLayout;
