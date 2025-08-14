
"use client"

import * as React from 'react';
import { usePathname } from 'next/navigation';
import { SidebarProvider, Sidebar, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { SidebarContent } from '@/components/layout/sidebar-content';
import { ThemeToggle } from '@/components/theme-toggle';
import { Skeleton } from '@/components/ui/skeleton';


function FullPageLoading() {
  return (
    <div className="flex h-screen w-screen">
      <div className="hidden md:block md:w-64 bg-muted p-4">
        <div className="flex items-center gap-2 mb-8">
            <Skeleton className="w-8 h-8 rounded-full" />
            <Skeleton className="h-6 w-32" />
        </div>
        <div className="space-y-4">
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
        </div>
      </div>
      <div className="flex-1 flex flex-col">
        <header className="sticky top-0 z-10 flex h-14 items-center justify-between gap-4 border-b bg-background px-4 py-2 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6 md:hidden">
            <Skeleton className="h-8 w-8" />
            <Skeleton className="h-8 w-8 rounded-full" />
        </header>
        <main className="p-4 sm:p-6 lg:p-8 relative">
           <Skeleton className="h-[calc(100vh-10rem)] w-full" />
            <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm">
                <p className="text-lg font-semibold animate-pulse">Loading...</p>
            </div>
        </main>
      </div>
    </div>
  );
}


export function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isMounted, setIsMounted] = React.useState(false);
  const pathname = usePathname();

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  // The useLocalStorage hook introduces a delay, which we can use to show a loading state.
  // We'll track the 'previousPathname' to determine if a navigation is occurring.
  const [isNavigating, setIsNavigating] = React.useState(false);
  const previousPathname = React.useRef(pathname);

  React.useEffect(() => {
    if (previousPathname.current !== pathname) {
      setIsNavigating(true);
      const timer = setTimeout(() => {
        setIsNavigating(false);
        previousPathname.current = pathname;
      }, 1000); // This duration should match the delay in useLocalStorage
      return () => clearTimeout(timer);
    } else {
        // Handle the initial load case
        const timer = setTimeout(() => setIsNavigating(false), 1000);
        return () => clearTimeout(timer);
    }
  }, [pathname]);

  const showLoader = !isMounted || isNavigating;

  if (showLoader && pathname !== previousPathname.current) {
    return <FullPageLoading />;
  }

  return (
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
            {showLoader ? <FullPageLoading/> : children}
          </SidebarInset>
        </div>
    </SidebarProvider>
  );
}
