
import React from 'react';
import ProvidersWrapperClient from './providers-wrapper-client'; // Import the client-only wrapper

export default function ProvidersWrapperServer({ children }: { children: React.ReactNode }) {
  return <ProvidersWrapperClient>{children}</ProvidersWrapperClient>;
}
