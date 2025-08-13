
"use client";

import { Progress } from '@/components/ui/progress';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { Info } from 'lucide-react';

interface CreditFactor {
  name: string;
  value: number; // 0-100
  impact: 'High' | 'Medium' | 'Low';
  description: string;
}

interface CreditFactorsProps {
  factors: CreditFactor[];
}

const getImpactColor = (impact: 'High' | 'Medium' | 'Low') => {
  if (impact === 'High') return 'bg-red-500/20 text-red-400 border-red-500/30';
  if (impact === 'Medium') return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
  return 'bg-green-500/20 text-green-400 border-green-500/30';
};

export function CreditFactors({ factors }: CreditFactorsProps) {
  return (
    <TooltipProvider>
      <div className="space-y-4">
        {factors.map((factor) => (
          <div key={factor.name}>
            <div className="flex justify-between items-center mb-1">
              <div className="flex items-center gap-2">
                <span className="font-medium text-sm">{factor.name}</span>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-4 w-4 text-muted-foreground cursor-pointer" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{factor.description}</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <span
                className={cn(
                  'text-xs font-semibold px-2 py-0.5 rounded-full border',
                  getImpactColor(factor.impact)
                )}
              >
                {factor.impact} Impact
              </span>
            </div>
            <Progress value={factor.value} className="h-2" />
          </div>
        ))}
      </div>
    </TooltipProvider>
  );
}
