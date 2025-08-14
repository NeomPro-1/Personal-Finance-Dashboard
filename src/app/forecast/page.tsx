
"use client"

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FinancialForecastChart } from '@/components/analysis/financial-forecast-chart';
import { NetWorthCalculator } from '@/components/analysis/net-worth-calculator';
import type { Transaction } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';
import { initialTransactions } from '@/lib/data';
import useLocalStorage from '@/hooks/use-local-storage';

function ForecastLoading() {
    return (
    <main className="p-4 sm:p-6 lg:p-8 space-y-8 animate-slide-up-and-fade-in">
      <Skeleton className="h-9 w-72" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-48" />
          </CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-48" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-[350px] w-full" />
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

export default function ForecastPage() {
  const [transactions, setTransactions] = useLocalStorage<Transaction[]>('transactions', initialTransactions);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);
  

  if (isLoading) {
    return <ForecastLoading />;
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
