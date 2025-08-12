"use client"

import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { formatCurrency } from '@/lib/utils';
import type { Investment } from '@/lib/types';

interface FinancialForecastChartProps {
  investments: Investment[];
}

export function FinancialForecastChart({ investments }: FinancialForecastChartProps) {
  const forecastData = useMemo(() => {
    // This is a simplified forecast model. A real app would use a more sophisticated algorithm.
    const totalInitial = investments.reduce((acc, inv) => acc + inv.initialValue, 0);
    const totalCurrent = investments.reduce((acc, inv) => acc + inv.currentValue, 0);
    const avgGrowthRate = totalInitial > 0 ? (totalCurrent - totalInitial) / totalInitial : 0;

    const data = [];
    let futureValue = totalCurrent;
    let income = 5500; // Mock monthly income
    let expenses = 2200; // Mock monthly expenses

    for (let i = 1; i <= 12; i++) {
      const savings = income - expenses;
      futureValue = futureValue * (1 + avgGrowthRate / 12) + savings;
      
      data.push({
        month: `Month ${i}`,
        income: income,
        expenses: expenses,
        savings: savings,
        projectedValue: futureValue
      });
      
      // Slightly increase income and expenses for variety in the chart
      income *= 1.002;
      expenses *= 1.005;
    }
    return data;
  }, [investments]);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={forecastData}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis tickFormatter={(value) => formatCurrency(value)} />
        <Tooltip formatter={(value: number) => formatCurrency(value)} />
        <Legend />
        <Bar dataKey="income" stackId="a" fill="hsl(var(--chart-2))" />
        <Bar dataKey="expenses" stackId="a" fill="hsl(var(--chart-1))" />
        <Bar dataKey="savings" fill="hsl(var(--chart-3))" />
      </BarChart>
    </ResponsiveContainer>
  );
}
