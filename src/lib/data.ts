import type { Transaction } from '@/lib/types';

export const initialTransactions: Transaction[] = [
  { id: '1', date: '2025-01-09', description: 'Acme Inc.', amount: 6500, type: 'income', category: 'Salary' },
  { id: '2', date: '2025-01-09', description: 'Design Agency', amount: 1000, type: 'income', category: 'Freelance' },
  { id: '3', date: '2025-01-09', description: 'Brokerage Account', amount: 500, type: 'income', category: 'Investments' },
  { id: '4', date: '2025-02-02', description: 'Acme Inc.', amount: 5000, type: 'income', category: 'Salary' },
  { id: '5', date: '2025-02-02', description: 'Digital Store', amount: 1000, type: 'income', category: 'Freelance' },
  
  { id: '6', date: '2025-01-15', description: 'Joe\'s Pizza', amount: 25, type: 'expense', category: 'Dining Out' },
  { id: '7', date: '2025-01-15', description: 'Mortgage', amount: 2500, type: 'expense', category: 'Rent/Mortgage' },
  { id: '8', date: '2025-01-15', description: 'Hydro Inc.', amount: 120, type: 'expense', category: 'Utilities' },
  { id: '9', date: '2025-01-15', description: 'Gym Clothes', amount: 200, type: 'expense', category: 'Retail' },
  { id: '10', date: '2025-02-20', description: 'Mortgage', amount: 2500, type: 'expense', category: 'Rent/Mortgage' },
  { id: '11', date: '2025-03-20', description: 'Mortgage', amount: 2500, type: 'expense', category: 'Rent/Mortgage' },
  
  { id: '12', date: '2025-04-10', description: 'Acme Inc.', amount: 6500, type: 'income', category: 'Salary' },
  { id: '13', date: '2025-05-15', description: 'Client Project', amount: 2500, type: 'income', category: 'Freelance' },
  { id: '14', date: '2025-06-05', description: 'Stock Dividend', amount: 300, type: 'income', category: 'Investments' },
  { id: '15', date: '2025-04-18', description: 'Car Insurance', amount: 150, type: 'expense', category: 'Utilities' },
  { id: '16', date: '2025-05-22', description: 'Groceries', amount: 400, type: 'expense', category: 'Groceries' },
  { id: '17', date: '2025-06-25', description: 'Movie Night', amount: 50, type: 'expense', category: 'Entertainment' },
  
  // Q3 Transactions
  { id: '18', date: '2025-07-10', description: 'Acme Inc.', amount: 6500, type: 'income', category: 'Salary' },
  { id: '19', date: '2025-08-15', description: 'Side Gig', amount: 1200, type: 'income', category: 'Freelance' },
  { id: '20', date: '2025-09-05', description: 'Acme Inc.', amount: 6500, type: 'income', category: 'Salary' },
  { id: '21', date: '2025-07-18', description: 'Groceries', amount: 350, type: 'expense', category: 'Groceries' },
  { id: '22', date: '2025-08-22', description: 'Internet Bill', amount: 80, type: 'expense', category: 'Utilities' },
  { id: '23', date: '2025-09-25', description: 'Mortgage', amount: 2500, type: 'expense', category: 'Rent/Mortgage' },

  // Q4 Transactions
  { id: '24', date: '2025-10-10', description: 'Acme Inc.', amount: 6500, type: 'income', category: 'Salary' },
  { id: '25', date: '2025-11-15', description: 'Consulting Work', amount: 3000, type: 'income', category: 'Freelance' },
  { id: '26', date: '2025-12-05', description: 'Stock Dividend', amount: 450, type: 'income', category: 'Investments' },
  { id: '27', date: '2025-10-18', description: 'Health Insurance', amount: 300, type: 'expense', category: 'Healthcare' },
  { id: '28', date: '2025-11-22', description: 'Holiday Shopping', amount: 700, type: 'expense', category: 'Retail' },
  { id: '29', date: '2025-12-25', description: 'Mortgage', amount: 2500, type: 'expense', category: 'Rent/Mortgage' },
];
