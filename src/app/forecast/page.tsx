
"use client"

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { initialTransactions } from '@/lib/data';
import { FinancialForecastChart } from '@/components/analysis/financial-forecast-chart';
import { NetWorthCalculator } from '@/components/analysis/net-worth-calculator';

export default function ForecastPage() {
  const [transactions] = useState(initialTransactions);

  return (
    <main className="p-4 sm:p-6 lg:p-8 space-y-8 bg-background text-foreground">
      <h1 className="text-3xl font-bold tracking-tight">Forecast &amp; Tools</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Column 1: Financial Forecast */}
        <Card className="lg:col-span-1 order-2 lg:order-1">
          <CardHeader>
            <CardTitle>Financial Forecast Report</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] md:h-[400px] w-full">
              <FinancialForecastChart transactions={transactions} />
            </div>
          </CardContent>
        </Card>
        
        {/* Column 2: Net Worth Calculator */}
        <div className="lg:col-span-1 order-1 lg:order-2">
            <NetWorthCalculator />
        </div>
      </div>
    </main>
  );
}
