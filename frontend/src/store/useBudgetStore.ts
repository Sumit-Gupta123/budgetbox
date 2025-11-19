// src/store/useBudgetStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { BudgetStore } from '@/types/budget';

// Extend the interface to include the sync action
interface BudgetStoreWithActions extends BudgetStore {
  syncData: () => Promise<void>;
}

export const useBudgetStore = create<BudgetStoreWithActions>()(
  persist(
    (set, get) => ({
      // Initial State
      income: 0,
      expenses: {
        monthlyBills: 0,
        food: 0,
        transport: 0,
        subscriptions: 0,
        miscellaneous: 0,
      },
      lastUpdated: Date.now(),
      syncStatus: 'local-only',

      // Actions
      updateIncome: (amount) =>
        set({
          income: amount,
          lastUpdated: Date.now(),
          syncStatus: 'pending',
        }),

      updateExpense: (category, amount) =>
        set((state) => ({
          expenses: { ...state.expenses, [category]: amount },
          lastUpdated: Date.now(),
          syncStatus: 'pending',
        })),

      setSyncStatus: (status) => set({ syncStatus: status }),

      // NEW: Sync Logic
      syncData: async () => {
        const state = get();
        
        try {
          set({ syncStatus: 'pending' }); // Show spinner state if you had one

          // 1. Prepare payload (exclude functions)
          const payload = {
            income: state.income,
            expenses: state.expenses,
            lastUpdated: state.lastUpdated
          };

          // 2. Send to Backend
          const response = await fetch('http://localhost:4000/budget/sync', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          });

          if (!response.ok) throw new Error('Sync failed');

          // 3. On Success
          const data = await response.json();
          console.log('Synced successfully:', data);
          set({ syncStatus: 'synced' });

        } catch (error) {
          console.error('Sync error:', error);
          // Keep status as pending so user knows it failed
          set({ syncStatus: 'pending' }); 
          alert('Sync failed! Is the backend running?');
        }
      },
    }),
    {
      name: 'budgetbox-local-db',
      storage: createJSONStorage(() => localStorage),
    }
  )
);