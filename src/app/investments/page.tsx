
"use client"

import React, { useState, useEffect } from 'react';
import { InvestmentsTable } from '@/components/investments/investments-table';
import { initialInvestments } from '@/lib/data';
import type { Investment } from '@/lib/types';

const INVESTMENTS_STORAGE_KEY = 'investments';

export default function InvestmentsPage() {
  const [investments, setInvestments] = useState<Investment[]>([]);

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
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(INVESTMENTS_STORAGE_KEY, JSON.stringify(investments));
    } catch (error) {
      console.error("Failed to save investments to localStorage", error);
    }
  }, [investments]);

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
