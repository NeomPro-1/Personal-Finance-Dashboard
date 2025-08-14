
"use client"

import React, { useMemo } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { formatCurrency } from '@/lib/utils';
import type { Goal } from '@/lib/types';
import { format, differenceInDays, parseISO } from 'date-fns';
import { PiggyBank, Calendar, Trash2 } from 'lucide-react';
import { UpdateGoalDialog } from './update-goal-dialog';

interface GoalCardProps {
  goal: Goal;
  onUpdateGoal: (goal: Goal) => void;
  onDeleteGoal: (id: string) => void;
}

export function GoalCard({ goal, onUpdateGoal, onDeleteGoal }: GoalCardProps) {
  const progress = useMemo(() => (goal.targetAmount > 0 ? (goal.currentAmount / goal.targetAmount) * 100 : 0), [goal]);

  const daysLeft = useMemo(() => {
    if (!goal.targetDate) return null;
    const diff = differenceInDays(parseISO(goal.targetDate), new Date());
    return diff >= 0 ? diff : null;
  }, [goal.targetDate]);

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
            <PiggyBank className="h-6 w-6 text-primary" />
            {goal.name}
        </CardTitle>
        <CardDescription>
          {goal.targetDate ? (
            <div className="flex items-center gap-1.5 text-xs">
              <Calendar className="h-3 w-3" />
              <span>Target: {format(parseISO(goal.targetDate), 'MMM dd, yyyy')}</span>
              {daysLeft !== null && <span className="text-muted-foreground">({daysLeft} days left)</span>}
            </div>
          ) : (
            <span>No target date set</span>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow space-y-4">
        <div>
          <div className="flex justify-between items-end mb-1">
            <span className="font-bold text-xl text-primary">{formatCurrency(goal.currentAmount)}</span>
            <span className="text-sm text-muted-foreground"> of {formatCurrency(goal.targetAmount)}</span>
          </div>
          <Progress value={progress} />
           <p className="text-right text-xs text-muted-foreground mt-1">{progress.toFixed(0)}% Complete</p>
        </div>
      </CardContent>
      <CardFooter className="flex gap-2">
        <UpdateGoalDialog goal={goal} onUpdateGoal={onUpdateGoal} />
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="ghost" size="icon">
              <Trash2 className="h-4 w-4" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure you want to delete this goal?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your "{goal.name}" goal and all its progress.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => onDeleteGoal(goal.id)}>Delete</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
}
