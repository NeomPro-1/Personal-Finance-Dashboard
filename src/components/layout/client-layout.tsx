
"use client"

import * as React from 'react';
import { SidebarProvider, Sidebar, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { SidebarContent } from '@/components/layout/sidebar-content';
import { ThemeProvider } from '@/components/theme-provider';
import { ThemeToggle } from '@/components/theme-toggle';

export function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider attribute="class" enableSystem>
      <SidebarProvider>
          <Sidebar className="z-20">
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
      </SidebarProvider>
    </ThemeProvider>
  );
}
