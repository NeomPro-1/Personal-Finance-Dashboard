
"use client";

import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { cn } from '@/lib/utils';

interface CreditScoreGaugeProps {
  score: number;
}

const getScoreColor = (score: number) => {
  if (score >= 750) return { color: "hsl(var(--chart-2))", label: "Excellent" };
  if (score >= 700) return { color: "hsl(var(--chart-3))", label: "Good" };
  if (score >= 650) return { color: "hsl(var(--chart-4))", label: "Fair" };
  if (score >= 550) return { color: "hsl(var(--chart-5))", label: "Poor" };
  return { color: "hsl(var(--destructive))", label: "Very Poor" };
};

const MIN_SCORE = 300;
const MAX_SCORE = 850;

export function CreditScoreGauge({ score }: CreditScoreGaugeProps) {
  const { color, label } = getScoreColor(score);
  const percentage = ((score - MIN_SCORE) / (MAX_SCORE - MIN_SCORE)) * 100;
  
  const data = [
    { name: 'Score', value: percentage },
    { name: 'Remaining', value: 100 - percentage },
  ];

  return (
    <div className="relative w-48 h-48 sm:w-56 sm:h-56">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            startAngle={180}
            endAngle={0}
            innerRadius="70%"
            outerRadius="100%"
            paddingAngle={0}
            dataKey="value"
            stroke="none"
          >
            <Cell fill={color} />
            <Cell fill="hsl(var(--muted))" />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-4xl sm:text-5xl font-bold" style={{ color }}>
          {score}
        </span>
        <span className="text-sm sm:text-base font-medium text-muted-foreground" style={{ color }}>
          {label}
        </span>
      </div>
    </div>
  );
}
