'use server';

import { predictExpenses } from '@/ai/flows/predict-expenses';
import { analyzeTrends } from '@/ai/flows/trend-analysis';
import type { Transaction } from '@/lib/types';

export async function handleExpensePrediction(
  transactions: Transaction[],
  month: string
) {
  if (!transactions || transactions.length === 0) {
    return { success: false, error: 'No transaction data available to make a prediction.' };
  }
  try {
    const financialData = JSON.stringify(transactions);
    const result = await predictExpenses({ financialData, month });
    return { success: true, data: result };
  } catch (error) {
    console.error('AI Expense Prediction Error:', error);
    return { success: false, error: 'An error occurred while predicting expenses.' };
  }
}

export async function handleTrendAnalysis(transactions: Transaction[]) {
   if (!transactions || transactions.length === 0) {
    return { success: false, error: 'No transaction data available to analyze trends.' };
  }
  try {
    const financialData = JSON.stringify(transactions);
    const result = await analyzeTrends({ financialData });
    return { success: true, data: result };
  } catch (error) {
    console.error('AI Trend Analysis Error:', error);
    return { success: false, error: 'An error occurred while analyzing trends.' };
  }
}
