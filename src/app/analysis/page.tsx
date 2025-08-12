
"use client"

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { initialTransactions } from '@/lib/data';
import { FinancialForecastChart } from '@/components/analysis/financial-forecast-chart';

export default function AnalysisPage() {
  const [transactions] = useState(initialTransactions);

  return (
    <main className="p-4 sm:p-6 lg:p-8 space-y-8 bg-background text-foreground">
      <h1 className="text-3xl font-bold tracking-tight">Financial Analysis</h1>
      <Card>
          <CardHeader>
            <CardTitle>Financial Forecast Report</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[400px] w-full">
              <FinancialForecastChart transactions={transactions} />
            </div>
          </CardContent>
        </Card>
    </main>
  );
}
