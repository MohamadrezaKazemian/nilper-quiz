import React from "react";
import { cn } from "@/lib/utils";

interface LayoutProps {
  children: React.ReactNode;
  className?: string; // Optional className prop
}

const Layout = ({ children, className }: LayoutProps) => {
  return (
    <section
      className={
        "bg-office-background bg-cover bg-center  w-full p-5 md:p-10  min-h-screen mx-auto flex items-center"
      }
    >
      <div className={cn(className)}>{children}</div>
    </section>
  );
};

export default Layout;
