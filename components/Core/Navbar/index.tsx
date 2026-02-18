import MobileNav from "@/components/components/MobileNav";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="flex justify-between fixed z-50 w-full bg-zinc-900 px-6 py-4 lg:px-10">
      <Link href={"/"} className="flex items-center gap-1">
        <Image
          src={"/icons/logo.svg"}
          alt="meetora logo"
          width={36}
          height={36}
        />
        <p className="text-[24px] font-bold text-white ">
          {" "}
          {/* max-sm:hidden */}
          Meetora
        </p>
      </Link>

      <div className="flex justify-between gap-5 items-center">
        <div className="flex items-center justify-start gap-2 px-4 max-lg:p-0">
          <UserButton />
          {/* <span className="text-gray-200 font-semibold group-hover:text-white transition-colors select-none">
            {user?.firstName}
          </span> */}
        </div>
        <MobileNav />
      </div>
    </nav>
  );
};

export default Navbar;
