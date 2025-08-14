
"use client"

import React from 'react';
import { InvestmentsTable } from '@/components/investments/investments-table';
import type { Investment } from '@/lib/types';
import { useIsMobile } from '@/hooks/use-mobile';
import { initialInvestments } from '@/lib/data';
import useLocalStorage from '@/hooks/use-local-storage';


export default function InvestmentsPage() {
  const [investments, setInvestments] = useLocalStorage<Investment[]>('investments', initialInvestments);
  const isMobile = useIsMobile();
  
  const handleAddInvestment = (investment: Omit<Investment, 'id' | 'currentValue'>) => {
    const newInvestment: Investment = {
      ...investment,
      id: crypto.randomUUID(),
      currentValue: investment.initialValue,
    };
    setInvestments([...investments, newInvestment]);
  };

  const handleDeleteInvestment = (id: string) => {
    setInvestments(investments.filter(inv => inv.id !== id));
  };
  
  return (
    <main className="p-4 sm:p-6 lg:p-8 space-y-8 bg-background text-foreground">
        <>
          <h1 className="text-3xl font-bold tracking-tight">Investment Tracker</h1>
          <InvestmentsTable 
            investments={investments} 
            onAddInvestment={handleAddInvestment}
            onDeleteInvestment={handleDeleteInvestment}
            isMobile={isMobile}
          />
        </>
    </main>
  );
}
