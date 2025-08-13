
"use client";

import * as React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

interface ScoreHistoryChartProps {
  history: { date: string; score: number }[];
}

export function ScoreHistoryChart({ history }: ScoreHistoryChartProps) {

  const chartConfig = {
    score: {
      label: "Score",
      color: "hsl(var(--chart-1))",
    },
  }

  const formattedHistory = history.map(h => ({
      ...h,
      month: new Date(h.date).toLocaleDateString('en-US', { month: 'short' }),
  }));

  return (
    <div className="w-full h-[250px]">
        <ChartContainer config={chartConfig} className="w-full h-full">
            <LineChart
                data={formattedHistory}
                margin={{
                top: 5, right: 20, left: -10, bottom: 0,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
                <YAxis domain={[600, 850]} tickLine={false} axisLine={false} tickMargin={8} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line type="monotone" dataKey="score" stroke="var(--color-score)" strokeWidth={2} dot={{ r: 4 }} />
            </LineChart>
        </ChartContainer>
    </div>
  );
}
