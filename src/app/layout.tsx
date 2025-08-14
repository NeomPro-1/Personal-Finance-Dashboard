
"use client"

import * as React from 'react';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { Skeleton } from '@/components/ui/skeleton';
import { ClientLayout } from '@/components/layout/client-layout';


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
            <div className="absolute inset-0 flex items-center justify-center bg-background/50">
                <p className="text-lg font-semibold animate-pulse">Loading...</p>
            </div>
        </main>
      </div>
    </div>
  );
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);


  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="font-body antialiased bg-background text-foreground">
        {!isMounted ? (
          <FullPageLoading />
        ) : (
          <ClientLayout>
            {children}
          </ClientLayout>
        )}
        <Toaster />
      </body>
    </html>
  );
}
