import React from 'react';
import { TransactionSummary } from '@/types';
import { formatCurrency } from '@/lib/utils';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

interface DashboardSummaryProps {
  summary: TransactionSummary;
}

const DashboardSummary: React.FC<DashboardSummaryProps> = ({ summary }) => {
  const { totalIncome, totalExpense, balance, categorySummary } = summary;
  
  // Prepare chart data for expenses by category
  const expenseCategories = Object.keys(categorySummary).filter(
    (category) => categorySummary[category as keyof typeof categorySummary] > 0
  );
  
  const chartData = {
    labels: expenseCategories.map(
      (cat) => cat.charAt(0).toUpperCase() + cat.slice(1).replace('-', ' ')
    ),
    datasets: [
      {
        data: expenseCategories.map(
          (cat) => categorySummary[cat as keyof typeof categorySummary]
        ),
        backgroundColor: [
          '#38bdf8',  // blue
          '#fb7185',  // red
          '#34d399',  // green
          '#f59e0b',  // yellow
          '#8b5cf6',  // purple
          '#ec4899',  // pink
          '#10b981',  // emerald
          '#6366f1',  // indigo
          '#f43f5e',  // rose
          '#64748b',  // slate
          '#84cc16',  // lime
          '#475569',  // slate
        ],
        borderWidth: 1,
      },
    ],
  };
  
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          font: {
            size: 12,
          },
        },
      },
    },
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <div className="card bg-white">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Income</h3>
        <p className="text-2xl font-bold text-green-600">{formatCurrency(totalIncome)}</p>
      </div>
      
      <div className="card bg-white">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Expense</h3>
        <p className="text-2xl font-bold text-red-600">{formatCurrency(totalExpense)}</p>
      </div>
      
      <div className="card bg-white">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Balance</h3>
        <p className={`text-2xl font-bold ${
          balance >= 0 ? 'text-green-600' : 'text-red-600'
        }`}>
          {formatCurrency(balance)}
        </p>
      </div>
      
      <div className="card md:col-span-3 bg-white">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Spending by Category</h3>
        <div className="h-64">
          <Doughnut data={chartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default DashboardSummary; 