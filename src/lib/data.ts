
import type { Transaction, Investment } from '@/lib/types';

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

export const initialInvestments: Investment[] = [
  { id: '1', name: 'Tech Giant Inc.', purchaseDate: '2024-01-15', initialValue: 5000, currentValue: 7500 },
  { id: '2', name: 'Green Energy Co.', purchaseDate: '2024-03-22', initialValue: 3000, currentValue: 2800 },
  { id: '3', name: 'BioPharma Solutions', purchaseDate: '2024-06-10', initialValue: 10000, currentValue: 12500 },
  { id: '4', name: 'Robotics Startup', purchaseDate: '2024-09-01', initialValue: 7500, currentValue: 9000 },
];

export const creditScoreData = {
  currentScore: 780,
  lastUpdated: "June 1, 2024",
};

export const scoreFactors = [
  { name: 'Payment History', value: 95, impact: 'High', description: 'Consistency of on-time payments.' },
  { name: 'Credit Card Utilization', value: 75, impact: 'High', description: 'The ratio of your credit card balance to your credit limit.' },
  { name: 'Credit Age', value: 80, impact: 'Medium', description: 'The average age of all your credit accounts.' },
  { name: 'Total Accounts', value: 90, impact: 'Low', description: 'The number of credit accounts you have.' },
  { name: 'Credit Inquiries', value: 85, impact: 'Low', description: 'The number of times you\'ve applied for new credit recently.' },
];

export const scoreHistory = [
  { date: '2023-07-01', score: 720 },
  { date: '2023-08-01', score: 725 },
  { date: '2023-09-01', score: 730 },
  { date: '2023-10-01', score: 740 },
  { date: '2023-11-01', score: 745 },
  { date: '2023-12-01', score: 750 },
  { date: '2024-01-01', score: 755 },
  { date: '2024-02-01', score: 760 },
  { date: '2024-03-01', score: 765 },
  { date: '2024-04-01', score: 770 },
  { date: '2024-05-01', score: 775 },
  { date: '2024-06-01', score: 780 },
];

export const improvementTips = [
    {
        title: "Pay Your Bills On Time",
        description: "Late payments can have a significant negative impact on your credit score. Set up automatic payments to avoid missing a due date.",
        priority: "High"
    },
    {
        title: "Keep Credit Card Balances Low",
        description: "High credit utilization can lower your score. Aim to use less than 30% of your available credit.",
        priority: "High"
    },
    {
        title: "Dispute Inaccuracies",
        description: "Check your credit report for errors. Disputing and removing inaccuracies can quickly improve your score.",
        priority: "Medium"
    },
    {
        title: "Avoid Opening Too Many New Accounts",
        description: "Each new credit application results in a hard inquiry, which can temporarily lower your score.",
        priority: "Low"
    },
];
