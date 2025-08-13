
"use client"

import React, { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { PlusCircle, Trash2 } from 'lucide-react';
import type { CreditCardData } from '@/lib/types';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { Calendar } from '../ui/calendar';
import { cn } from '@/lib/utils';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';

interface CreditCardFormProps {
  cards: CreditCardData[];
  onAddCard: (card: Omit<CreditCardData, 'id'>) => void;
  onUpdateCard: (card: CreditCardData) => void;
  onDeleteCard: (id: string) => void;
  applications: number;
  setApplications: (value: number) => void;
  hasOtherLoans: boolean;
  setHasOtherLoans: (value: boolean) => void;
}

const cardSchema = z.object({
  name: z.string().min(2, 'Card name is required.'),
  limit: z.coerce.number().positive('Credit limit must be positive.'),
  balance: z.coerce.number().min(0, 'Balance cannot be negative.'),
  openDate: z.date(),
  missedPayments: z.coerce.number().min(0, 'Cannot be negative.'),
});

export function CreditCardForm({
  cards,
  onAddCard,
  onUpdateCard,
  onDeleteCard,
  applications,
  setApplications,
  hasOtherLoans,
  setHasOtherLoans,
}: CreditCardFormProps) {
    
  const form = useForm({
    resolver: zodResolver(cardSchema),
    defaultValues: {
      name: '',
      limit: undefined,
      balance: undefined,
      openDate: new Date(),
      missedPayments: 0,
    }
  });
  
  const onSubmit = (data: z.infer<typeof cardSchema>) => {
    onAddCard({
        ...data,
        openDate: format(data.openDate, 'yyyy-MM-dd'),
        issuer: 'N/A', // Not asking for issuer in this simplified form
    });
    form.reset();
  }

  const handleFieldChange = (index: number, field: keyof CreditCardData, value: any) => {
    const card = cards[index];
    onUpdateCard({ ...card, [field]: value });
  }

  return (
    <div className="space-y-6">
      <Accordion type="multiple" className="w-full space-y-4">
        {cards.map((card, index) => (
          <AccordionItem value={card.id} key={card.id} className="border rounded-lg bg-card/50">
            <AccordionTrigger className="px-4 py-3 text-lg font-semibold hover:no-underline">
                {card.name || "New Card"}
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label>Card Name</Label>
                        <Input value={card.name} onChange={(e) => handleFieldChange(index, 'name', e.target.value)} />
                    </div>
                     <div className="space-y-2">
                        <Label>Open Date</Label>
                        <Input type="date" value={card.openDate} onChange={(e) => handleFieldChange(index, 'openDate', e.target.value)} />
                    </div>
                </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label>Credit Limit</Label>
                        <Input type="number" value={card.limit} onChange={(e) => handleFieldChange(index, 'limit', parseFloat(e.target.value) || 0)} />
                    </div>
                     <div className="space-y-2">
                        <Label>Current Balance</Label>
                        <Input type="number" value={card.balance} onChange={(e) => handleFieldChange(index, 'balance', parseFloat(e.target.value) || 0)} />
                    </div>
                </div>
                <div className="space-y-2">
                    <Label>Missed Payments (Last 12 Months)</Label>
                    <Input type="number" value={card.missedPayments} onChange={(e) => handleFieldChange(index, 'missedPayments', parseInt(e.target.value) || 0)} />
                </div>

                <Button variant="destructive" size="sm" onClick={() => onDeleteCard(card.id)} className="mt-2">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete Card
                </Button>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <div className="border-t pt-6">
        <h3 className="text-lg font-semibold mb-4">Add a New Card</h3>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <FormField control={form.control} name="name" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Card Name</FormLabel>
                    <FormControl><Input placeholder="e.g., Platinum Rewards" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}/>
                 <FormField control={form.control} name="openDate" render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Open Date</FormLabel>
                    <Popover>
                        <PopoverTrigger asChild>
                            <FormControl>
                            <Button variant={"outline"} className={cn("pl-3 text-left font-normal", !field.value && "text-muted-foreground")}>
                                {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                            </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                            <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                        </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}/>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <FormField control={form.control} name="limit" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Credit Limit</FormLabel>
                    <FormControl><Input type="number" placeholder="e.g., 10000" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}/>
                 <FormField control={form.control} name="balance" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Balance</FormLabel>
                    <FormControl><Input type="number" placeholder="e.g., 2500" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}/>
               </div>
                <FormField control={form.control} name="missedPayments" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Missed Payments (Last 12 mo.)</FormLabel>
                    <FormControl><Input type="number" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}/>

                <Button type="submit" size="sm">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Card
                </Button>
            </form>
        </Form>
      </div>

      <div className="border-t pt-6 space-y-4">
         <h3 className="text-lg font-semibold">Other Factors</h3>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
                <Label>Recent Applications (Last 6 mo.)</Label>
                <Input type="number" value={applications} onChange={(e) => setApplications(parseInt(e.target.value) || 0)} />
            </div>
            <div className="flex items-center space-x-2 pt-6">
                <Switch id="other-loans" checked={hasOtherLoans} onCheckedChange={setHasOtherLoans} />
                <Label htmlFor="other-loans">Do you have other loans?</Label>
            </div>
         </div>
      </div>
    </div>
  );
}
