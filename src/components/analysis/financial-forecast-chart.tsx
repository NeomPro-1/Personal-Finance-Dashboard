'use client';

import * as React from "react"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { format, parseISO, startOfMonth, addMonths } from 'date-fns';

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart"
import type { Transaction } from "@/lib/types"
import { formatCurrency } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

interface FinancialForecastChartProps {
    transactions: Transaction[];
}

export function FinancialForecastChart({ transactions }: FinancialForecastChartProps) {
  const isMobile = useIsMobile();
  const chartData = React.useMemo(() => {
    const monthlyData: Record<string, { income: number; expenses: number; month: string }> = {};

    transactions.forEach(t => {
      const monthKey = format(startOfMonth(parseISO(t.date)), 'yyyy-MM');
      if (!monthlyData[monthKey]) {
        monthlyData[monthKey] = { income: 0, expenses: 0, month: format(startOfMonth(parseISO(t.date)), 'MMM yyyy') };
      }
      if (t.type === 'income') {
        monthlyData[monthKey].income += t.amount;
      } else {
        monthlyData[monthKey].expenses += t.amount;
      }
    });
    
    const sortedMonths = Object.values(monthlyData).sort((a,b) => new Date(a.month).getTime() - new Date(b.month).getTime());

    const averageIncome = sortedMonths.length > 0 ? sortedMonths.reduce((acc, d) => acc + d.income, 0) / sortedMonths.length : 0;
    const averageExpenses = sortedMonths.length > 0 ? sortedMonths.reduce((acc, d) => acc + d.expenses, 0) / sortedMonths.length : 0;
    
    const lastMonth = sortedMonths.length > 0 ? new Date(sortedMonths[sortedMonths.length - 1].month) : new Date();

    const forecastMonths = Array.from({length: 6}).map((_, i) => {
        const nextMonthDate = addMonths(lastMonth, i + 1);
        return {
            month: format(nextMonthDate, 'MMM yyyy'),
            income: averageIncome,
            expenses: averageExpenses,
            savings: averageIncome - averageExpenses,
        }
    });
    
    const historicalData = sortedMonths.map(d => ({...d, savings: d.income - d.expenses}));

    const fullData = [...historicalData, ...forecastMonths];
    
    if(isMobile && fullData.length > 6) {
      return fullData.slice(fullData.length - 6);
    }
    
    return fullData;

  }, [transactions, isMobile]);

  const chartConfig = {
    income: {
      label: "Income",
      color: "hsl(var(--chart-2))",
    },
    expenses: {
      label: "Expenses",
      color: "hsl(var(--chart-1))",
    },
     savings: {
      label: "Savings",
      color: "hsl(var(--chart-3))",
    }
  }

  if (chartData.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-muted-foreground">
        No data available for this period.
      </div>
    );
  }

  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full h-[350px]">
      <BarChart
        accessibilityLayer
        data={chartData}
        margin={{
          left: 12,
          right: 12,
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) => isMobile ? value.substring(0, 3) : value}
        />
        <YAxis
          tickFormatter={(value) => isMobile
              ? `${(value as number / 1000).toLocaleString()}k`
              : formatCurrency(value as number)}
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          width={isMobile ? 30 : 80}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent
            formatter={(value, name) => (
                <div className="flex flex-col">
                    <span className="capitalize">{name}</span>
                    <span>{formatCurrency(value as number)}</span>
                </div>
            )}
          />}
        />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="income" fill="var(--color-income)" radius={4} />
        <Bar dataKey="expenses" fill="var(--color-expenses)" radius={4} />
        <Bar dataKey="savings" fill="var(--color-savings)" radius={4} />
      </BarChart>
    </ChartContainer>
  )
}
