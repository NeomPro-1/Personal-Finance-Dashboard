"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { DollarSign, ArrowUpCircle, ArrowDownCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface QuarterlySummaryCardProps {
  title: string;
  income: number;
  expenses: number;
  net: number;
}

export function QuarterlySummaryCard({
  title,
  income,
  expenses,
  net,
}: QuarterlySummaryCardProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <Card className={cn('bg-card/50 border-border/50')}>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-muted-foreground">
            <ArrowUpCircle className="h-5 w-5 text-green-500" />
            <span>Income</span>
          </div>
          <span className="font-bold">{formatCurrency(income)}</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-muted-foreground">
            <ArrowDownCircle className="h-5 w-5 text-red-500" />
            <span>Expenses</span>
          </div>
          <span className="font-bold">{formatCurrency(expenses)}</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-muted-foreground">
            <DollarSign className="h-5 w-5" />
            <span>Net Balance</span>
          </div>
          <span className="font-bold">{formatCurrency(net)}</span>
        </div>
      </CardContent>
    </Card>
  );
}
