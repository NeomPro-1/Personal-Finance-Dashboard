// Trend-analysis.ts
'use server';

/**
 * @fileOverview Trend analysis AI agent for financial data.
 *
 * - analyzeTrends - A function that analyzes financial trends.
 * - TrendAnalysisInput - The input type for the analyzeTrends function.
 * - TrendAnalysisOutput - The return type for the analyzeTrends function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TrendAnalysisInputSchema = z.object({
  financialData: z
    .string()
    .describe(
      'Financial data, such as a list of transactions, in JSON format.'
    ),
});

export type TrendAnalysisInput = z.infer<typeof TrendAnalysisInputSchema>;

const TrendAnalysisOutputSchema = z.object({
  trends: z
    .string()
    .describe(
      'A summary of the identified trends and patterns in the financial data.'
    ),
  recommendations: z
    .string()
    .describe(
      'Recommendations based on the identified trends to improve financial health.'
    ),
});

export type TrendAnalysisOutput = z.infer<typeof TrendAnalysisOutputSchema>;

export async function analyzeTrends(input: TrendAnalysisInput): Promise<TrendAnalysisOutput> {
  return trendAnalysisFlow(input);
}

const prompt = ai.definePrompt({
  name: 'trendAnalysisPrompt',
  input: {schema: TrendAnalysisInputSchema},
  output: {schema: TrendAnalysisOutputSchema},
  prompt: `You are a financial advisor who specializes in analyzing financial data to identify trends and patterns.

  Analyze the following financial data and provide a summary of the identified trends, as well as recommendations to improve financial health.

  Financial Data:
  {{financialData}}

  Respond in the following format:
  Trends: [Summary of trends]
  Recommendations: [Recommendations based on trends]`,
});

const trendAnalysisFlow = ai.defineFlow(
  {
    name: 'trendAnalysisFlow',
    inputSchema: TrendAnalysisInputSchema,
    outputSchema: TrendAnalysisOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
