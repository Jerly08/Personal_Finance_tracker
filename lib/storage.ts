import { Transaction } from '@/types';

const TRANSACTIONS_KEY = 'personal_finance_transactions';

export const getTransactions = (): Transaction[] => {
  if (typeof window === 'undefined') return [];
  
  try {
    const savedTransactions = localStorage.getItem(TRANSACTIONS_KEY);
    return savedTransactions ? JSON.parse(savedTransactions) : [];
  } catch (error) {
    console.error('Error getting transactions from localStorage:', error);
    return [];
  }
};

export const saveTransactions = (transactions: Transaction[]): void => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(TRANSACTIONS_KEY, JSON.stringify(transactions));
  } catch (error) {
    console.error('Error saving transactions to localStorage:', error);
  }
};

export const addTransaction = (transaction: Transaction): Transaction[] => {
  const transactions = getTransactions();
  const updatedTransactions = [transaction, ...transactions];
  saveTransactions(updatedTransactions);
  return updatedTransactions;
};

export const deleteTransaction = (id: string): Transaction[] => {
  const transactions = getTransactions();
  const updatedTransactions = transactions.filter(transaction => transaction.id !== id);
  saveTransactions(updatedTransactions);
  return updatedTransactions;
};

export const updateTransaction = (updatedTransaction: Transaction): Transaction[] => {
  const transactions = getTransactions();
  const updatedTransactions = transactions.map(transaction => 
    transaction.id === updatedTransaction.id ? updatedTransaction : transaction
  );
  saveTransactions(updatedTransactions);
  return updatedTransactions;
}; 