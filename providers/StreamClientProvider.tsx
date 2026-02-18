"use client";

import { tokenProvider } from "@/actions/stream.actions";
import Loader from "@/components/Core/Loader";
import { useUser } from "@clerk/nextjs";
import { StreamVideo, StreamVideoClient } from "@stream-io/video-react-sdk";
import { ReactNode, useEffect, useState } from "react";

interface StreamVideoProviderProps {
  children: ReactNode;
}

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;

const StreamVideoProvider = ({ children }: StreamVideoProviderProps) => {
  const { user, isLoaded, isSignedIn } = useUser();

  const [videoClient, setVideoClient] = useState<StreamVideoClient>();

  useEffect(() => {
    if (!isLoaded) return;

    // If the user is not signed in, we do not need a Stream client.
    if (!isSignedIn) {
      setVideoClient(undefined);
      return;
    }

    if (!apiKey) throw new Error("Stream Api Key Missing");

    const client = new StreamVideoClient({
      apiKey,
      user: {
        id: user?.id as string,
        name: user?.firstName || user?.id,
        image: user?.imageUrl,
      },
      tokenProvider,
    });

    setVideoClient(client);
  }, [isLoaded, isSignedIn, user]);

  // While Clerk is loading, show a loader.
  if (!isLoaded) return <Loader />;

  // For guests, render children without a Stream client so the landing page can show.
  if (!isSignedIn) return <>{children}</>;

  // For signed-in users, wait for the client to initialize.
  if (!videoClient) return <Loader />;

  return <StreamVideo client={videoClient}>{children}</StreamVideo>;
};

export default StreamVideoProvider;
