import { redirect } from 'next/navigation';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FinanceFlow',
  description: 'Personal finance dashboard to track and manage your money.',
};

export default function Page() {
  redirect('/dashboard');
  return null;
}
