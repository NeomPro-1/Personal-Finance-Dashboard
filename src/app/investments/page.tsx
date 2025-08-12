
"use client"

import React, { useState, useEffect } from 'react';
import { InvestmentsTable } from '@/components/investments/investments-table';
import { initialInvestments } from '@/lib/data';
import type { Investment } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Info, Trash2 } from 'lucide-react';
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

const INVESTMENTS_STORAGE_KEY = 'investments';

export default function InvestmentsPage() {
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialData, setIsInitialData] = useState(false);

  useEffect(() => {
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
        setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!isLoading) {
        try {
          localStorage.setItem(INVESTMENTS_STORAGE_KEY, JSON.stringify(investments));
          if (investments !== initialInvestments) {
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
  }

  if (isLoading) {
    return (
        <main className="p-4 sm:p-6 lg:p-8 space-y-8 bg-background text-foreground">
            <div className="flex justify-center items-center h-full">
                <p>Loading your investment data...</p>
            </div>
        </main>
    )
  }
  
  return (
    <main className="p-4 sm:p-6 lg:p-8 space-y-8 bg-background text-foreground">
      <h1 className="text-3xl font-bold tracking-tight">Investment Tracker</h1>

      {isInitialData && (
         <Card className="bg-blue-500/10 border-blue-500/30">
          <CardHeader className='flex-row items-center gap-4 space-y-0'>
            <Info className="h-6 w-6 text-blue-400" />
            <CardTitle className='text-blue-300 text-xl'>Disclaimer: Sample Data</CardTitle>
          </CardHeader>
          <CardContent className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4'>
            <p className="text-blue-200 text-sm max-w-prose">
              The data you see below is for demonstration purposes only. To start tracking your own finances, please clear the sample data and add your own investments.
            </p>
             <AlertDialog>
              <AlertDialogTrigger asChild>
                 <Button variant="destructive" size="sm">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Clear Sample Data
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure you want to clear the sample data?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete the sample investment data.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleClearSampleData}>Continue</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardContent>
        </Card>
      )}

      <InvestmentsTable 
        investments={investments} 
        onAddInvestment={handleAddInvestment}
        onDeleteInvestment={handleDeleteInvestment}
      />
    </main>
  );
}
