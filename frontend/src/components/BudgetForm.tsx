// src/components/BudgetForm.tsx
'use client';

import { useBudgetStore } from '@/store/useBudgetStore';
import { DollarSign } from 'lucide-react';

export default function BudgetForm() {
  const { income, expenses, updateIncome, updateExpense } = useBudgetStore();

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <h2 className="text-xl font-bold mb-6 text-gray-800">Monthly Budget</h2>
      
      <div className="space-y-4">
        {/* Income Field */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Monthly Income</label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <input
              type="number"
              value={income || ''}
              onChange={(e) => updateIncome(Number(e.target.value))}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="0.00"
            />
          </div>
        </div>

        <hr className="my-4 border-gray-100" />

        {/* Expense Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(expenses).map(([key, value]) => (
            <div key={key}>
              <label className="block text-sm font-medium text-gray-600 mb-1 capitalize">
                {key.replace(/([A-Z])/g, ' $1').trim()} {/* Formats 'monthlyBills' to 'monthly Bills' */}
              </label>
              <input
                type="number"
                value={value || ''}
                onChange={(e) => 
                  updateExpense(key as keyof typeof expenses, Number(e.target.value))
                }
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-400 focus:outline-none"
                placeholder="0.00"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}