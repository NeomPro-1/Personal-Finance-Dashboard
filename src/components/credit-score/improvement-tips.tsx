
"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { CheckCircle2, AlertTriangle, Info } from 'lucide-react';

interface Tip {
    title: string;
    description: string;
    priority: 'High' | 'Medium' | 'Low';
}

interface ImprovementTipsProps {
    tips: Tip[];
}

const getPriorityIcon = (priority: 'High' | 'Medium' | 'Low') => {
    if (priority === 'High') return <AlertTriangle className="h-5 w-5 text-red-500" />;
    if (priority === 'Medium') return <Info className="h-5 w-5 text-yellow-500" />;
    return <CheckCircle2 className="h-5 w-5 text-green-500" />;
}

export function ImprovementTips({ tips }: ImprovementTipsProps) {
    return (
        <Accordion type="single" collapsible className="w-full">
            {tips.map((tip, index) => (
                <AccordionItem value={`item-${index}`} key={index}>
                    <AccordionTrigger>
                        <div className="flex items-center gap-3">
                            {getPriorityIcon(tip.priority)}
                            <span className="font-medium text-left">{tip.title}</span>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent>
                       <p className="text-sm text-muted-foreground pl-8">
                         {tip.description}
                       </p>
                    </AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
    )
}
