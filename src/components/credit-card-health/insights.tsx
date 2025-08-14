
import { AlertTriangle, CheckCircle2, Info } from 'lucide-react';
import type { Insight } from '@/lib/types';

interface InsightsProps {
    insights: Insight[];
}

const getPriorityIcon = (priority: 'High' | 'Medium' | 'Low') => {
    if (priority === 'High') return <AlertTriangle className="h-5 w-5 text-red-500 flex-shrink-0" />;
    if (priority === 'Medium') return <Info className="h-5 w-5 text-yellow-500 flex-shrink-0" />;
    return <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />;
}

export function Insights({ insights }: InsightsProps) {
    if (insights.length === 0) {
        return <p className="text-sm text-muted-foreground">No specific insights to show right now.</p>
    }

    return (
        <div className="space-y-3">
            {insights.map((insight, index) => (
                <div key={index} className="flex items-start gap-3">
                    {getPriorityIcon(insight.priority)}
                    <p className="text-sm text-foreground">{insight.text}</p>
                </div>
            ))}
        </div>
    )
}
