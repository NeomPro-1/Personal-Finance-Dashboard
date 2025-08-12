"use client"

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MonthlyExpensesChart } from '@/components/analysis/monthly-expenses-chart';
import { MonthlyIncomeChart } from '@/components/analysis/monthly-income-chart';
import { NetWorthCalculator } from '@/components/analysis/net-worth-calculator';
import { initialTransactions } from '@/lib/data';

export default function AnalysisPage() {
  const [transactions] = useState(initialTransactions);

  return (
    <main className="p-4 sm:p-6 lg:p-8 space-y-8 bg-background text-foreground">
      <h1 className="text-3xl font-bold tracking-tight">Financial Analysis</h1>
      <div className="space-y-8">
        <NetWorthCalculator />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Income</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] w-full">
                <MonthlyIncomeChart transactions={transactions} />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Monthly Expenses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] w-full">
                <MonthlyExpensesChart transactions={transactions} />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
