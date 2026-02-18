// components/ClerkProviderClient.tsx
"use client";

import React from "react";
import { ClerkProvider } from "@clerk/nextjs";

export default function ClerkProviderClient({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      appearance={{
        layout: {
          logoImageUrl: "/icons/logo.svg",
          socialButtonsVariant: "iconButton",
        },
        variables: {
          colorText: "#fff",
          colorBackground: "#262626",
          colorPrimary: "#0E78F9",
          colorInputBackground: "#383838",
          colorInputText: "#fff",
        },
      }}
    >
      {children}
    </ClerkProvider>
  );
}
