import { Sparkles } from "lucide-react";
import { ModeToggle } from "./theme-button";
import { getAuthSession } from "@/lib/auth";
import Link from "next/link";
import SignOutButton from "./SignOutButton";
import { formatUsername } from "@/lib/utils";

const Navbar = async () => {
  const session = await getAuthSession();
  return (
    <nav className="flex justify-between lg:px-40 px-5 py-2 items-center">
      <Link href={"/feed"}>
        <svg
          width="36"
          height="45"
          viewBox="0 0 76 85"
          fill="none"
          className="dark:stroke-white light:stroke-black stroke-current"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14.0008 84.5C7.00079 48 -6.8001 -14.6226 14.0008 14.5C38.9998 49.5002 -3 -23.5001 36.5 14.5C66.6673 43.5217 73.5001 51.5 73.5001 51.5M16 31.1419C17.6667 27.6419 23.4 20.9419 33 22.1419"
            // stroke="black"
            strokeWidth="5"
          />
        </svg>
      </Link>

      <div className="flex gap-2 items-center">
        {session?.user?.image ? (
          <div className="flex gap-2 items-center cursor-pointer">
            <img
              src={session.user.image}
              alt="profile"
              className="w-[42px] h-[42px]"
            />
            <div className="leading-tight lg:block hidden mr-2">
              <p className="font-semibold">{session.user.name}</p>
              <p className="text-neutral-500">
                @{formatUsername(session.user.email)}
              </p>
            </div>
            <SignOutButton />
          </div>
        ) : (
          <Link href="/sign-in"></Link>
        )}
        <ModeToggle />
      </div>
    </nav>
  );
};
export default Navbar;
