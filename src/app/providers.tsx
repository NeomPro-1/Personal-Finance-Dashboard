'use client';

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { SidebarProvider } from "@/components/ui/sidebar"
import { Toaster } from "@/components/ui/toaster"
import { Sidebar } from "@/components/ui/sidebar"
import { SidebarInset } from "@/components/ui/sidebar"
import { SidebarContent } from "@/components/layout/sidebar-content"
import { ThemeToggle } from "@/components/theme-toggle"
import { SidebarTrigger } from "@/components/ui/sidebar"

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
        <div className="flex min-h-screen">
            {/* Desktop Sidebar */}
            <div className="hidden border-r bg-muted/40 md:flex">
                <Sidebar>
                    <SidebarContent />
                </Sidebar>
            </div>
            
            {/* Mobile Sidebar (Sheet) */}
            <Sidebar>
                <SidebarContent />
            </Sidebar>

            <div className="flex-1 flex flex-col h-screen overflow-y-auto">
            <header className="sticky top-0 z-10 flex h-14 items-center justify-between gap-4 border-b bg-background px-4 py-2 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6 md:hidden">
                <SidebarTrigger />
                <ThemeToggle />
            </header>
            <SidebarInset>
                {children}
            </SidebarInset>
            </div>
        </div>
      </SidebarProvider>
      <Toaster />
    </NextThemesProvider>
  )
}
