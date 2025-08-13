
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb, TrendingUp, Wallet, Ban } from 'lucide-react';

const tips = [
    {
        icon: Wallet,
        title: "Pay Bills On Time, Every Time",
        text: "This is the most important factor. Late payments can significantly lower your score. Set up autopay to avoid missing due dates."
    },
    {
        icon: TrendingUp,
        title: "Keep Credit Utilization Low",
        text: "Aim to use less than 30% of your available credit limit. A lower ratio shows lenders you're managing your credit responsibly."
    },
    {
        icon: Ban,
        title: "Don't Close Old Accounts",
        text: "The age of your credit history matters. Keeping old, unused cards open (if they have no annual fee) can boost your score's length."
    },
    {
        icon: Lightbulb,
        title: "Limit New Credit Applications",
        text: "Each application can cause a small, temporary dip in your score. Only apply for new credit when you really need it."
    }
]

export function ImprovementTips() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>How to Improve Your Score</CardTitle>
                <CardDescription>General tips for better credit health</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {tips.map((tip, index) => (
                        <div key={index} className="flex items-start gap-3">
                            <div className="flex-shrink-0 mt-1">
                                <tip.icon className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                                <h4 className="font-semibold text-sm">{tip.title}</h4>
                                <p className="text-sm text-muted-foreground">{tip.text}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}
