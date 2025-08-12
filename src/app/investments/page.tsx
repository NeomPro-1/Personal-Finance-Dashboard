"use client"

import React from 'react';
import { InvestmentsTable } from '@/components/investments/investments-table';
import { FinancialForecastChart } from '@/components/investments/financial-forecast-chart';
import { initialInvestments } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function InvestmentsPage() {
  const [investments, setInvestments] = React.useState(initialInvestments);

  const handleAddInvestment = (investment: Omit<Investment, 'id' | 'currentValue'>) => {
    const newInvestment: Investment = {
      ...investment,
      id: crypto.randomUUID(),
      // Simulate currentValue being slightly different from initial for new investments
      currentValue: investment.initialValue * (1 + (Math.random() - 0.5) * 0.2), 
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
      <Card>
        <CardHeader>
          <CardTitle>Financial Forecast Report</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] w-full">
            <FinancialForecastChart investments={investments} />
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
