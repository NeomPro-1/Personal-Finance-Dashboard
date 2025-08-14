
"use client"

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Plus } from 'lucide-react';
import type { Goal } from '@/lib/types';

interface UpdateGoalDialogProps {
  goal: Goal;
  onUpdateGoal: (goal: Goal) => void;
}

const updateGoalSchema = z.object({
  amount: z.coerce.number().positive('Amount must be positive.'),
});

export function UpdateGoalDialog({ goal, onUpdateGoal }: UpdateGoalDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const form = useForm<z.infer<typeof updateGoalSchema>>({
    resolver: zodResolver(updateGoalSchema),
    defaultValues: {
      amount: undefined,
    }
  });

  const onSubmit = (data: z.infer<typeof updateGoalSchema>) => {
    const newCurrentAmount = goal.currentAmount + data.amount;
    onUpdateGoal({
      ...goal,
      currentAmount: newCurrentAmount,
    });
    form.reset();
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="w-full">
            <Plus className="mr-2 h-4 w-4" /> Add Funds
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Funds to "{goal.name}"</DialogTitle>
          <DialogDescription>
            Enter the amount you want to add to this savings goal.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField control={form.control} name="amount" render={({ field }) => (
              <FormItem>
                <FormLabel>Amount to Add</FormLabel>
                <FormControl><Input type="number" placeholder="e.g., 50.00" {...field} value={field.value ?? ''} /></FormControl>
                <FormMessage />
              </FormItem>
            )}/>
            <DialogFooter className="pt-4">
              <Button type="submit">Add Funds</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
