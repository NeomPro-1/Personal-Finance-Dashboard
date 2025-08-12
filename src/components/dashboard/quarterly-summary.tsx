"use client";

import React, { useMemo, useState } from 'react';
import { getQuarter } from 'date-fns';
import type { Transaction } from '@/lib/types';
import { QuarterlySummaryCard } from './quarterly-summary-card';

interface QuarterlySummaryProps {
  transactions: Transaction[];
}

export function QuarterlySummary({ transactions }: QuarterlySummaryProps) {
  const [checkedQuarters, setCheckedQuarters] = useState<Record<string, boolean>>({});

  const handleCheckedChange = (quarter: string, isChecked: boolean) => {
    setCheckedQuarters(prev => ({...prev, [quarter]: isChecked}));
  }

  const quarterlyData = useMemo(() => {
    const quarters = {
      1: { income: 0, expenses: 0, net: 0 },
      2: { income: 0, expenses: 0, net: 0 },
      3: { income: 0, expenses: 0, net: 0 },
      4: { income: 0, expenses: 0, net: 0 },
    };

    transactions.forEach((t) => {
      const quarter = getQuarter(new Date(t.date)) as keyof typeof quarters;
      if (t.type === 'income') {
        quarters[quarter].income += t.amount;
      } else {
        quarters[quarter].expenses += t.amount;
      }
      quarters[quarter].net = quarters[quarter].income - quarters[quarter].expenses;
    });

    return Object.entries(quarters).map(([q, data]) => ({
      quarter: `Q${q}`,
      ...data,
    }));
  }, [transactions]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Quarterly Summary</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {quarterlyData.map((data) => (
          <QuarterlySummaryCard
            key={data.quarter}
            title={data.quarter}
            income={data.income}
            expenses={data.expenses}
            net={data.net}
            isChecked={!!checkedQuarters[data.quarter]}
            onCheckedChange={(isChecked) => handleCheckedChange(data.quarter, isChecked)}
          />
        ))}
      </div>
    </div>
  );
}
