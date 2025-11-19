// src/types/budget.ts

export interface BudgetData {
  income: number;
  expenses: {
    monthlyBills: number;
    food: number;
    transport: number;
    subscriptions: number;
    miscellaneous: number;
  };
}

export type SyncStatus = 'synced' | 'pending' | 'local-only';

export interface BudgetStore extends BudgetData {
  // Metadata for sync
  lastUpdated: number; // Timestamp
  syncStatus: SyncStatus;
  
  // Actions
  updateIncome: (amount: number) => void;
  updateExpense: (category: keyof BudgetData['expenses'], amount: number) => void;
  setSyncStatus: (status: SyncStatus) => void;
}