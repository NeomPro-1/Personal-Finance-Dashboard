"use client"

import React, { useState, useTransition } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { handleExpensePrediction, handleTrendAnalysis } from "@/lib/actions"
import type { Transaction } from "@/lib/types"
import { useToast } from "@/hooks/use-toast"
import { Wand2, BrainCircuit, Loader2 } from 'lucide-react'
import { format } from 'date-fns'

interface AIToolsProps {
  transactions: Transaction[];
}

export function AITools({ transactions }: AIToolsProps) {
  const { toast } = useToast();
  const [isTrendPending, startTrendTransition] = useTransition();
  const [isPredictPending, startPredictTransition] = useTransition();

  const [trendResult, setTrendResult] = useState<{ trends: string; recommendations: string } | null>(null);
  const [predictionResult, setPredictionResult] = useState<{ predictedExpenses: string; confidenceLevel: string } | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<string>(format(new Date(), 'MMMM'));

  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const onAnalyzeTrends = () => {
    startTrendTransition(async () => {
      const result = await handleTrendAnalysis(transactions);
      if (result.success) {
        setTrendResult(result.data!);
      } else {
        toast({
          variant: "destructive",
          title: "Trend Analysis Failed",
          description: result.error,
        });
      }
    });
  };

  const onPredictExpenses = () => {
    startPredictTransition(async () => {
      const result = await handleExpensePrediction(transactions, selectedMonth);
      if (result.success) {
        setPredictionResult(result.data!);
      } else {
        toast({
          variant: "destructive",
          title: "Expense Prediction Failed",
          description: result.error,
        });
      }
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><BrainCircuit className="w-5 h-5 text-primary" />AI Trend Analysis</CardTitle>
          <CardDescription>Discover patterns and insights in your spending habits.</CardDescription>
        </CardHeader>
        <CardContent>
          {trendResult ? (
            <div className="space-y-4 text-sm">
              <div>
                <h4 className="font-semibold">Trends:</h4>
                <p className="text-muted-foreground">{trendResult.trends}</p>
              </div>
              <div>
                <h4 className="font-semibold">Recommendations:</h4>
                <p className="text-muted-foreground">{trendResult.recommendations}</p>
              </div>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">Click the button to analyze your financial data.</p>
          )}
        </CardContent>
        <div className="p-6 pt-0">
          <Button onClick={onAnalyzeTrends} disabled={isTrendPending} className="w-full">
            {isTrendPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <BrainCircuit className="mr-2 h-4 w-4" />}
            Analyze Trends
          </Button>
        </div>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Wand2 className="w-5 h-5 text-accent" />AI Expense Prediction</CardTitle>
          <CardDescription>Forecast your expenses for an upcoming month.</CardDescription>
        </CardHeader>
        <CardContent>
           {predictionResult ? (
            <div className="space-y-4 text-sm">
               <p className="text-muted-foreground">{predictionResult.predictedExpenses}</p>
               <p className="text-xs italic text-muted-foreground/80">Confidence: {predictionResult.confidenceLevel}</p>
            </div>
          ) : (
             <p className="text-sm text-muted-foreground">Select a month and click predict to see your forecast.</p>
          )}
        </CardContent>
         <div className="p-6 pt-0 flex flex-col sm:flex-row gap-2">
            <Select value={selectedMonth} onValueChange={setSelectedMonth}>
              <SelectTrigger>
                <SelectValue placeholder="Select month" />
              </SelectTrigger>
              <SelectContent>
                {months.map(m => <SelectItem key={m} value={m}>{m}</SelectItem>)}
              </SelectContent>
            </Select>
            <Button onClick={onPredictExpenses} disabled={isPredictPending} className="w-full">
                {isPredictPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}
                Predict Expenses
            </Button>
        </div>
      </Card>
    </div>
  )
}
