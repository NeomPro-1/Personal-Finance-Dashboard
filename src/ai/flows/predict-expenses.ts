// This file houses the Genkit flow for predicting user expenses based on past financial data.

'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PredictExpensesInputSchema = z.object({
  financialData: z
    .string()
    .describe('A string containing the user past financial data.'),
  month: z.string().describe('The month for which expenses are to be predicted (e.g., "January").'),
});
export type PredictExpensesInput = z.infer<typeof PredictExpensesInputSchema>;

const PredictExpensesOutputSchema = z.object({
  predictedExpenses: z
    .string()
    .describe('A string containing the predicted expenses for the upcoming month.'),
  confidenceLevel: z
    .string()
    .describe('A string containing the confidence level of the prediction.'),
});
export type PredictExpensesOutput = z.infer<typeof PredictExpensesOutputSchema>;

export async function predictExpenses(input: PredictExpensesInput): Promise<PredictExpensesOutput> {
  return predictExpensesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'predictExpensesPrompt',
  input: {schema: PredictExpensesInputSchema},
  output: {schema: PredictExpensesOutputSchema},
  prompt: `You are a personal finance advisor. Predict the expenses for the given month based on the user's past financial data. Also, provide a confidence level for the prediction.

Past Financial Data: {{{financialData}}}
Month: {{{month}}}

Respond in a single paragraph. Include the predicted expenses and the confidence level of the prediction.
`,
});

const predictExpensesFlow = ai.defineFlow(
  {
    name: 'predictExpensesFlow',
    inputSchema: PredictExpensesInputSchema,
    outputSchema: PredictExpensesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
