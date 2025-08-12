"use client"

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MonthlyExpensesChart } from '@/components/analysis/monthly-expenses-chart';
import { NetWorthCalculator } from '@/components/analysis/net-worth-calculator';
import { initialTransactions } from '@/lib/data';

export default function AnalysisPage() {
  const [transactions] = useState(initialTransactions);

  return (
    <main className="p-4 sm:p-6 lg:p-8 space-y-8 bg-background text-foreground">
      <h1 className="text-3xl font-bold tracking-tight">Analysis</h1>

      <NetWorthCalculator />
      
      <Card>
        <CardHeader>
          <CardTitle>Monthly Expenses</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <MonthlyExpensesChart transactions={transactions} />
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
