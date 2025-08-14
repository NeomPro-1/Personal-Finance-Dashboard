import type { Metadata } from 'next';
import ProvidersWrapper from './providers-wrapper';
import './globals.css';

export const metadata: Metadata = {
  title: 'FinanceFlow',
  description: 'Personal finance dashboard to track and manage your money.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
      <body className="font-body antialiased">
        <ProvidersWrapper>{children}</ProvidersWrapper>
      </body>
    </html>
  );
}
