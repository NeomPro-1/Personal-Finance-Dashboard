
"use client"

import React, { useState, useEffect } from 'react';
import { InvestmentsTable } from '@/components/investments/investments-table';
import { initialInvestments } from '@/lib/data';
import type { Investment } from '@/lib/types';

const INVESTMENTS_STORAGE_KEY = 'investments';

export default function InvestmentsPage() {
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const storedInvestments = localStorage.getItem(INVESTMENTS_STORAGE_KEY);
      if (storedInvestments) {
        setInvestments(JSON.parse(storedInvestments));
      } else {
        setInvestments(initialInvestments);
      }
    } catch (error) {
      console.error("Failed to load investments from localStorage", error);
      setInvestments(initialInvestments);
    } finally {
        setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!isLoading) {
        try {
          localStorage.setItem(INVESTMENTS_STORAGE_KEY, JSON.stringify(investments));
        } catch (error) {
          console.error("Failed to save investments to localStorage", error);
        }
    }
  }, [investments, isLoading]);

  const handleAddInvestment = (investment: Omit<Investment, 'id' | 'currentValue'>) => {
    const newInvestment: Investment = {
      ...investment,
      id: crypto.randomUUID(),
      currentValue: investment.initialValue, 
    };
    setInvestments(prev => [...prev, newInvestment]);
  };

  const handleDeleteInvestment = (id: string) => {
    setInvestments(prev => prev.filter(inv => inv.id !== id));
  };

  if (isLoading) {
    return (
        <main className="p-4 sm:p-6 lg:p-8 space-y-8 bg-background text-foreground">
            <div className="flex justify-center items-center h-full">
                <p>Loading your investment data...</p>
            </div>
        </main>
    )
  }
  
  return (
    <main className="p-4 sm:p-6 lg:p-8 space-y-8 bg-background text-foreground">
      <h1 className="text-3xl font-bold tracking-tight">Investment Tracker</h1>
      <InvestmentsTable 
        investments={investments} 
        onAddInvestment={handleAddInvestment}
        onDeleteInvestment={handleDeleteInvestment}
      />
    </main>
  );
}
