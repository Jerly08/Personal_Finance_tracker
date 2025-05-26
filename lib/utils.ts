import { format, parseISO, startOfMonth, endOfMonth, isSameMonth, isSameYear } from 'date-fns';
import { Category, Transaction, TransactionSummary } from '@/types';

export const generateId = () => {
  return Math.random().toString(36).substring(2, 9);
};

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR'
  }).format(amount);
};

export const formatDate = (dateString: string) => {
  const date = parseISO(dateString);
  return format(date, 'dd MMM yyyy');
};

export const filterTransactionsByMonth = (transactions: Transaction[], date: Date) => {
  const start = startOfMonth(date);
  const end = endOfMonth(date);
  
  return transactions.filter(transaction => {
    const transactionDate = parseISO(transaction.date);
    return (
      isSameMonth(transactionDate, start) && 
      isSameYear(transactionDate, start)
    );
  });
};

export const filterTransactionsByCategory = (transactions: Transaction[], category: Category | 'all') => {
  if (category === 'all') return transactions;
  return transactions.filter(transaction => transaction.category === category);
};

export const calculateTransactionSummary = (transactions: Transaction[]): TransactionSummary => {
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
    
  const totalExpense = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
    
  const categorySummary: Record<Category, number> = {} as Record<Category, number>;
  
  transactions.forEach(transaction => {
    if (!categorySummary[transaction.category]) {
      categorySummary[transaction.category] = 0;
    }
    
    if (transaction.type === 'income') {
      categorySummary[transaction.category] += transaction.amount;
    } else {
      categorySummary[transaction.category] += transaction.amount;
    }
  });
  
  return {
    totalIncome,
    totalExpense,
    balance: totalIncome - totalExpense,
    categorySummary
  };
}; 