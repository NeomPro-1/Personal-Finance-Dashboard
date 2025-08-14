import React from 'react';
import ProvidersWrapperClient from './providers-wrapper-client';

export default function ProvidersWrapperServer({ children }: { children: React.ReactNode }) {
  return <ProvidersWrapperClient>{children}</ProvidersWrapperClient>;
}
