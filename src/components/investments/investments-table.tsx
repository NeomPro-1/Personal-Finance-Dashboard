
"use client"

import React, { useState, useMemo } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { format } from "date-fns"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { InvestmentSummaryCard } from './investment-summary-card'

import { cn, formatCurrency } from "@/lib/utils"
import type { Investment } from "@/lib/types"
import { CalendarIcon, Trash2, TrendingUp, TrendingDown, DollarSign, PiggyBank, Briefcase, Info } from "lucide-react"
import { useIsMobile } from '@/hooks/use-mobile'

interface InvestmentsTableProps {
  investments: Investment[];
  onAddInvestment: (investment: Omit<Investment, 'id' | 'currentValue'>) => void;
  onDeleteInvestment: (id: string) => void;
}

const addInvestmentFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  initialValue: z.coerce.number().positive({ message: "Value must be positive." }),
  purchaseDate: z.date(),
});

type AddInvestmentFormValues = z.infer<typeof addInvestmentFormSchema>;

export function InvestmentsTable({ investments, onAddInvestment, onDeleteInvestment }: InvestmentsTableProps) {
  const isMobile = useIsMobile();
  const form = useForm<AddInvestmentFormValues>({
    resolver: zodResolver(addInvestmentFormSchema),
    defaultValues: {
      name: "",
      purchaseDate: new Date(),
      initialValue: undefined,
    },
  });

  function onSubmit(data: AddInvestmentFormValues) {
    onAddInvestment({ ...data, purchaseDate: format(data.purchaseDate, 'yyyy-MM-dd') });
    form.reset();
  }
  
  const { totalInvested, currentValue, totalGainLoss, totalGainLossPercent } = useMemo(() => {
    const totalInvested = investments.reduce((acc, inv) => acc + inv.initialValue, 0);
    const currentValue = investments.reduce((acc, inv) => acc + inv.currentValue, 0);
    const totalGainLoss = currentValue - totalInvested;
    const totalGainLossPercent = totalInvested > 0 ? (totalGainLoss / totalInvested) * 100 : 0;
    return { totalInvested, currentValue, totalGainLoss, totalGainLossPercent };
  }, [investments]);
  
  const performanceData = useMemo(() => {
    return investments.map(inv => ({
      name: inv.name,
      initial: inv.initialValue,
      current: inv.currentValue,
      gain: inv.currentValue - inv.initialValue,
    })).sort((a,b) => new Date(a.name).getTime() - new Date(b.name).getTime());
  }, [investments]);

  if (investments.length === 0) {
    return (
       <div className="space-y-8">
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          <InvestmentSummaryCard 
            title="Total Invested" 
            value={formatCurrency(0, isMobile)} 
            icon={PiggyBank} 
          />
          <InvestmentSummaryCard 
            title="Current Value" 
            value={formatCurrency(0, isMobile)} 
            icon={Briefcase} 
          />
          <InvestmentSummaryCard 
            title="Total Gain/Loss" 
            value={formatCurrency(0, isMobile)} 
            icon={DollarSign}
            change={`0.00%`}
          />
        </div>
        <Card>
            <CardHeader>
                <CardTitle>Investments</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex items-center justify-center h-48 bg-card/50 rounded-md">
                    <div className="text-center text-muted-foreground p-6">
                        <Info className="mx-auto h-8 w-8 mb-2" />
                        <p>No investments recorded yet.</p>
                        <p className="text-sm">Use the form below to add one.</p>
                    </div>
                </div>
            </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Add New Investment</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
                <FormField control={form.control} name="name" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Investment Name</FormLabel>
                    <FormControl><Input placeholder="e.g., Tech Giant Inc." {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}/>
                <FormField control={form.control} name="initialValue" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Initial Value</FormLabel>
                    <FormControl><Input type="number" step="0.01" placeholder="e.g., 5000.00" {...field} value={field.value ?? ''} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}/>
                <FormField control={form.control} name="purchaseDate" render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Purchase Date</FormLabel>
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
                <Button type="submit" className="w-full md:w-auto lg:col-start-4">Add Investment</Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        <InvestmentSummaryCard 
          title="Total Invested" 
          value={formatCurrency(totalInvested, isMobile)} 
          icon={PiggyBank} 
        />
        <InvestmentSummaryCard 
          title="Current Value" 
          value={formatCurrency(currentValue, isMobile)} 
          icon={Briefcase} 
        />
        <InvestmentSummaryCard 
          title="Total Gain/Loss" 
          value={formatCurrency(totalGainLoss, isMobile)} 
          icon={totalGainLoss >= 0 ? TrendingUp : TrendingDown}
          change={`${totalGainLossPercent.toFixed(2)}%`}
          changeColor={totalGainLoss >= 0 ? 'text-green-500' : 'text-red-500'}
        />
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] w-full">
            <ResponsiveContainer>
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis tickFormatter={(value) => formatCurrency(value, isMobile)} width={isMobile ? 60 : 80} />
                <Tooltip formatter={(value: number) => formatCurrency(value, isMobile)} />
                <Legend />
                <Line type="monotone" dataKey="initial" name="Initial Value" stroke="hsl(var(--chart-1))" />
                <Line type="monotone" dataKey="current" name="Current Value" stroke="hsl(var(--chart-2))" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Investments</CardTitle>
        </CardHeader>
        <CardContent>
            <Card className="bg-blue-500/10 border-blue-500/30 mb-6">
                <CardHeader className="flex-row items-center gap-4 space-y-0 pb-4">
                    <Info className="h-6 w-6 text-blue-400" />
                    <CardTitle className="text-blue-300 text-xl">Disclaimer</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-blue-200 text-sm max-w-prose">
                        The data shown is for demonstration purposes only. It is not based on real-time market values.
                    </p>
                </CardContent>
            </Card>
          {isMobile ? (
            <div className="space-y-4">
              {investments.map(inv => {
                  const gainLoss = inv.currentValue - inv.initialValue;
                  return (
                    <Card key={inv.id} className="bg-card/50">
                      <CardHeader className="flex flex-row justify-between items-start pb-2">
                        <CardTitle className="text-lg">{inv.name}</CardTitle>
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8 -mt-2 -mr-2">
                                <Trash2 className="h-4 w-4 text-muted-foreground" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  This action cannot be undone. This will permanently delete this investment.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => onDeleteInvestment(inv.id)}>Continue</AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                      </CardHeader>
                      <CardContent className="space-y-2 text-sm">
                        <p className="text-muted-foreground">{format(new Date(inv.purchaseDate), 'MMM dd, yyyy')}</p>
                        <div className="flex justify-between items-center">
                          <span>Initial Value:</span>
                          <span className="font-medium">{formatCurrency(inv.initialValue, isMobile)}</span>
                        </div>
                         <div className="flex justify-between items-center">
                          <span>Current Value:</span>
                          <span className="font-medium">{formatCurrency(inv.currentValue, isMobile)}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Gain/Loss:</span>
                           <span className={cn(
                            "font-bold",
                            gainLoss >= 0 ? "text-green-500" : "text-red-500"
                          )}>
                            {formatCurrency(gainLoss, isMobile)}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
            </div>
          ) : (
            <div className="w-full overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Purchase Date</TableHead>
                    <TableHead className="text-right">Initial Value</TableHead>
                    <TableHead className="text-right">Current Value</TableHead>
                    <TableHead className="text-right">Gain/Loss</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {investments.map(inv => {
                    const gainLoss = inv.currentValue - inv.initialValue;
                    return (
                      <TableRow key={inv.id}>
                        <TableCell className="font-medium">{inv.name}</TableCell>
                        <TableCell>{format(new Date(inv.purchaseDate), 'MMM dd, yyyy')}</TableCell>
                        <TableCell className="text-right">{formatCurrency(inv.initialValue, isMobile)}</TableCell>
                        <TableCell className="text-right">{formatCurrency(inv.currentValue, isMobile)}</TableCell>
                        <TableCell className={cn(
                          "text-right",
                          gainLoss >= 0 ? "text-green-500" : "text-red-500"
                        )}>
                          {formatCurrency(gainLoss, isMobile)}
                        </TableCell>
                        <TableCell>
                          <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <Trash2 className="h-4 w-4 text-muted-foreground" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete this investment.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction onClick={() => onDeleteInvestment(inv.id)}>Continue</AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Add New Investment</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
              <FormField control={form.control} name="name" render={({ field }) => (
                <FormItem>
                  <FormLabel>Investment Name</FormLabel>
                  <FormControl><Input placeholder="e.g., Tech Giant Inc." {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}/>
               <FormField control={form.control} name="initialValue" render={({ field }) => (
                <FormItem>
                  <FormLabel>Initial Value</FormLabel>
                  <FormControl><Input type="number" step="0.01" placeholder="e.g., 5000.00" {...field} value={field.value ?? ''} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}/>
               <FormField control={form.control} name="purchaseDate" render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Purchase Date</FormLabel>
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
              <Button type="submit" className="w-full md:col-span-2 lg:col-span-1 lg:w-auto">Add Investment</Button>
            </form>
          </Form>
        </CardContent>
      </Card>

    </div>
  )
}
