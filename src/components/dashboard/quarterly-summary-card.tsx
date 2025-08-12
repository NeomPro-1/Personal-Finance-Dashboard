"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { DollarSign, ArrowUpCircle, ArrowDownCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface QuarterlySummaryCardProps {
  title: string;
  income: number;
  expenses: number;
  net: number;
  isChecked: boolean;
  onCheckedChange: (isChecked: boolean) => void;
}

export function QuarterlySummaryCard({
  title,
  income,
  expenses,
  net,
  isChecked,
  onCheckedChange,
}: QuarterlySummaryCardProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const handleCardClick = () => {
    onCheckedChange(!isChecked);
  }

  return (
    <Card
      className={cn('bg-card/50 border-border/50 cursor-pointer transition-all', isChecked && 'bg-card/75 border-primary/50')}
      onClick={handleCardClick}
    >
      <CardHeader>
        <div className="flex items-center gap-3">
          <Checkbox
            id={`quarter-${title}`}
            checked={isChecked}
            onCheckedChange={onCheckedChange}
            className="h-5 w-5"
          />
          <CardTitle className={cn("text-lg font-semibold", isChecked && 'line-through text-muted-foreground')}>
            {title}
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className={cn("space-y-4", isChecked && 'opacity-50')}>
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
