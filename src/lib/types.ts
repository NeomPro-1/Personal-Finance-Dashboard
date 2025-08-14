

export type Transaction = {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: 'income' | 'expense';
  category: Category;
};

export const CATEGORIES = [
  'Groceries',
  'Utilities',
  'Rent/Mortgage',
  'Transportation',
  'Dining Out',
  'Entertainment',
  'Shopping',
  'Healthcare',
  'Salary',
  'Freelance',
  'Investments',
  'Retail',
  'Other',
] as const;

export type Category = (typeof CATEGORIES)[number];

export type Investment = {
  id: string;
  name: string;
  type: 'Stock' | 'Gold';
  purchaseDate: string;
  initialValue: number;
  currentValue: number;
  quantityInGrams?: number; // Optional: for gold
};

export interface CreditCardData {
  id: string;
  name: string;
  issuer: string;
  limit: number;
  balance: number;
  openDate: string; // YYYY-MM-DD
  missedPayments: number;
}

export type ScoreFactorName = 'Payment History' | 'Credit Utilization' | 'Credit Age' | 'Recent Inquiries' | 'Credit Mix';

export interface ScoreFactor {
  name: ScoreFactorName;
  value: number; // The user's normalized score for this factor (0-100)
  weight: number; // The factor's weight in the total score (e.g., 0.40)
  details: string; // A string explaining the value, e.g., "30% utilization"
}

export type ScoreFactors = Record<ScoreFactorName, ScoreFactor>;

export type Insight = {
    text: string;
    priority: 'High' | 'Medium' | 'Low';
};

export type Goal = {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  targetDate?: string;
};
