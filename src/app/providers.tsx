'use client';

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/toaster";
import { Sidebar } from "@/components/ui/sidebar";
import { SidebarInset } from "@/components/ui/sidebar";
import { SidebarContent } from "@/components/layout/sidebar-content";
import { ThemeToggle } from "@/components/theme-toggle";
import { SidebarTrigger } from "@/components/ui/sidebar";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <SidebarProvider>
        {/* Main layout container */}
        <div className="flex h-screen overflow-hidden">
          {/* Sidebar */}
          <Sidebar>
            <SidebarContent />
          </Sidebar>

          {/* Main content area */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Mobile header */}
            <header className="sticky top-0 z-10 flex h-14 items-center justify-between gap-4 border-b bg-background px-4 py-2 md:hidden">
              <SidebarTrigger />
              <ThemeToggle />
            </header>

            {/* Scrollable content area */}
            <SidebarInset className="flex-1 overflow-y-auto">
              {children}
            </SidebarInset>
          </div>
        </div>
      </SidebarProvider>
      <Toaster />
    </NextThemesProvider>
  );
}
