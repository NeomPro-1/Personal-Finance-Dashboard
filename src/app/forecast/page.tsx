'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FinancialForecastChart } from '@/components/analysis/financial-forecast-chart';
import { NetWorthCalculator } from '@/components/analysis/net-worth-calculator';
import type { Transaction } from '@/lib/types';
import { initialTransactions } from '@/lib/data';
import useLocalStorage from '@/hooks/use-local-storage';
import { LoadingSkeleton } from '@/components/layout/loading-skeleton';

export default function ForecastPage() {
  const [transactions, , isReady] = useLocalStorage<Transaction[]>('transactions', initialTransactions);

  if (!isReady) {
    return <LoadingSkeleton />;
  }

  return (
    <main className="p-4 sm:p-6 lg:p-8 space-y-8 bg-background text-foreground">
      <h1 className="text-3xl font-bold tracking-tight">Forecast &amp; Tools</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Column 1: Financial Forecast */}
        <Card>
          <CardHeader>
            <CardTitle>Financial Forecast Report</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="w-full">
              <FinancialForecastChart transactions={transactions} />
            </div>
          </CardContent>
        </Card>

        {/* Column 2: Net Worth Calculator */}
        <div>
          <NetWorthCalculator />
        </div>
      </div>
    </main>
  );
}
