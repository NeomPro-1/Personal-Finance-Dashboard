"use client"

import React, { useState, useMemo } from 'react';
import { subMonths, format, getQuarter } from 'date-fns';
import type { Transaction } from '@/lib/types';
import { SummaryCard } from '@/components/dashboard/summary-card';
import { DollarSign, ArrowUpCircle, ArrowDownCircle } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { IncomeTable } from '@/components/dashboard/income-table';
import { ExpensesTable } from '@/components/dashboard/expenses-table';
import { QuarterlySummary } from '@/components/dashboard/quarterly-summary';


const initialTransactions: Transaction[] = [
  { id: '1', date: '2025-01-09', description: 'Acme Inc.', amount: 6500, type: 'income', category: 'Salary' },
  { id: '2', date: '2025-01-09', description: 'Design Agency', amount: 1000, type: 'income', category: 'Freelance' },
  { id: '3', date: '2025-01-09', description: 'Brokerage Account', amount: 500, type: 'income', category: 'Investments' },
  { id: '4', date: '2025-02-02', description: 'Acme Inc.', amount: 5000, type: 'income', category: 'Salary' },
  { id: '5', date: '2025-02-02', description: 'Digital Store', amount: 1000, type: 'income', category: 'Freelance' },
  
  { id: '6', date: '2025-01-15', description: 'Joe\'s Pizza', amount: 25, type: 'expense', category: 'Dining Out' },
  { id: '7', date: '2025-01-15', description: 'Mortgage', amount: 2500, type: 'expense', category: 'Rent/Mortgage' },
  { id: '8', date: '2025-01-15', description: 'Hydro Inc.', amount: 120, type: 'expense', category: 'Utilities' },
  { id: '9', date: '2025-01-15', description: 'Gym Clothes', amount: 200, type: 'expense', category: 'Retail' },
  { id: '10', date: '2025-02-20', description: 'Mortgage', amount: 2500, type: 'expense', category: 'Rent/Mortgage' },
  { id: '11', date: '2025-03-20', description: 'Mortgage', amount: 2500, type: 'expense', category: 'Rent/Mortgage' },
  
  { id: '12', date: '2025-04-10', description: 'Acme Inc.', amount: 6500, type: 'income', category: 'Salary' },
  { id: '13', date: '2025-05-15', description: 'Client Project', amount: 2500, type: 'income', category: 'Freelance' },
  { id: '14', date: '2025-06-05', description: 'Stock Dividend', amount: 300, type: 'income', category: 'Investments' },
  { id: '15', date: '2025-04-18', description: 'Car Insurance', amount: 150, type: 'expense', category: 'Utilities' },
  { id: '16', date: '2025-05-22', description: 'Groceries', amount: 400, type: 'expense', category: 'Groceries' },
  { id: '17', date: '2025-06-25', description: 'Movie Night', amount: 50, type: 'expense', category: 'Entertainment' },
];

export default function DashboardPage() {
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
  const [filter, setFilter] = useState<string>('all'); // 'all', 'q1', 'q2', 'q3', 'q4', 'yyyy-MM'

  const handleAddTransaction = (transaction: Omit<Transaction, 'id'>) => {
    const newTransaction = { ...transaction, id: crypto.randomUUID() };
    setTransactions(prev => [...prev, newTransaction]);
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

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  };
  
  const monthOptions = useMemo(() => {
    const months = new Set(transactions.map(t => format(new Date(t.date), 'yyyy-MM')));
    return Array.from(months).sort().reverse();
  }, [transactions]);


  return (
    <main className="p-4 sm:p-6 lg:p-8 space-y-8 bg-background text-foreground">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Personal Finance Dashboard</h1>
        <div className="flex items-center gap-2">
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="q1">Q1</SelectItem>
                <SelectItem value="q2">Q2</SelectItem>
                <SelectItem value="q3">Q3</SelectItem>
                <SelectItem value="q4">Q4</SelectItem>
                {monthOptions.map(month => (
                  <SelectItem key={month} value={month}>
                    {format(new Date(`${month}-01`), 'MMMM yyyy')}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
        </div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <SummaryCard title="Total Income" value={formatCurrency(income)} icon={ArrowUpCircle} />
        <SummaryCard title="Total Expenses" value={formatCurrency(expenses)} icon={ArrowDownCircle} />
        <SummaryCard title="Net Balance" value={formatCurrency(net)} icon={DollarSign} />
      </div>

      <QuarterlySummary transactions={transactions} />

      <div className="grid gap-8 lg:grid-cols-2">
        <IncomeTable transactions={incomeTransactions} onAddTransaction={handleAddTransaction} />
        <ExpensesTable transactions={expenseTransactions} onAddTransaction={handleAddTransaction} />
      </div>
    </main>
  );
}
