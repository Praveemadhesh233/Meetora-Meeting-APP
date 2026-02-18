import ClerkProviderClient from "@/components/ClerkProviderClient";
import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";

import "@stream-io/video-react-sdk/dist/css/styles.css";
import "react-datepicker/dist/react-datepicker.css";
import DesktopOnly from "@/components/Core/DesktopOnly/DesktopOnly";

const lato = Lato({
  subsets: ["latin"],
  weight: ["700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Meetora",
  description:
    "A modern web-based video conferencing platform that enables seamless virtual meetings, real-time chat, and secure collaboration with a simple and intuitive interface.",
  icons: "/icons/logo.svg",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProviderClient>
      <html lang="en" className="dark">
        <body className={`${lato.className} antialiased`}>
          <div className="max-[540px]:hidden">
            {children}
            <Toaster />
          </div>
          <div className="min-[540px]:hidden">
            <DesktopOnly />
          </div>
        </body>
      </html>
    </ClerkProviderClient>
  );
}
