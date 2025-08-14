
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Badge } from '../ui/badge'

interface InvestmentsTableProps {
  investments: Investment[];
  onAddInvestment: (investment: Omit<Investment, 'id' | 'currentValue'>) => void;
  onDeleteInvestment: (id: string) => void;
}

const addInvestmentFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  type: z.enum(['Stock', 'Gold']),
  initialValue: z.coerce.number().optional(),
  quantityInGrams: z.coerce.number().optional(),
  carat: z.coerce.number().optional(),
  purchaseDate: z.date(),
}).refine(data => {
    if (data.type === 'Stock') {
        return data.initialValue && data.initialValue > 0;
    }
    if (data.type === 'Gold') {
        return data.quantityInGrams && data.quantityInGrams > 0 && data.carat;
    }
    return false;
}, {
    message: "A valid value is required for the selected investment type.",
    path: ["initialValue"], // Or whichever path is most appropriate
});


type AddInvestmentFormValues = z.infer<typeof addInvestmentFormSchema>;

export function InvestmentsTable({ investments, onAddInvestment, onDeleteInvestment }: InvestmentsTableProps) {
  const isMobile = useIsMobile();
  const form = useForm<AddInvestmentFormValues>({
    resolver: zodResolver(addInvestmentFormSchema),
    defaultValues: {
      name: "",
      type: "Stock",
      purchaseDate: new Date(),
      initialValue: undefined,
      quantityInGrams: undefined,
      carat: undefined,
    },
  });
  
  const investmentType = form.watch("type");

  function onSubmit(data: AddInvestmentFormValues) {
    const purchaseDate = format(data.purchaseDate, 'yyyy-MM-dd');
    let submissionData: Omit<Investment, 'id' | 'currentValue'>;

    if (data.type === 'Gold') {
        // For simplicity, we'll set the initial value of gold based on quantity.
        // A real app would use purchase price per gram.
        const value = data.quantityInGrams! * 6000; // Placeholder price
        submissionData = {
            name: data.name,
            type: 'Gold',
            purchaseDate,
            initialValue: value,
            quantityInGrams: data.quantityInGrams,
            carat: data.carat as any,
        }
    } else { // Stock
        submissionData = {
            name: data.name,
            type: 'Stock',
            purchaseDate,
            initialValue: data.initialValue!,
        }
    }
    onAddInvestment(submissionData);
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
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-end">
                    <FormField control={form.control} name="name" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl><Input placeholder="e.g., Tech Giant Inc." {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}/>
                     <FormField control={form.control} name="type" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Type</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select investment type" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="Stock">Stock</SelectItem>
                                    <SelectItem value="Gold">Gold</SelectItem>
                                </SelectContent>
                            </Select>
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
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-end">
                    {investmentType === 'Stock' && (
                        <FormField control={form.control} name="initialValue" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Initial Value</FormLabel>
                                <FormControl><Input type="number" step="0.01" placeholder="e.g., 5000.00" {...field} value={field.value ?? ''} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )}/>
                    )}
                    {investmentType === 'Gold' && (
                        <>
                        <FormField control={form.control} name="quantityInGrams" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Quantity (grams)</FormLabel>
                                <FormControl><Input type="number" step="0.01" placeholder="e.g., 10" {...field} value={field.value ?? ''} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )}/>
                        <FormField control={form.control} name="carat" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Carat</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value?.toString()}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select purity" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="24">24 Carat</SelectItem>
                                        <SelectItem value="22">22 Carat</SelectItem>
                                        <SelectItem value="18">18 Carat</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}/>
                        </>
                    )}
                 </div>
                 <Button type="submit" className="w-full md:w-auto md:max-w-xs">Add Investment</Button>
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
      
       <Card className="bg-primary/10 border-primary/30">
          <CardHeader className="flex-row items-center gap-4 space-y-0 pb-4">
              <Info className="h-6 w-6 text-primary" />
              <CardTitle className="text-primary/90 text-xl">Demonstration Data</CardTitle>
          </CardHeader>
          <CardContent>
              <p className="text-primary/80 text-sm max-w-prose">
                  The data shown is for demonstration purposes only. It is not based on real-time market values.
              </p>
          </CardContent>
      </Card>

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
          {isMobile ? (
            <div className="space-y-4">
              {investments.map(inv => {
                  const gainLoss = inv.currentValue - inv.initialValue;
                  return (
                    <Card key={inv.id} className="bg-card/50">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
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
                        </div>
                         <div className="text-sm text-muted-foreground flex items-center gap-2">
                            <span>{format(new Date(inv.purchaseDate), 'MMM dd, yyyy')}</span>
                            <Badge variant="outline">{inv.type}</Badge>
                         </div>
                      </CardHeader>
                      <CardContent className="space-y-2 text-sm pt-4">
                        {inv.type === 'Gold' && inv.quantityInGrams && (
                             <div className="flex justify-between items-center">
                              <span className="text-muted-foreground">Quantity:</span>
                              <span className="font-medium">{inv.quantityInGrams}g {inv.carat && `(${inv.carat}K)`}</span>
                            </div>
                        )}
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">Initial Value:</span>
                          <span className="font-medium">{formatCurrency(inv.initialValue, isMobile)}</span>
                        </div>
                         <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">Current Value:</span>
                          <span className="font-medium">{formatCurrency(inv.currentValue, isMobile)}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">Gain/Loss:</span>
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
                    <TableHead>Type</TableHead>
                    <TableHead>Purchase Date</TableHead>
                    <TableHead>Quantity</TableHead>
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
                        <TableCell><Badge variant="outline">{inv.type}</Badge></TableCell>
                        <TableCell>{format(new Date(inv.purchaseDate), 'MMM dd, yyyy')}</TableCell>
                        <TableCell>{inv.type === 'Gold' && inv.quantityInGrams ? `${inv.quantityInGrams}g ${inv.carat ? `(${inv.carat}K)` : ''}`.trim() : 'N/A'}</TableCell>
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
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-end">
                    <FormField control={form.control} name="name" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl><Input placeholder="e.g., Tech Giant Inc." {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}/>
                     <FormField control={form.control} name="type" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Type</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select investment type" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="Stock">Stock</SelectItem>
                                    <SelectItem value="Gold">Gold</SelectItem>
                                </SelectContent>
                            </Select>
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
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-end">
                    {investmentType === 'Stock' && (
                        <FormField control={form.control} name="initialValue" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Initial Value</FormLabel>
                                <FormControl><Input type="number" step="0.01" placeholder="e.g., 5000.00" {...field} value={field.value ?? ''} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )}/>
                    )}
                    {investmentType === 'Gold' && (
                        <>
                        <FormField control={form.control} name="quantityInGrams" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Quantity (grams)</FormLabel>
                                <FormControl><Input type="number" step="0.01" placeholder="e.g., 10" {...field} value={field.value ?? ''} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )}/>
                        <FormField control={form.control} name="carat" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Carat</FormLabel>
                                <Select onValueChange={(value) => field.onChange(parseInt(value))} defaultValue={field.value?.toString()}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select purity" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="24">24 Carat</SelectItem>
                                        <SelectItem value="22">22 Carat</SelectItem>
                                        <SelectItem value="18">18 Carat</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}/>
                        </>
                    )}
                 </div>
                 <Button type="submit" className="w-full md:w-auto md:max-w-xs">Add Investment</Button>
              </form>
            </Form>
        </CardContent>
      </Card>

    </div>
  )
}

    