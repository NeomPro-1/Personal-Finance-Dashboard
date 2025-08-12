"use client"

import * as React from "react"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { format, parseISO } from 'date-fns';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import type { Transaction } from "@/lib/types"

interface MonthlyExpensesChartProps {
    transactions: Transaction[];
}

export function MonthlyExpensesChart({ transactions }: MonthlyExpensesChartProps) {
  const chartData = React.useMemo(() => {
    const monthlyExpenses: Record<string, number> = {};

    transactions.forEach(t => {
      if (t.type === 'expense') {
        const month = format(parseISO(t.date), 'MMM');
        if (!monthlyExpenses[month]) {
          monthlyExpenses[month] = 0;
        }
        monthlyExpenses[month] += t.amount;
      }
    });

    const monthOrder = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    return monthOrder.map(month => ({
      month,
      expenses: monthlyExpenses[month] || 0
    }));

  }, [transactions]);
  
  const chartConfig = {
    expenses: {
      label: "Expenses",
      color: "hsl(var(--primary))",
    },
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
            formatter={(value) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value as number)}
          />}
        />
        <Bar
          dataKey="expenses"
          fill="var(--color-expenses)"
          radius={4}
        />
      </BarChart>
    </ChartContainer>
  )
}
