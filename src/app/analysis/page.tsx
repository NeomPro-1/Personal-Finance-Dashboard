"use client"

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { NetWorthCalculator } from '@/components/analysis/net-worth-calculator';
import { initialTransactions } from '@/lib/data';
import { IncomeExpenseChart } from '@/components/analysis/income-expense-chart';

export default function AnalysisPage() {
  const [transactions] = useState(initialTransactions);

  return (
    <main className="p-4 sm:p-6 lg:p-8 space-y-8 bg-background text-foreground">
      <h1 className="text-3xl font-bold tracking-tight">Financial Analysis</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <div className="lg:col-span-2">
          <NetWorthCalculator />
        </div>
        <div className="lg:col-span-2">
            <Card>
            <CardHeader>
                <CardTitle>Income vs. Expenses</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="h-[400px] w-full">
                <IncomeExpenseChart transactions={transactions} />
                </div>
            </CardContent>
            </Card>
        </div>
      </div>
    </main>
  );
}
