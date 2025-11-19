// src/hooks/useBudgetAnalytics.ts
import { useBudgetStore } from '@/store/useBudgetStore';

export function useBudgetAnalytics() {
  const { income, expenses } = useBudgetStore();

  // 1. Calculate Totals
  const totalExpenses = Object.values(expenses).reduce((acc, curr) => acc + curr, 0);
  const savings = income - totalExpenses;
  
  // 2. Burn Rate (Expenses / Income)
  const burnRate = income > 0 ? (totalExpenses / income) * 100 : 0;

  // 3. Prediction (Simple Linear Projection)
  // If today is day 15 and you spent $500, you are on track to spend $1000 by day 30.
  const date = new Date();
  const dayOfMonth = date.getDate();
  const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  
  // Avoid division by zero or huge numbers on day 1
  const projectedSpend = dayOfMonth > 0 
    ? (totalExpenses / dayOfMonth) * daysInMonth 
    : totalExpenses;

  // 4. Generate Warnings (Rule Engine)
  const warnings: string[] = [];

  if (savings < 0) {
    warnings.push("⚠️ Critical: Your expenses exceed your income!");
  }
  
  if (income > 0) {
    if (expenses.food > (income * 0.40)) {
      warnings.push("🍔 Food is consuming > 40% of your income.");
    }
    if (expenses.subscriptions > (income * 0.30)) {
      warnings.push("📺 Subscription spend is dangerously high (>30%).");
    }
  }

  return {
    totalExpenses,
    savings,
    burnRate,
    projectedSpend,
    warnings,
    chartData: [
      { name: 'Bills', value: expenses.monthlyBills, fill: '#6366f1' }, // Indigo
      { name: 'Food', value: expenses.food, fill: '#ef4444' },         // Red
      { name: 'Transport', value: expenses.transport, fill: '#f59e0b' }, // Amber
      { name: 'Subs', value: expenses.subscriptions, fill: '#8b5cf6' }, // Violet
      { name: 'Misc', value: expenses.miscellaneous, fill: '#64748b' }, // Slate
    ].filter(item => item.value > 0) // Only show categories with data
  };
}