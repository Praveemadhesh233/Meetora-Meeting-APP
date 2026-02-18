"use client";

import { sidebarLink } from "@/constants";
import { UserButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const { user } = useUser();

  const pathName = usePathname();

  return (
    <section
      className={`sticky left-0 top-0 flex max-h-screen w-fit lg:w-[264px] flex-col justify-between bg-zinc-900 rounded-br-2xl rounded-tr-2xl p-6 max-md:hidden`}
    >
      <div className="flex flex-col justify-between h-full">
        <div className="flex flex-col gap-6">
          <Link
            href={"/"}
            className="flex gap-2 items-center font-bold select-none"
          >
            <Image src={"/icons/logo.svg"} alt="logo" width={60} height={60} />
            <p className="text-2xl w-full transition-all duration-300 max-lg:hidden mb-1">
              Meetora
            </p>
          </Link>
          <div className="flex flex-1 flex-col gap-2">
            {sidebarLink.map((link) => {
              const isActive = pathName === link.route;

              return (
                <Link
                  key={link.label}
                  href={link.route}
                  className={`flex gap-4 items-center p-4 rounded-lg justify-start hover:bg-gray-50/5 ${
                    isActive
                      ? "bg-gradient-to-r from-[#0E78F9] to-gray-500"
                      : "bg-transparent"
                  }`}
                  prefetch={true}
                >
                  <Image
                    src={link.imgUrl}
                    alt={link.label}
                    width={20}
                    height={20}
                  />
                  <p className="text-lg font-semibold max-lg:hidden text-white transition-all duration-300">
                    {link.label}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
        <div className="flex items-center justify-start max-lg:justify-center gap-2 px-4 max-lg:p-0 max-lg:gap-0">
          <UserButton />
          <span className="text-gray-200 font-semibold group-hover:text-white transition-colors select-none max-lg:hidden">
            {user?.firstName}
          </span>
        </div>
      </div>
    </section>
  );
};

export default Sidebar;
