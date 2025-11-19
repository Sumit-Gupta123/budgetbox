'use client';

import { useBudgetStore } from '@/store/useBudgetStore';
import { Cloud, CloudOff, RefreshCw, CheckCircle2 } from 'lucide-react';

export default function SyncIndicator() {
  // @ts-ignore - ignoring type mismatch for rapid dev
  const { syncStatus, syncData } = useBudgetStore();

  const statusConfig = {
    'synced': { icon: CheckCircle2, text: 'Synced', color: 'text-green-600 bg-green-50 hover:bg-green-100' },
    'pending': { icon: RefreshCw, text: 'Sync Pending', color: 'text-amber-600 bg-amber-50 hover:bg-amber-100' },
    'local-only': { icon: CloudOff, text: 'Local Only', color: 'text-gray-500 bg-gray-100 hover:bg-gray-200' },
  };

  const current = statusConfig[syncStatus] || statusConfig['local-only'];
  const Icon = current.icon;

  return (
    <button 
      onClick={() => syncData()}
      className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${current.color}`}
    >
      <Icon className={`w-4 h-4 ${syncStatus === 'pending' ? 'animate-spin' : ''}`} />
      <span>{current.text}</span>
    </button>
  );
}