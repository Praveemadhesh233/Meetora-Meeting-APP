import { Clock, Radio, Share2, Shield, Users, Video } from "lucide-react";

export const sidebarLink = [
  {
    label: "Home",
    route: "/",
    imgUrl: "/icons/Home.svg",
  },
  {
    label: "UpComing",
    route: "/upcoming",
    imgUrl: "/icons/upcoming.svg",
  },
  {
    label: "Previous",
    route: "/previous",
    imgUrl: "/icons/previous.svg",
  },
  {
    label: "Recordings",
    route: "/recordings",
    imgUrl: "/icons/Video.svg",
  },
  {
    label: "Personal Room",
    route: "/personal-room",
    imgUrl: "/icons/add-personal.svg",
  },
];

export const landingFeatures = [
  {
    icon: Video,
    title: "HD Video Quality",
    description:
      "Experience crystal-clear 1080p video calls with adaptive quality that adjusts to your connection.",
  },
  {
    icon: Share2,
    title: "Screen Sharing",
    description:
      "Share your screen, applications, or specific windows with just one click for seamless collaboration.",
  },
  {
    icon: Radio,
    title: "Meeting Recording",
    description:
      "Record important meetings and save them to the cloud for team members who couldn't attend.",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description:
      "End-to-end encryption and advanced security features to keep your conversations private.",
  },
  {
    icon: Users,
    title: "Up to 500 Participants",
    description:
      "Host large meetings, webinars, and virtual events with support for hundreds of participants.",
  },
  {
    icon: Clock,
    title: "Unlimited Meetings",
    description:
      "No time limits on your meetings. Host as many sessions as you need, for as long as you need.",
  },
];

export const meetingLayout = ["Grid", "Speaker-Left", "Speaker-Right"];

export const avatarImages = [
  "/images/avatar-1.jpeg",
  "/images/avatar-2.jpeg",
  "/images/avatar-3.png",
  "/images/avatar-4.png",
  "/images/avatar-5.png",
];
