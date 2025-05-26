import React, { useState } from 'react';
import { Category, EXPENSE_CATEGORIES, INCOME_CATEGORIES, Transaction, TransactionType } from '@/types';
import { generateId } from '@/lib/utils';

interface TransactionFormProps {
  onSubmit: (transaction: Transaction) => void;
  initialValues?: Transaction;
  onCancel?: () => void;
  isEditing?: boolean;
}

const TransactionForm: React.FC<TransactionFormProps> = ({
  onSubmit,
  initialValues,
  onCancel,
  isEditing = false,
}) => {
  const [type, setType] = useState<TransactionType>(initialValues?.type || 'expense');
  const [amount, setAmount] = useState(initialValues?.amount?.toString() || '');
  const [description, setDescription] = useState(initialValues?.description || '');
  const [date, setDate] = useState(initialValues?.date || new Date().toISOString().slice(0, 10));
  const [category, setCategory] = useState<Category>(initialValues?.category || 'other');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const transaction: Transaction = {
      id: initialValues?.id || generateId(),
      amount: parseFloat(amount),
      description,
      date,
      category,
      type,
    };
    
    onSubmit(transaction);
    
    if (!isEditing) {
      // Reset form for new entries
      setType('expense');
      setAmount('');
      setDescription('');
      setDate(new Date().toISOString().slice(0, 10));
      setCategory('other');
    }
  };

  // Get categories based on transaction type
  const categories = type === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;

  return (
    <form onSubmit={handleSubmit} className="card space-y-4">
      <div>
        <div className="flex space-x-4 mb-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Type
            </label>
            <div className="flex space-x-2">
              <button
                type="button"
                className={`flex-1 py-2 px-4 rounded-md ${
                  type === 'expense'
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-200 text-gray-800'
                }`}
                onClick={() => setType('expense')}
              >
                Expense
              </button>
              <button
                type="button"
                className={`flex-1 py-2 px-4 rounded-md ${
                  type === 'income'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-200 text-gray-800'
                }`}
                onClick={() => setType('income')}
              >
                Income
              </button>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
            Amount
          </label>
          <input
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0"
            className="input"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <input
            id="description"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            className="input"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value as Category)}
            className="select"
            required
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1).replace('-', ' ')}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
            Date
          </label>
          <input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="input"
            required
          />
        </div>
      </div>

      <div className="flex justify-end space-x-2">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="btn btn-secondary"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className={`btn ${type === 'income' ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-red-600 hover:bg-red-700 text-white'}`}
        >
          {isEditing ? 'Update' : 'Add'} {type === 'income' ? 'Income' : 'Expense'}
        </button>
      </div>
    </form>
  );
};

export default TransactionForm; 