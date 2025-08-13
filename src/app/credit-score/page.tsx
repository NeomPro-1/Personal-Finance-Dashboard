
"use client"

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CreditScoreGauge } from "@/components/credit-score/credit-score-gauge";
import { CreditFactors } from "@/components/credit-score/credit-factors";
import { ScoreHistoryChart } from "@/components/credit-score/score-history-chart";
import { ImprovementTips } from "@/components/credit-score/improvement-tips";
import { creditScoreData, scoreFactors, scoreHistory, improvementTips } from "@/lib/data";

export default function CreditScorePage() {
  const [score, setScore] = useState(creditScoreData.currentScore);

  return (
    <main className="p-4 sm:p-6 lg:p-8 space-y-8 bg-background text-foreground">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Credit Score Insights</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Your Credit Score</CardTitle>
              <CardDescription>Updated {creditScoreData.lastUpdated}</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-center">
              <CreditScoreGauge score={score} />
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Credit Factors</CardTitle>
              <CardDescription>How your score is calculated</CardDescription>
            </CardHeader>
            <CardContent>
              <CreditFactors factors={scoreFactors} />
            </CardContent>
          </Card>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
            <CardHeader>
                <CardTitle>Score History</CardTitle>
                <CardDescription>Your score over the last 12 months</CardDescription>
            </CardHeader>
            <CardContent>
                <ScoreHistoryChart history={scoreHistory} />
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle>Improvement Tips</CardTitle>
                <CardDescription>Actionable steps to boost your score</CardDescription>
            </CardHeader>
            <CardContent>
                <ImprovementTips tips={improvementTips} />
            </CardContent>
        </Card>
      </div>
    </main>
  );
}
