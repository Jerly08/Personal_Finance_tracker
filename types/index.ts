export type TransactionType = 'income' | 'expense';

export type Category = 
  | 'salary' 
  | 'investment' 
  | 'side-hustle' 
  | 'gift' 
  | 'food' 
  | 'transportation' 
  | 'housing' 
  | 'utilities' 
  | 'entertainment' 
  | 'health' 
  | 'education' 
  | 'other';

export interface Transaction {
  id: string;
  amount: number;
  description: string;
  date: string;
  category: Category;
  type: TransactionType;
}

export interface TransactionSummary {
  totalIncome: number;
  totalExpense: number;
  balance: number;
  categorySummary: Record<Category, number>;
}

export const INCOME_CATEGORIES: Category[] = ['salary', 'investment', 'side-hustle', 'gift', 'other'];
export const EXPENSE_CATEGORIES: Category[] = ['food', 'transportation', 'housing', 'utilities', 'entertainment', 'health', 'education', 'other']; 