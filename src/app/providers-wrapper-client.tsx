"use client";

import React from 'react';
import ClientLayout from './client-layout';

export default function ProvidersWrapperClient({ children }: { children: React.ReactNode }) {
  return <ClientLayout>{children}</ClientLayout>;
}
