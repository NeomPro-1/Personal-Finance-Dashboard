
"use client"

import React, { useState, useEffect } from 'react';
import type { Goal } from '@/lib/types';
import { AddGoal } from '@/components/goals/add-goal';
import { GoalCard } from '@/components/goals/goal-card';
import { GoalsLoading } from '@/components/goals/goals-loading';
import { Info } from 'lucide-react';
import { initialGoals } from '@/lib/data';

const GOALS_STORAGE_KEY = 'savingsGoals';

export default function GoalsPage() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const loadData = () => {
      try {
        const storedGoals = localStorage.getItem(GOALS_STORAGE_KEY);
        if (storedGoals) {
          setGoals(JSON.parse(storedGoals));
        } else {
          setGoals(initialGoals);
        }
      } catch (error) {
        console.error("Failed to load goals from localStorage", error);
        setGoals(initialGoals);
      } finally {
        setTimeout(() => setIsLoading(false), 500);
      }
    };
    loadData();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      try {
        localStorage.setItem(GOALS_STORAGE_KEY, JSON.stringify(goals));
      } catch (error) {
        console.error("Failed to save goals to localStorage", error);
      }
    }
  }, [goals, isLoading]);

  const handleAddGoal = (goal: Omit<Goal, 'id' | 'currentAmount'>) => {
    const newGoal: Goal = {
      ...goal,
      id: crypto.randomUUID(),
      currentAmount: 0,
    };
    setGoals(prev => [...prev, newGoal]);
  };

  const handleDeleteGoal = (id: string) => {
    setGoals(prev => prev.filter(g => g.id !== id));
  };
  
  const handleUpdateGoal = (updatedGoal: Goal) => {
    setGoals(prev => prev.map(g => g.id === updatedGoal.id ? updatedGoal : g));
  }

  if (isLoading) {
    return <GoalsLoading />;
  }

  return (
    <main className="p-4 sm:p-6 lg:p-8 space-y-8 bg-background text-foreground">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Savings Goals</h1>
        <AddGoal onAddGoal={handleAddGoal} />
      </div>

      {goals.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center text-muted-foreground bg-card/50 rounded-lg p-12 space-y-4">
            <Info className="h-12 w-12" />
            <h2 className="text-xl font-semibold">No Goals Yet!</h2>
            <p>Click the "Add New Goal" button to start tracking your savings.</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {goals.map(goal => (
                <GoalCard 
                    key={goal.id} 
                    goal={goal} 
                    onUpdateGoal={handleUpdateGoal}
                    onDeleteGoal={handleDeleteGoal} 
                />
            ))}
        </div>
      )}
    </main>
  );
}
