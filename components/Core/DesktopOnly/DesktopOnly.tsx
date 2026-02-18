"use client"; // If you're using app directory, ensure this at the top

import { useEffect, useState } from "react";
import { Monitor } from "lucide-react";

const DesktopOnly = () => {
  const [currentUrl, setCurrentUrl] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentUrl(window.location.href);
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-gradient-to-br from-background via-background to-muted animate-in fade-in duration-700">
      <div className="max-w-md w-full text-center space-y-8">
        {/* Icon */}
        <div className="flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-full blur-2xl opacity-20 animate-pulse" />
            <div className="relative bg-card rounded-full p-6 shadow-lg border border-border">
              <Monitor className="w-16 h-16 text-primary" strokeWidth={1.5} />
            </div>
          </div>
        </div>

        {/* Heading */}
        <div className="space-y-3">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Desktop Only
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            This website is optimized for desktop viewing and is not currently
            available on mobile devices.
          </p>
        </div>

        {/* URL Display */}
        <div className="bg-card border border-border rounded-lg p-4 shadow-sm">
          <p className="text-sm text-muted-foreground mb-2">
            Access from your desktop:
          </p>
          <code className="text-sm text-primary font-mono break-all">
            {currentUrl || "Loading..."}
          </code>
        </div>

        {/* Additional Info */}
        <p className="text-sm text-muted-foreground">
          Please visit this website from a desktop or laptop computer for the
          full experience.
        </p>
      </div>
    </div>
  );
};

export default DesktopOnly;
