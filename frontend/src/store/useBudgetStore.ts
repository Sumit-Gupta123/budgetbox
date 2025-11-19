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

      // CORRECTED SYNC LOGIC
      syncData: async () => {
        const state = get();
        
        // 1. Get the URL from Vercel Environment, or fallback to localhost
        // We also remove any trailing slash just in case to prevent errors
        const envUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '');
        const API_URL = envUrl || 'http://localhost:4000';
        
        try {
          set({ syncStatus: 'pending' });

          // 2. Prepare payload
          const payload = {
            income: state.income,
            expenses: state.expenses,
            lastUpdated: state.lastUpdated
          };

          console.log(`Attempting sync to: ${API_URL}/budget/sync`);

          // 3. Send to Backend
          const response = await fetch(`${API_URL}/budget/sync`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          });

          if (!response.ok) {
            throw new Error(`Server responded with ${response.status}`);
          }

          // 4. On Success
          const data = await response.json();
          console.log('Synced successfully:', data);
          set({ syncStatus: 'synced' });

        } catch (error) {
          console.error('Sync error:', error);
          // Keep status as pending so user knows it failed
          set({ syncStatus: 'pending' }); 
        }
      },
    }),
    {
      name: 'budgetbox-local-db',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
