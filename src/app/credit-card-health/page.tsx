
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

export default function CreditCardHealthPage() {
  const [cards, setCards] = useState<CreditCardData[]>([]);
  const [applications, setApplications] = useState(0);
  const [hasOtherLoans, setHasOtherLoans] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setIsLoading(false), 500);
  }, []);


  const activeCard = useMemo(() => {
    if (cards.length === 0) return null;
    return cards[cards.length - 1];
  }, [cards]);
  
  const { score, factors } = useMemo(() => {
      const cardToScore = activeCard ? [activeCard] : [];
      return calculateScore(cardToScore, applications, hasOtherLoans)
  }, [activeCard, applications, hasOtherLoans]);
  
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
              <CardTitle>
                {activeCard ? `Your "${activeCard.name}" Score` : "Your Score"}
              </CardTitle>
              <CardDescription>
                {activeCard 
                    ? `Score based on your "${activeCard.name}" card.`
                    : "Add a card to see your score."
                }
              </CardDescription>
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
