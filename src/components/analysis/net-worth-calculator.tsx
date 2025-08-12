"use client"

import React, { useState, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { PlusCircle, Trash2 } from 'lucide-react'
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

type Item = {
  id: string
  description: string
  value: number
}

function FinancialItemList({
  title,
  items,
  setItems,
}: {
  title: string
  items: Item[]
  setItems: React.Dispatch<React.SetStateAction<Item[]>>
}) {
  const handleAddItem = () => {
    setItems([...items, { id: crypto.randomUUID(), description: '', value: 0 }])
  }

  const handleRemoveItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id))
  }

  const handleItemChange = (id: string, field: 'description' | 'value', value: string) => {
    setItems(
      items.map((item) =>
        item.id === id
          ? {
              ...item,
              [field]: field === 'value' ? parseFloat(value) || 0 : value,
            }
          : item
      )
    )
  }

  const total = useMemo(() => items.reduce((sum, item) => sum + item.value, 0), [items])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount)
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">{title}</h3>
      <div className="space-y-2">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-2">
            <Input
              placeholder="e.g., Savings Account"
              value={item.description}
              onChange={(e) => handleItemChange(item.id, 'description', e.target.value)}
              className="flex-grow"
            />
            <Input
              type="number"
              placeholder="Amount"
              value={item.value || ''}
              onChange={(e) => handleItemChange(item.id, 'value', e.target.value)}
              className="w-32"
            />
            <Button variant="ghost" size="icon" onClick={() => handleRemoveItem(item.id)}>
              <Trash2 className="h-4 w-4 text-muted-foreground" />
            </Button>
          </div>
        ))}
      </div>
      <Button variant="outline" size="sm" onClick={handleAddItem}>
        <PlusCircle className="mr-2 h-4 w-4" />
        Add {title.slice(0, -1)}
      </Button>
      <div className="flex justify-between items-center font-bold pt-2 border-t mt-4">
        <span>Total {title}</span>
        <span>{formatCurrency(total)}</span>
      </div>
    </div>
  )
}

export function NetWorthCalculator() {
  const [assets, setAssets] = useState<Item[]>([
    { id: crypto.randomUUID(), description: 'Checking Account', value: 5000 },
    { id: crypto.randomUUID(), description: 'Investments', value: 25000 },
  ])
  const [liabilities, setLiabilities] = useState<Item[]>([
    { id: crypto.randomUUID(), description: 'Credit Card Debt', value: 2500 },
    { id: crypto.randomUUID(), description: 'Student Loan', value: 15000 },
  ])

  const totalAssets = useMemo(() => assets.reduce((sum, item) => sum + item.value, 0), [assets])
  const totalLiabilities = useMemo(
    () => liabilities.reduce((sum, item) => sum + item.value, 0),
    [liabilities]
  )
  const netWorth = totalAssets - totalLiabilities

  const chartData = [
    { name: 'Assets', value: totalAssets, fill: "var(--color-assets)" },
    { name: 'Liabilities', value: totalLiabilities, fill: "var(--color-liabilities)" }
  ]

  const chartConfig = {
    value: {
      label: 'Value',
    },
    assets: {
      label: 'Assets',
      color: 'hsl(var(--chart-2))',
    },
    liabilities: {
      label: 'Liabilities',
      color: 'hsl(var(--chart-1))',
    },
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Net Worth Calculator</CardTitle>
      </CardHeader>
      <CardContent className="grid md:grid-cols-2 gap-8">
        <FinancialItemList title="Assets" items={assets} setItems={setAssets} />
        <FinancialItemList title="Liabilities" items={liabilities} setItems={setLiabilities} />
      </CardContent>
       <CardContent>
        <div className="h-[200px]">
          <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
            <BarChart accessibilityLayer data={chartData} layout="vertical" margin={{ left: 10 }}>
              <CartesianGrid horizontal={false} />
              <YAxis
                dataKey="name"
                type="category"
                tickLine={false}
                axisLine={false}
              />
              <XAxis type="number" hide />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent
                  formatter={(value) => formatCurrency(value as number)}
                />}
              />
              <Bar dataKey="value" radius={5} />
            </BarChart>
          </ChartContainer>
        </div>
      </CardContent>
      <CardFooter className="mt-6">
        <div className="w-full flex justify-between items-center text-xl font-bold text-primary">
          <span>Net Worth</span>
          <span>{formatCurrency(netWorth)}</span>
        </div>
      </CardFooter>
    </Card>
  )
}
