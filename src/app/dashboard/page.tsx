"use client"

import React, { useState, useMemo } from 'react';
import { subMonths, format } from 'date-fns';
import type { Transaction } from '@/lib/types';
import { SummaryCard } from '@/components/dashboard/summary-card';
import { DollarSign, ArrowUpCircle, ArrowDownCircle } from 'lucide-react';
import { ExpenseChart } from '@/components/dashboard/expense-chart';
import { TransactionsTable } from '@/components/dashboard/transactions-table';
import { AITools } from '@/components/dashboard/ai-tools';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const initialTransactions: Transaction[] = [
  { id: '1', date: format(subMonths(new Date(), 2), 'yyyy-MM-dd'), description: 'Salary', amount: 5000, type: 'income', category: 'Salary' },
  { id: '2', date: format(subMonths(new Date(), 2), 'yyyy-MM-dd'), description: 'Groceries', amount: 250, type: 'expense', category: 'Groceries' },
  { id: '3', date: format(subMonths(new Date(), 2), 'yyyy-MM-dd'), description: 'Rent', amount: 1500, type: 'expense', category: 'Rent/Mortgage' },
  { id: '4', date: format(subMonths(new Date(), 1), 'yyyy-MM-dd'), description: 'Salary', amount: 5000, type: 'income', category: 'Salary' },
  { id: '5', date: format(subMonths(new Date(), 1), 'yyyy-MM-dd'), description: 'Internet Bill', amount: 60, type: 'expense', category: 'Utilities' },
  { id: '6', date: format(subMonths(new Date(), 1), 'yyyy-MM-dd'), description: 'Dinner with friends', amount: 120, type: 'expense', category: 'Dining Out' },
  { id: '7', date: format(new Date(), 'yyyy-MM-dd'), description: 'Freelance Project', amount: 750, type: 'income', category: 'Freelance' },
  { id: '8', date: format(new Date(), 'yyyy-MM-dd'), description: 'Gas', amount: 50, type: 'expense', category: 'Transportation' },
];

export default function DashboardPage() {
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
  const [selectedMonth, setSelectedMonth] = useState<string>(format(new Date(), 'yyyy-MM'));

  const handleAddTransaction = (transaction: Omit<Transaction, 'id'>) => {
    const newTransaction = { ...transaction, id: crypto.randomUUID() };
    setTransactions(prev => [...prev, newTransaction]);
  };

  const filteredTransactions = useMemo(() => {
    if (selectedMonth === 'all') return transactions;
    return transactions.filter(t => format(new Date(t.date), 'yyyy-MM') === selectedMonth);
  }, [transactions, selectedMonth]);

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
    <main className="p-4 sm:p-6 lg:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <div className="flex items-center gap-2">
            <Select value={selectedMonth} onValueChange={setSelectedMonth}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by month" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Months</SelectItem>
                {monthOptions.map(month => (
                  <SelectItem key={month} value={month}>
                    {format(new Date(month), 'MMMM yyyy')}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
        </div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <SummaryCard title="Total Income" value={formatCurrency(income)} icon={ArrowUpCircle} className="border-green-500/50" />
        <SummaryCard title="Total Expenses" value={formatCurrency(expenses)} icon={ArrowDownCircle} className="border-red-500/50" />
        <SummaryCard title="Net Savings" value={formatCurrency(net)} icon={DollarSign} className={net >= 0 ? 'border-blue-500/50' : 'border-orange-500/50'} />
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <ExpenseChart data={filteredTransactions} />
        </div>
        <div className="lg:col-span-2">
          <AITools transactions={transactions} />
        </div>
      </div>

      <div>
        <TransactionsTable transactions={filteredTransactions} onAddTransaction={handleAddTransaction} />
      </div>
    </main>
  );
}
