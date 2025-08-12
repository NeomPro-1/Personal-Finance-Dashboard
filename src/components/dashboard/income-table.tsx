"use client"

import React, { useMemo, useState } from 'react'
import { format, parseISO } from "date-fns"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { PlusCircle, Trash2 } from "lucide-react"
import { AddTransactionDialog } from './add-transaction-dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import type { Transaction } from "@/lib/types"

interface IncomeTableProps {
  transactions: Transaction[];
  onAddTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  onDeleteTransaction: (id: string) => void;
}

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'Salary': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
    case 'Freelance': return 'bg-green-500/20 text-green-400 border-green-500/30';
    case 'Investments': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
    default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
  }
}

export function IncomeTable({ transactions, onAddTransaction, onDeleteTransaction }: IncomeTableProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const groupedByMonth = useMemo(() => {
    return transactions.reduce((acc, t) => {
      const month = format(parseISO(t.date), 'MMMM yyyy');
      if (!acc[month]) {
        acc[month] = { transactions: [], total: 0 };
      }
      acc[month].transactions.push(t);
      acc[month].total += t.amount;
      return acc;
    }, {} as Record<string, { transactions: Transaction[], total: number }>);
  }, [transactions]);
  
  const defaultOpenMonths = useMemo(() => Object.keys(groupedByMonth), [groupedByMonth]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Income</h2>
         <AddTransactionDialog
            isOpen={isDialogOpen}
            setIsOpen={setIsDialogOpen}
            onAddTransaction={onAddTransaction}
            type="income"
          >
            <Button variant="outline" size="sm">
              <PlusCircle className="mr-2 h-4 w-4" />
              New
            </Button>
          </AddTransactionDialog>
      </div>
      <Accordion type="multiple" defaultValue={defaultOpenMonths} className="w-full space-y-2">
        {Object.entries(groupedByMonth).map(([month, { transactions: monthTransactions, total }]) => (
          <AccordionItem value={month} key={month} className="border-none rounded-lg bg-card/50">
            <AccordionTrigger className="px-4 py-2 text-lg font-semibold hover:no-underline">
                <div className="flex items-center gap-4">
                    <span>{month}</span>
                    <Badge variant="outline">{monthTransactions.length}</Badge>
                </div>
            </AccordionTrigger>
            <AccordionContent className="px-1 pb-2">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead>Source</TableHead>
                    <TableHead>Tags</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {monthTransactions.map(t => (
                    <TableRow key={t.id} className="hover:bg-transparent group">
                      <TableCell className="font-medium">{t.description}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={getCategoryColor(t.category)}>{t.category}</Badge>
                      </TableCell>
                       <TableCell>{format(parseISO(t.date), 'MMM dd, yyyy')}</TableCell>
                      <TableCell className="text-right">{formatCurrency(t.amount)}</TableCell>
                      <TableCell>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100">
                              <Trash2 className="h-4 w-4 text-muted-foreground" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete this transaction.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => onDeleteTransaction(t.id)}>Continue</AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </TableCell>
                    </TableRow>
                  ))}
                   <TableRow className="hover:bg-transparent">
                      <TableCell colSpan={4} className="text-right font-semibold text-muted-foreground">SUM</TableCell>
                      <TableCell className="text-right font-bold">{formatCurrency(total)}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}
