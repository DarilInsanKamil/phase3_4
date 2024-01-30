import { Sparkles } from "lucide-react";
import { ModeToggle } from "./theme-button";
import { getAuthSession } from "@/lib/auth";
import { signOut } from "next-auth/react";
import { buttonVariants } from "./ui/button";
import Link from "next/link";
import SignOutButton from "./SignOutButton";

const Navbar = async () => {
  const session = await getAuthSession();
  return (
    <nav className="flex justify-between lg:px-40 px-5 py-2 items-center">
      <Sparkles />
      <div className="flex gap-2 items-center">
        <ModeToggle />
        {session?.user?.image ? (
          <div>
            <img
              src={session.user.image}
              alt="profile"
              className="w-[60px] h-[60px]"
            />
            <SignOutButton />
          </div>
        ) : (
          <Link href="/sign-in"></Link>
        )}
      </div>
    </nav>
  );
};
export default Navbar;
