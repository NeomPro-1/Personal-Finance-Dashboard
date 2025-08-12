import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface InvestmentSummaryCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  change?: string;
  changeColor?: string;
}

export function InvestmentSummaryCard({ title, value, icon: Icon, change, changeColor }: InvestmentSummaryCardProps) {
  return (
    <Card className="bg-card/50 border-border/50">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <Icon className="h-5 w-5 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {change && (
          <p className={cn("text-xs", changeColor)}>
            {change}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
