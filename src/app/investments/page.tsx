
"use client"

import React, { useState, useEffect } from 'react';
import { InvestmentsTable } from '@/components/investments/investments-table';
import { initialInvestments } from '@/lib/data';
import type { Investment } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const INVESTMENTS_STORAGE_KEY = 'investments';

function InvestmentsLoading() {
  return (
    <main className="p-4 sm:p-6 lg:p-8 space-y-8 animate-fade-in">
      <Skeleton className="h-9 w-64" />
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <Card className="bg-card/50 border-border/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-5 w-5" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-7 w-32" />
          </CardContent>
        </Card>
        <Card className="bg-card/50 border-border/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-5 w-5" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-7 w-32" />
          </CardContent>
        </Card>
        <Card className="bg-card/50 border-border/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-5 w-5" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-7 w-32" />
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <Skeleton className="h-8 w-48" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-[400px] w-full" />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
            <Skeleton className="h-8 w-48" />
        </CardHeader>
        <CardContent>
            <Skeleton className="h-48 w-full" />
        </CardContent>
      </Card>
    </main>
  );
}


export default function InvestmentsPage() {
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialData, setIsInitialData] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const loadData = () => {
      try {
        const storedInvestments = localStorage.getItem(INVESTMENTS_STORAGE_KEY);
        if (storedInvestments) {
          setInvestments(JSON.parse(storedInvestments));
        } else {
          setInvestments(initialInvestments);
          setIsInitialData(true);
        }
      } catch (error) {
        console.error("Failed to load investments from localStorage", error);
        setInvestments(initialInvestments);
        setIsInitialData(true);
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
          localStorage.setItem(INVESTMENTS_STORAGE_KEY, JSON.stringify(investments));
          if (JSON.stringify(investments) !== JSON.stringify(initialInvestments)) {
            setIsInitialData(false);
          }
        } catch (error) {
          console.error("Failed to save investments to localStorage", error);
        }
    }
  }, [investments, isLoading]);

  const handleAddInvestment = (investment: Omit<Investment, 'id' | 'currentValue'>) => {
    const newInvestment: Investment = {
      ...investment,
      id: crypto.randomUUID(),
      currentValue: investment.initialValue,
    };
    setInvestments(prev => [...prev, newInvestment]);
  };

  const handleDeleteInvestment = (id: string) => {
    setInvestments(prev => prev.filter(inv => inv.id !== id));
  };
  
  const handleClearSampleData = () => {
    setInvestments([]);
    setIsInitialData(false);
  }

  if (isLoading) {
    return <InvestmentsLoading />;
  }
  
  return (
    <main className="p-4 sm:p-6 lg:p-8 space-y-8 bg-background text-foreground">
      <h1 className="text-3xl font-bold tracking-tight">Investment Tracker</h1>

      <InvestmentsTable 
        investments={investments} 
        onAddInvestment={handleAddInvestment}
        onDeleteInvestment={handleDeleteInvestment}
        isInitialData={isInitialData}
        onClearSampleData={handleClearSampleData}
      />
    </main>
  );
}
