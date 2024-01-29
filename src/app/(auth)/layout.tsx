import Navbar from "@/components/navbar";
import { FC, ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen justify-center items-center">
      {children}
    </div>
  );
};

export default AuthLayout;
