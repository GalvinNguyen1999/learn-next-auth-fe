"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layouts/app-sidebar";
import { useSession } from "next-auth/react";

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const session = useSession();
  
  return (
    <>
      {!!session?.data && <AppSidebar />}
      <main className="flex-1">
        {!!session?.data && <SidebarTrigger />}
        {children}
      </main>
    </>
  );
} 