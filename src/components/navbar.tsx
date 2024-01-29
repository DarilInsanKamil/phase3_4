import { Sparkles } from "lucide-react";
import { ModeToggle } from "./theme-button";
import { getAuthSession } from "@/lib/auth";

const Navbar = async () => {
  const session = await getAuthSession();
  return (
    <nav className="flex justify-between lg:px-40 px-5 py-2 items-center">
      <Sparkles />
      <div>
        <ModeToggle />
        <pre>{JSON.stringify(session?.user, null, 2)}</pre>
        {session?.user?.image && <img src={session.user.image} alt="profile" />}
      </div>
    </nav>
  );
};
export default Navbar;
