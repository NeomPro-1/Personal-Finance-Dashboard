
"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowUpCircle, ArrowDownCircle } from 'lucide-react';
import { cn, formatCurrency } from '@/lib/utils';

interface QuarterlySummaryCardProps {
  title: string;
  months: string;
  income: number;
  expenses: number;
  net: number;
  isChecked: boolean;
  onCheckedChange: (isChecked: boolean) => void;
}

const RupeeIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M6 3h12" />
      <path d="M6 8h12" />
      <path d="m19 13-10 4" />
      <path d="M9 13c-2.5 0-4.5 2-4.5 4.5S6.5 22 9 22s4.5-2 4.5-4.5" />
    </svg>
  );

export function QuarterlySummaryCard({
  title,
  months,
  income,
  expenses,
  net,
  isChecked,
  onCheckedChange,
}: QuarterlySummaryCardProps) {

  const handleCardClick = () => {
    onCheckedChange(!isChecked);
  }

  return (
    <Card
      className={cn('bg-card/50 border-border/50 cursor-pointer transition-all', isChecked && 'bg-card/75 border-primary/50')}
      onClick={handleCardClick}
    >
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Checkbox
              id={`quarter-${title}`}
              checked={isChecked}
              onCheckedChange={onCheckedChange}
              className="h-5 w-5"
            />
            <div>
              <CardTitle className={cn("text-lg font-semibold", isChecked && 'text-muted-foreground')}>
                {title}
              </CardTitle>
              <CardDescription className={cn("text-xs text-muted-foreground", isChecked && 'line-through')}>
                {months}
              </CardDescription>
            </div>
          </div>
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
            <RupeeIcon className="h-5 w-5" />
            <span>Net Balance</span>
          </div>
          <span className="font-bold">{formatCurrency(net)}</span>
        </div>
      </CardContent>
    </Card>
  );
}
