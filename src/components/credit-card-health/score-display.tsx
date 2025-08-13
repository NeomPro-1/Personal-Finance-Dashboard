
"use client";

import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface ScoreDisplayProps {
  score: number;
}

const getScoreColor = (score: number) => {
  if (score >= 800) return { color: "hsl(var(--chart-2))", label: "Excellent" };
  if (score >= 740) return { color: "hsl(var(--chart-3))", label: "Very Good" };
  if (score >= 670) return { color: "hsl(var(--chart-4))", label: "Good" };
  if (score >= 580) return { color: "hsl(var(--chart-5))", label: "Fair" };
  return { color: "hsl(var(--destructive))", label: "Poor" };
};

const MIN_SCORE = 300;
const MAX_SCORE = 900;

export function ScoreDisplay({ score }: ScoreDisplayProps) {
  const { color, label } = getScoreColor(score);
  // Calculate percentage of the arc from 300 to 900
  const percentage = ((score - MIN_SCORE) / (MAX_SCORE - MIN_SCORE)) * 100;
  
  const data = [
    { name: 'Score', value: percentage },
    { name: 'Remaining', value: 100 - percentage },
  ];

  return (
    <div className="relative w-48 h-48 sm:w-56 sm:h-56 mx-auto">
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
          {Math.round(score)}
        </span>
        <span className="text-sm sm:text-base font-medium" style={{ color }}>
          {label}
        </span>
      </div>
    </div>
  );
}
