// frontend/src/app/page.tsx (or frontend/app/page.tsx)
import BudgetForm from '@/components/BudgetForm';
import SyncIndicator from '@/components/SyncIndicator';
import Dashboard from '@/components/Dashboard';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* Header Section */}
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">BudgetBox</h1>
            <p className="text-gray-500">Local-first budget tracker</p>
          </div>
          <SyncIndicator />
        </header>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Column: Input Form */}
          <div className="lg:col-span-1">
            <BudgetForm />
          </div>

          {/* Right Column: Analytics Dashboard */}
          <div className="lg:col-span-2">
             <Dashboard />
          </div>

        </div>

      </div>
    </main>
  );
}