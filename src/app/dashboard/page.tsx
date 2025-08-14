
"use client"

import React, { useState, useMemo } from 'react';
import { getQuarter, format } from 'date-fns';
import type { Transaction } from '@/lib/types';
import { SummaryCard } from '@/components/dashboard/summary-card';
import { ArrowUpCircle, ArrowDownCircle } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { IncomeTable } from '@/components/dashboard/income-table';
import { ExpensesTable } from '@/components/dashboard/expenses-table';
import { QuarterlySummary } from '@/components/dashboard/quarterly-summary';
import { formatCurrency } from '@/lib/utils';
import { initialTransactions } from '@/lib/data';
import useLocalStorage from '@/hooks/use-local-storage';

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


export default function DashboardPage() {
  const [transactions, setTransactions] = useLocalStorage<Transaction[]>('transactions', initialTransactions);
  const [filter, setFilter] = useState<string>('all'); // 'all', 'q1', 'q2', 'q3', 'q4', 'yyyy-MM'
  
  const handleAddTransaction = (transaction: Omit<Transaction, 'id'>) => {
    const newTransaction = { ...transaction, id: crypto.randomUUID() };
    setTransactions([...transactions, newTransaction]);
  };

  const handleDeleteTransaction = (id: string) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  const filteredTransactions = useMemo(() => {
    if (filter === 'all') return transactions;
    if (filter.startsWith('q')) {
      const quarter = parseInt(filter.slice(1), 10);
      return transactions.filter(t => getQuarter(new Date(t.date)) === quarter);
    }
    return transactions.filter(t => format(new Date(t.date), 'yyyy-MM') === filter);
  }, [transactions, filter]);
  
  const incomeTransactions = useMemo(() => filteredTransactions.filter(t => t.type === 'income'), [filteredTransactions]);
  const expenseTransactions = useMemo(() => filteredTransactions.filter(t => t.type === 'expense'), [filteredTransactions]);

  const { income, expenses, net } = useMemo(() => {
    return filteredTransactions.reduce(
      (acc, t) => {
        if (t.type === 'income') acc.income += t.amount;
        else acc.expenses += t.amount;
        acc.net = acc.income - acc.expenses;
        return acc;
      },
      { income: 0, expenses: 0, net: 0 }
    );
  }, [filteredTransactions]);
  
  const monthOptions = useMemo(() => {
    const options: { label: string, value: string }[] = [];
    
    // Always show the current year's months, even if there are no transactions
    const currentYear = new Date().getFullYear();

    for (let i = 0; i < 12; i++) {
        const date = new Date(currentYear, i, 1);
        options.push({
            label: format(date, 'MMMM'),
            value: format(date, 'yyyy-MM')
        });
    }

    return options.sort((a,b) => new Date(a.value).getMonth() - new Date(b.value).getMonth());
    
  }, []);

  return (
    <main className="p-4 sm:p-6 lg:p-8 space-y-8 bg-background text-foreground">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Personal Finance Dashboard</h1>
        <div className="flex items-center gap-2 w-full sm:w-auto">
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                {monthOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
                <SelectItem value="q1">Q1</SelectItem>
                <SelectItem value="q2">Q2</SelectItem>
                <SelectItem value="q3">Q3</SelectItem>
                <SelectItem value="q4">Q4</SelectItem>
              </SelectContent>
            </Select>
        </div>
      </div>
      
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <SummaryCard title="Total Income" value={formatCurrency(income)} icon={ArrowUpCircle} />
        <SummaryCard title="Total Expenses" value={formatCurrency(expenses)} icon={ArrowDownCircle} />
        <SummaryCard title="Net Balance" value={formatCurrency(net)} icon={RupeeIcon} />
      </div>

      <QuarterlySummary transactions={transactions} />

      <div className="grid gap-8 grid-cols-1 lg:grid-cols-2">
        <IncomeTable 
          transactions={incomeTransactions} 
          onAddTransaction={handleAddTransaction}
          onDeleteTransaction={handleDeleteTransaction} 
        />
        <ExpensesTable 
          transactions={expenseTransactions} 
          onAddTransaction={handleAddTransaction} 
          onDeleteTransaction={handleDeleteTransaction}
        />
      </div>
    </main>
  );
}
