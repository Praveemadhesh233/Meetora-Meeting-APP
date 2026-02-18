"use client";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { sidebarLink } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const MobileNav = () => {
  const pathName = usePathname();
  return (
    <div className="w-full max-w-[264px]">
      <Sheet>
        <SheetTrigger asChild>
          <Image
            src={"/icons/hamburger.svg"}
            alt="hamburger"
            width={36}
            height={36}
            className="cursor-pointer"
          />
        </SheetTrigger>
        <SheetContent side="left" className="border-none bg-[#121212] ">
          <SheetHeader>
            <SheetClose asChild>
              <Link href={"/"} className="flex items-center gap-1">
                <Image
                  src={"/icons/logo.svg"}
                  alt="meetora logo"
                  width={36}
                  height={36}
                />
                <p className="text-[24px] font-bold text-white">Meetora</p>
              </Link>
            </SheetClose>
          </SheetHeader>
          <div className="flex flex-col px-4 h-[calc(100vh-72px)] justify-between overflow-y-auto">
            <SheetClose asChild>
              <section className="flex flex-col h-full gap-6 pt-4 text-white">
                {sidebarLink.map((link) => {
                  const isActive = pathName === link.route;

                  return (
                    <SheetClose asChild key={link.route}>
                      <Link
                        key={link.label}
                        href={link.route}
                        className={`flex gap-4 items-center p-4 rounded-lg justify-start w-full max-w-60 hover:bg-gray-50/5 ${
                          isActive
                            ? "bg-gradient-to-r from-[#0E78F9] to-gray-500"
                            : "bg-transparent"
                        }`}
                      >
                        <Image
                          src={link.imgUrl}
                          alt={link.label}
                          width={20}
                          height={20}
                        />
                        <p className="font-semibold">{link.label}</p>
                      </Link>
                    </SheetClose>
                  );
                })}
              </section>
            </SheetClose>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNav;
