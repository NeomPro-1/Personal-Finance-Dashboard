
"use client"

import React, { useState, useMemo, useEffect } from 'react';
import { subMonths, format, getQuarter, getYear } from 'date-fns';
import type { Transaction } from '@/lib/types';
import { SummaryCard } from '@/components/dashboard/summary-card';
import { DollarSign, ArrowUpCircle, ArrowDownCircle } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { IncomeTable } from '@/components/dashboard/income-table';
import { ExpensesTable } from '@/components/dashboard/expenses-table';
import { QuarterlySummary } from '@/components/dashboard/quarterly-summary';
import { initialTransactions } from '@/lib/data';
import { formatCurrency } from '@/lib/utils';
import { LoadingSkeleton } from '@/components/layout/loading-skeleton';

const TRANSACTIONS_STORAGE_KEY = 'transactions';

export default function DashboardPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filter, setFilter] = useState<string>('all'); // 'all', 'q1', 'q2', 'q3', 'q4', 'yyyy-MM'
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
  
    const loadData = () => {
      try {
        const storedTransactions = localStorage.getItem(TRANSACTIONS_STORAGE_KEY);
        if (storedTransactions) {
          setTransactions(JSON.parse(storedTransactions));
        } else {
          setTransactions(initialTransactions);
        }
      } catch (error) {
        console.error("Failed to load transactions from localStorage", error);
        setTransactions(initialTransactions);
      } finally {
        // Delay to show loading indicator for at least 500ms
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      }
    };
  
    loadData();
  }, []);
  

  useEffect(() => {
    if (!isLoading) {
      try {
        localStorage.setItem(TRANSACTIONS_STORAGE_KEY, JSON.stringify(transactions));
      } catch (error) {
        console.error("Failed to save transactions to localStorage", error);
      }
    }
  }, [transactions, isLoading]);


  const handleAddTransaction = (transaction: Omit<Transaction, 'id'>) => {
    const newTransaction = { ...transaction, id: crypto.randomUUID() };
    setTransactions(prev => [...prev, newTransaction]);
  };

  const handleDeleteTransaction = (id: string) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
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
    const transactionYears = Array.from(new Set(transactions.map(t => getYear(new Date(t.date)))))
                                  .filter(year => year <= new Date().getFullYear());

    const yearsToDisplay = transactionYears.length > 0 ? transactionYears : [new Date().getFullYear()];
    yearsToDisplay.sort((a,b) => b-a);
    
    const currentYear = new Date().getFullYear();

    yearsToDisplay.forEach(year => {
        for (let i = 11; i >= 0; i--) {
            const date = new Date(year, i, 1);
            options.push({
                label: format(date, 'MMMM'),
                value: format(date, 'yyyy-MM')
            });
        }
    });

    const uniqueOptions = options.filter((option, index, self) =>
        index === self.findIndex((o) => (
            format(new Date(o.value), 'MMMM') === format(new Date(option.value), 'MMMM')
        ))
    );

    return uniqueOptions;
  }, [transactions]);

  if (isLoading) {
    return <LoadingSkeleton />;
  }


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
        <SummaryCard title="Net Balance" value={formatCurrency(net)} icon={DollarSign} />
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
