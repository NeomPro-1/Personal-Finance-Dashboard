import type { Metadata } from 'next';
import React from 'react';
import ProvidersWrapperServer from './providers-wrapper-server';
import './globals.css';

export const metadata: Metadata = {
  title: 'FinanceFlow',
  description: 'Personal finance dashboard to track and manage your money.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased">
        <ProvidersWrapperServer>{children}</ProvidersWrapperServer>
      </body>
    </html>
  );
}