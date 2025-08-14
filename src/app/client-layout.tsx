'use client';

import { AppProviders } from '@/components/layout/app-providers';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return <AppProviders>{children}</AppProviders>;
}
