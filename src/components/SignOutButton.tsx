'use client'
import { signOut } from "next-auth/react";
import { buttonVariants } from "./ui/button";

const SignOutButton = () => {
  return (
    <button
      onClick={() =>
        signOut({
          redirect: true,
          callbackUrl: `${window.location.origin}/sign-in`,
        })
      }
      className={buttonVariants()}
    >
      Sign Out
    </button>
  );
};
export default SignOutButton;
