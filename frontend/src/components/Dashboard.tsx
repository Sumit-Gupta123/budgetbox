// src/components/Dashboard.tsx
'use client';

import { useBudgetAnalytics } from '@/hooks/useBudgetAnalytics';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

export default function Dashboard() {
  const { savings, burnRate, warnings, chartData, projectedSpend } = useBudgetAnalytics();

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-full flex flex-col">
      <h2 className="text-xl font-bold mb-6 text-gray-800">Analytics</h2>

      {/* 1. Top Metrics Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-600 mb-1">Savings Potential</p>
          <p className={`text-2xl font-bold ${savings < 0 ? 'text-red-600' : 'text-blue-900'}`}>
            ${savings.toLocaleString()}
          </p>
        </div>
        <div className="p-4 bg-purple-50 rounded-lg">
          <p className="text-sm text-purple-600 mb-1">Burn Rate</p>
          <p className="text-2xl font-bold text-purple-900">
            {burnRate.toFixed(1)}%
          </p>
        </div>
      </div>

      {/* 2. Warnings Area */}
      {warnings.length > 0 && (
        <div className="mb-6 p-3 bg-red-50 border border-red-100 rounded-lg">
          {warnings.map((msg, i) => (
            <p key={i} className="text-sm text-red-600 font-medium flex items-center gap-2">
              {msg}
            </p>
          ))}
        </div>
      )}

      {/* 3. Charts & Prediction */}
      <div className="flex-1 min-h-[250px] relative">
        {chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip />
              <Legend verticalAlign="bottom" height={36}/>
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-full flex items-center justify-center text-gray-400 text-sm">
            Add expenses to see breakdown
          </div>
        )}
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-100 text-center">
        <p className="text-xs text-gray-400 uppercase tracking-wider">Month-End Forecast</p>
        <p className="text-lg font-semibold text-gray-700">${projectedSpend.toFixed(0)}</p>
      </div>
    </div>
  );
}