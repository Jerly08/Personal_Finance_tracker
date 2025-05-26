# Personal Finance Tracker

A web application to track personal finances, built with Next.js and Tailwind CSS.

## Features

- Add and manage income and expense transactions
- Categorize transactions
- Filter transactions by month and category
- View financial summary with charts
- Data is stored in the browser's localStorage

## Technologies Used

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Chart.js with react-chartjs-2
- date-fns for date manipulation

## Getting Started

First, install the dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Detailed Usage Guide

### Adding Transactions

1. Go to the "Add New Transaction" section on the left side of the main page
2. Select the transaction type (Income or Expense)
3. Enter the amount
4. Provide a description
5. Select a category from the dropdown
6. Choose the transaction date
7. Click the "Add Income" or "Add Expense" button

### Viewing Your Financial Summary

The dashboard on the right side shows:
- Total income for the selected period
- Total expenses for the selected period
- Current balance (Income - Expenses)
- A pie chart showing spending by category

### Managing Transactions

1. All transactions are listed in the transactions table
2. Use the Month and Category filters to find specific transactions
3. To edit a transaction, click the "Edit" button next to it
4. To delete a transaction, click the "Delete" button (you'll be asked to confirm)

### Category Types

**Income Categories:**
- Salary
- Investment
- Side Hustle
- Gift
- Other

**Expense Categories:**
- Food
- Transportation
- Housing
- Utilities
- Entertainment
- Health
- Education
- Other

## Important Notes About localStorage

### How Data is Stored

This application uses your browser's localStorage to save all transaction data. This means:

1. **Data Persistence**: Your data will remain even after closing the browser or restarting your computer.

2. **Private to Your Device**: The data is stored only on the device you're using and isn't synced to the cloud or other devices.

3. **Browser-Specific**: If you use a different browser, your data won't be available there.

4. **Storage Limits**: localStorage has a limit of about 5MB per domain, which is plenty for most users' transaction history.

### Data Loss Scenarios

Your transaction data may be lost in the following situations:

1. **Clearing Browser Data**: If you clear your browser's localStorage, cookies, or site data, all transaction information will be erased.

2. **Private/Incognito Browsing**: Data stored during private browsing sessions is deleted when you close the window.

3. **Browser Updates**: In rare cases, major browser updates might affect localStorage data.

### Tips for Data Protection

1. **Regular Exports**: Currently, there's no built-in export feature. Consider taking screenshots of important summaries.

2. **Don't Clear Site Data**: Be careful when clearing browser data to avoid accidentally removing your financial records.

3. **Avoid Using Multiple Devices**: Since the data doesn't sync between devices, try to use the app consistently on the same device. 