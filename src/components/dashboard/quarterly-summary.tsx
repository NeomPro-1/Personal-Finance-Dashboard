'use client';

import React, { useMemo, useState } from 'react';
import { getQuarter, getYear, format } from 'date-fns';
import type { Transaction } from '@/lib/types';
import { QuarterlySummaryCard } from './quarterly-summary-card';

interface QuarterlySummaryProps {
  transactions: Transaction[];
}

const quarterMonthsMap: Record<string, string> = {
  "Q1": "January, February, March",
  "Q2": "April, May, June",
  "Q3": "July, August, September",
  "Q4": "October, November, December"
};

export function QuarterlySummary({ transactions }: QuarterlySummaryProps) {
  const [checkedQuarters, setCheckedQuarters] = useState<Record<string, boolean>>({});

  const handleCheckedChange = (quarter: string, isChecked: boolean) => {
    setCheckedQuarters(prev => ({...prev, [quarter]: isChecked}));
  }

  const quarterlyData = useMemo(() => {
    const dataByYearAndQuarter: Record<string, Record<string, { income: number; expenses: number; net: number }>> = {};
    const currentYear = getYear(new Date());

    const filteredTransactions = transactions.filter(t => getYear(new Date(t.date)) <= currentYear);

    const transactionYears = Array.from(new Set(filteredTransactions.map(t => getYear(new Date(t.date)))));
    
    if (transactionYears.length === 0) {
      transactionYears.push(currentYear);
    }

    transactionYears.forEach(year => {
        dataByYearAndQuarter[year] = {
            1: { income: 0, expenses: 0, net: 0 },
            2: { income: 0, expenses: 0, net: 0 },
            3: { income: 0, expenses: 0, net: 0 },
            4: { income: 0, expenses: 0, net: 0 },
        };
    });


    filteredTransactions.forEach((t) => {
      const date = new Date(t.date);
      const year = getYear(date);
      const quarter = getQuarter(date);
      
      const quarterData = dataByYearAndQuarter[year]?.[quarter];
      if (!quarterData) return;

      if (t.type === 'income') {
        quarterData.income += t.amount;
      } else {
        quarterData.expenses += t.amount;
      }
      quarterData.net = quarterData.income - quarterData.expenses;
    });

    return Object.entries(dataByYearAndQuarter)
      .sort(([yearA], [yearB]) => parseInt(yearB, 10) - parseInt(yearA, 10))
      .flatMap(([year, quarters]) =>
        Object.entries(quarters)
        .map(([q, data]) => ({
          id: `${year}-Q${q}`,
          title: `Q${q} ${year}`,
          months: quarterMonthsMap[`Q${q}`],
          ...data,
        }))
      );
  }, [transactions]);


  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Quarterly Summary</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {quarterlyData.map((data) => (
          <QuarterlySummaryCard
            key={data.id}
            title={data.title}
            months={data.months}
            income={data.income}
            expenses={data.expenses}
            net={data.net}
            isChecked={!!checkedQuarters[data.id]}
            onCheckedChange={(isChecked) => handleCheckedChange(data.id, isChecked)}
          />
        ))}
      </div>
    </div>
  );
}
