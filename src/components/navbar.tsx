import { Sparkles } from "lucide-react";
import { ModeToggle } from "./theme-button";

const Navbar = () => {
  return (
    <nav className="flex justify-between px-40 py-2 items-center">
      <Sparkles />
      <ModeToggle />
    </nav>
  );
};
export default Navbar;
