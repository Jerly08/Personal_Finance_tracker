'use client';

import React, { useState, useEffect } from 'react';
import { addTransaction, deleteTransaction, getTransactions, updateTransaction } from '@/lib/storage';
import { calculateTransactionSummary, filterTransactionsByCategory, filterTransactionsByMonth } from '@/lib/utils';
import { Category, Transaction } from '@/types';
import TransactionForm from '@/components/TransactionForm';
import TransactionList from '@/components/TransactionList';
import DashboardSummary from '@/components/DashboardSummary';
import { format } from 'date-fns';

export default function Home() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<Date>(new Date());
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>('all');
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  
  // Load transactions from localStorage on component mount
  useEffect(() => {
    const loadedTransactions = getTransactions();
    setTransactions(loadedTransactions);
  }, []);
  
  // Filter transactions when filters or transactions change
  useEffect(() => {
    let filtered = filterTransactionsByMonth(transactions, selectedMonth);
    filtered = filterTransactionsByCategory(filtered, selectedCategory);
    setFilteredTransactions(filtered);
  }, [transactions, selectedMonth, selectedCategory]);
  
  // Handle adding a new transaction
  const handleAddTransaction = (transaction: Transaction) => {
    const updatedTransactions = addTransaction(transaction);
    setTransactions(updatedTransactions);
  };
  
  // Handle updating an existing transaction
  const handleUpdateTransaction = (transaction: Transaction) => {
    const updatedTransactions = updateTransaction(transaction);
    setTransactions(updatedTransactions);
    setEditingTransaction(null);
  };
  
  // Handle deleting a transaction
  const handleDeleteTransaction = (id: string) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      const updatedTransactions = deleteTransaction(id);
      setTransactions(updatedTransactions);
    }
  };
  
  // Calculate summary for the dashboard
  const summary = calculateTransactionSummary(filteredTransactions);
  
  // Generate month options for the filter
  const getMonthOptions = () => {
    const options = [];
    const currentDate = new Date();
    
    for (let i = 0; i < 12; i++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
      options.push(date);
    }
    
    return options;
  };
  
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-bold mb-4">Add New Transaction</h2>
          {editingTransaction ? (
            <div>
              <h3 className="text-lg font-semibold mb-2">Edit Transaction</h3>
              <TransactionForm
                onSubmit={handleUpdateTransaction}
                initialValues={editingTransaction}
                onCancel={() => setEditingTransaction(null)}
                isEditing
              />
            </div>
          ) : (
            <TransactionForm onSubmit={handleAddTransaction} />
          )}
        </div>
        
        <div>
          <h2 className="text-xl font-bold mb-4">Dashboard</h2>
          <DashboardSummary summary={summary} />
        </div>
      </div>
      
      <div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 space-y-4 md:space-y-0">
          <h2 className="text-xl font-bold">Transactions</h2>
          
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
            <div>
              <label htmlFor="month-filter" className="block text-sm font-medium text-gray-700 mb-1">
                Month
              </label>
              <select
                id="month-filter"
                className="select"
                value={format(selectedMonth, 'yyyy-MM')}
                onChange={(e) => {
                  const [year, month] = e.target.value.split('-').map(Number);
                  setSelectedMonth(new Date(year, month - 1));
                }}
              >
                {getMonthOptions().map((date) => (
                  <option key={format(date, 'yyyy-MM')} value={format(date, 'yyyy-MM')}>
                    {format(date, 'MMMM yyyy')}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label htmlFor="category-filter" className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                id="category-filter"
                className="select"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value as Category | 'all')}
              >
                <option value="all">All Categories</option>
                <optgroup label="Income">
                  {['salary', 'investment', 'side-hustle', 'gift', 'other'].map((cat) => (
                    <option key={cat} value={cat}>
                      {cat.charAt(0).toUpperCase() + cat.slice(1).replace('-', ' ')}
                    </option>
                  ))}
                </optgroup>
                <optgroup label="Expense">
                  {['food', 'transportation', 'housing', 'utilities', 'entertainment', 'health', 'education', 'other'].map((cat) => (
                    <option key={cat} value={cat}>
                      {cat.charAt(0).toUpperCase() + cat.slice(1).replace('-', ' ')}
                    </option>
                  ))}
                </optgroup>
              </select>
            </div>
          </div>
        </div>
        
        <TransactionList
          transactions={filteredTransactions}
          onEdit={setEditingTransaction}
          onDelete={handleDeleteTransaction}
        />
      </div>
    </div>
  );
} 