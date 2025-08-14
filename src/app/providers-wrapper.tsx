import React from 'react';
import ClientLayout from './client-layout';

export default function ProvidersWrapper({ children }: { children: React.ReactNode }) {
  return <ClientLayout>{children}</ClientLayout>;
}
