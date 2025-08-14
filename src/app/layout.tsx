
import type { Metadata } from 'next';
import React from 'react';
import ProvidersWrapperServer from './providers-wrapper-server'; // Server wrapper
import './globals.css';

export const metadata: Metadata = {
  title: 'FinanceFlow',
  description: 'Personal finance dashboard to track and manage your money.',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ProvidersWrapperServer>{children}</ProvidersWrapperServer>
      </body>
    </html>
  );
}
