// src/app/page.tsx
import BudgetForm from '@/components/BudgetForm';
import SyncIndicator from '@/components/SyncIndicator';
import Dashboard from '@/components/Dashboard'; // <-- Import this

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-5xl mx-auto space-y-6"> {/* Changed width to 5xl for better spacing */}
        
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">BudgetBox</h1>
            <p className="text-gray-500">Local-first budget tracker</p>
          </div>
          <SyncIndicator />
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Col: Form */}
          <div className="lg:col-span-1">
            <BudgetForm />
          </div>

          {/* Right Col: Analytics */}
          <div className="lg:col-span-2">
             <Dashboard /> {/* <-- Use the component here */}
          </div>
        </div>

      </div>
    </main>
  );
}