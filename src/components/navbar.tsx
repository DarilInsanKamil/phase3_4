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
      <Sparkles />
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
              <p className="text-neutral-500">@{formatUsername(session.user.email)}</p>
            </div>
            <SignOutButton />
          </div>
        ) : (
          <Link href="/sign-in"></Link>
        )}
        {/* <ModeToggle /> */}
      </div>
    </nav>
  );
};
export default Navbar;
