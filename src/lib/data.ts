import type { Transaction } from '@/lib/types';

export const initialTransactions: Transaction[] = [
  // January
  { id: '1', date: '2025-01-05', description: 'Acme Inc. - January', amount: 5500, type: 'income', category: 'Salary' },
  { id: '2', date: '2025-01-15', description: 'Freelance Project A', amount: 1200, type: 'income', category: 'Freelance' },
  { id: '3', date: '2025-01-10', description: 'January Rent', amount: 1800, type: 'expense', category: 'Rent/Mortgage' },
  { id: '4', date: '2025-01-20', description: 'Groceries for the week', amount: 150, type: 'expense', category: 'Groceries' },
  { id: '5', date: '2025-01-25', description: 'Internet Bill', amount: 60, type: 'expense', category: 'Utilities' },

  // February
  { id: '6', date: '2025-02-05', description: 'Acme Inc. - February', amount: 5500, type: 'income', category: 'Salary' },
  { id: '7', date: '2025-02-20', description: 'Stock Dividends', amount: 350, type: 'income', category: 'Investments' },
  { id: '8', date: '2025-02-10', description: 'February Rent', amount: 1800, type: 'expense', category: 'Rent/Mortgage' },
  { id: '9', date: '2025-02-18', description: 'Valentine\'s Day Dinner', amount: 120, type: 'expense', category: 'Dining Out' },
  { id: '10', date: '2025-02-28', description: 'New Tech Gadget', amount: 400, type: 'expense', category: 'Shopping' },

  // March
  { id: '11', date: '2025-03-05', description: 'Acme Inc. - March', amount: 5600, type: 'income', category: 'Salary' },
  { id: '12', date: '2025-03-18', description: 'Consulting Gig', amount: 2000, type: 'income', category: 'Freelance' },
  { id: '13', date: '2025-03-10', description: 'March Rent', amount: 1800, type: 'expense', category: 'Rent/Mortgage' },
  { id: '14', date: '2025-03-22', description: 'Electricity Bill', amount: 90, type: 'expense', category: 'Utilities' },
  { id: '15', date: '2025-03-30', description: 'Weekend Trip', amount: 500, type: 'expense', category: 'Entertainment' },
];
