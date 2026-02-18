"use client";

import { Button } from "@/components/ui/button";
import { SignedOut, SignInButton, SignUpButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

const LandingNavbar = () => {
  return (
    <div>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link
              href={"/"}
              className="flex gap-2 items-center font-bold select-none"
            >
              <Image
                src={"/icons/logo.svg"}
                alt="logo"
                width={50}
                height={50}
              />
              <p className="text-2xl w-full transition-all duration-300 max-lg:hidden mb-1">
                Meetora
              </p>
            </Link>

            {/* Auth Buttons */}
            <div className="flex items-center gap-3">
              <SignedOut>
                {/* <SignInButton /> */}
                <SignInButton>
                  {/* <button className="border-1 border-[#6c47ff] px-3 py-1.5 rounded-sm text-[14px] cursor-pointer">
                    Sign in
                  </button> */}
                  <Button
                    variant="outline"
                    size="default"
                    className="cursor-pointer"
                  >
                    Sign In
                  </Button>
                </SignInButton>
                <SignUpButton>
                  {/* <button className="bg-[#6c47ff] px-3 py-1.5 rounded-sm text-[14px] cursor-pointer">
                    Sign Up
                  </button> */}
                  <Button
                    variant="default"
                    size="default"
                    className="cursor-pointer bg-gradient-to-r from-[var(--landing-primary)] from-60% to-[var(--landing-accent)]"
                  >
                    Sign Up
                  </Button>
                </SignUpButton>
              </SignedOut>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default LandingNavbar;
