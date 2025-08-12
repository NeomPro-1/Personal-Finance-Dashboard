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
