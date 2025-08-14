
"use client";

import { Progress } from '@/components/ui/progress';
import type { ScoreFactors } from '@/lib/types';
import { cn } from '@/lib/utils';


interface FactorsBreakdownProps {
  factors: ScoreFactors;
}

export function FactorsBreakdown({ factors }: FactorsBreakdownProps) {
  return (
      <div className="space-y-4">
        {Object.values(factors).map((factor) => (
          <div key={factor.name}>
            <div className="flex justify-between items-center mb-1">
              <span className="font-medium text-sm">{factor.name}</span>
              <span className='text-xs text-muted-foreground font-medium'>
                {factor.details}
              </span>
            </div>
            <Progress value={factor.value} className="h-2" />
          </div>
        ))}
      </div>
  );
}
