
"use client"

import React, { useState, useMemo, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CreditCardForm } from '@/components/credit-card-health/credit-card-form';
import { ScoreDisplay } from '@/components/credit-card-health/score-display';
import { FactorsBreakdown } from '@/components/credit-card-health/factors-breakdown';
import { Insights } from '@/components/credit-card-health/insights';
import type { CreditCardData, ScoreFactors } from '@/lib/types';
import { calculateScore, generateInsights } from '@/lib/credit-card-score';
import { ImprovementTips } from '@/components/credit-card-health/improvement-tips';
import { CreditHealthLoadingSkeleton } from '@/components/credit-card-health/credit-health-loading';

const CREDIT_HEALTH_DATA_KEY = 'creditHealthData';

export default function CreditCardHealthPage() {
  const [cards, setCards] = useState<CreditCardData[]>([]);
  const [applications, setApplications] = useState(0);
  const [hasOtherLoans, setHasOtherLoans] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    try {
      const savedData = localStorage.getItem(CREDIT_HEALTH_DATA_KEY);
      if (savedData) {
        const { cards, applications, hasOtherLoans } = JSON.parse(savedData);
        setCards(cards || []);
        setApplications(applications || 0);
        setHasOtherLoans(hasOtherLoans || false);
      }
    } catch (error) {
      console.error("Failed to load credit health data from localStorage", error);
    } finally {
      setTimeout(() => setIsLoading(false), 500);
    }
  }, []);

  useEffect(() => {
    if (!isLoading) {
      try {
        const dataToSave = JSON.stringify({ cards, applications, hasOtherLoans });
        localStorage.setItem(CREDIT_HEALTH_DATA_KEY, dataToSave);
      } catch (error) {
        console.error("Failed to save credit health data to localStorage", error);
      }
    }
  }, [cards, applications, hasOtherLoans, isLoading]);

  const { score, factors } = useMemo(() => 
    calculateScore(cards, applications, hasOtherLoans), 
    [cards, applications, hasOtherLoans]
  );
  
  const insights = useMemo(() => 
    generateInsights(factors),
    [factors]
  );

  const handleAddCard = (newCard: Omit<CreditCardData, 'id'>) => {
    setCards(prev => [...prev, { ...newCard, id: crypto.randomUUID() }]);
  };

  const handleUpdateCard = (updatedCard: CreditCardData) => {
    setCards(prev => prev.map(c => c.id === updatedCard.id ? updatedCard : c));
  };
  
  const handleDeleteCard = (id: string) => {
    setCards(prev => prev.filter(c => c.id !== id));
  }
  
  if (isLoading) {
    return <CreditHealthLoadingSkeleton />;
  }

  return (
    <main className="p-4 sm:p-6 lg:p-8 space-y-8 bg-background text-foreground">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Credit Health Check</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-8">
           <Card>
            <CardHeader>
              <CardTitle>Your Score</CardTitle>
              <CardDescription>A score based on your credit card habits</CardDescription>
            </CardHeader>
            <CardContent>
              <ScoreDisplay score={score} />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
                <CardTitle>Actionable Insights</CardTitle>
                <CardDescription>How to improve your card health</CardDescription>
            </CardHeader>
            <CardContent>
                <Insights insights={insights} />
            </CardContent>
          </Card>
           <Card>
            <CardHeader>
                <CardTitle>Score Factors</CardTitle>
                <CardDescription>How your score is calculated</CardDescription>
            </CardHeader>
            <CardContent>
                <FactorsBreakdown factors={factors} />
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-2 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Your Credit Cards</CardTitle>
              <CardDescription>Enter your credit card details to calculate your score.</CardDescription>
            </CardHeader>
            <CardContent>
              <CreditCardForm 
                cards={cards} 
                onAddCard={handleAddCard} 
                onUpdateCard={handleUpdateCard}
                onDeleteCard={handleDeleteCard}
                applications={applications}
                setApplications={setApplications}
                hasOtherLoans={hasOtherLoans}
                setHasOtherLoans={setHasOtherLoans}
              />
            </CardContent>
          </Card>
          <ImprovementTips />
        </div>
      </div>
    </main>
  );
}
