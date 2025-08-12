"use client"

import * as React from "react"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { format, parseISO } from 'date-fns';

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import type { Transaction } from "@/lib/types"
import { formatCurrency } from "@/lib/utils";

interface MonthlyIncomeChartProps {
    transactions: Transaction[];
}

export function MonthlyIncomeChart({ transactions }: MonthlyIncomeChartProps) {
  const chartData = React.useMemo(() => {
    const monthlyIncome: Record<string, number> = {};

    transactions.forEach(t => {
      if (t.type === 'income') {
        const month = format(parseISO(t.date), 'MMM');
        if (!monthlyIncome[month]) {
          monthlyIncome[month] = 0;
        }
        monthlyIncome[month] += t.amount;
      }
    });

    const monthOrder = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    return monthOrder.map(month => ({
      month,
      income: monthlyIncome[month] || 0
    })).filter(d => d.income > 0);

  }, [transactions]);
  
  const chartConfig = {
    income: {
      label: "Income",
      color: "hsl(var(--chart-2))",
    },
  }

  if (chartData.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-muted-foreground">
        No income data available for this period.
      </div>
    );
  }

  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
        />
        <YAxis
          tickFormatter={(value) => `$${value / 1000}k`}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent 
            formatter={(value) => formatCurrency(value as number)}
          />}
        />
        <Bar
          dataKey="income"
          fill="var(--color-income)"
          radius={4}
        />
      </BarChart>
    </ChartContainer>
  )
}
