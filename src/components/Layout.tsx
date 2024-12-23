import React from "react";
import { cn } from "@/lib/utils";

interface LayoutProps {
  children: React.ReactNode;
  className?: string; // Optional className prop
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <section
      className={cn(
        "mx-auto flex min-h-screen w-full flex-col items-center justify-center bg-office-background bg-cover bg-center p-5 md:p-10",
      )}
    >
      {children}
    </section>
  );
};

export default Layout;
