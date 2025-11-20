import { DashboardHeader } from '../components/dashboard/DashboardHeader';

export default function ProcessesPage() {
  return (
    <div
      id="dashContainer"
      className="min-h-screen w-full flex flex-col items-center justify-start px-4 py-6 sm:px-6 bg-gradient-to-br from-brand-100 to-brand-300 dark:from-slate-900 dark:to-slate-950 transition-all pb-28">
      <div className="w-full max-w-6xl flex flex-col items-center gap-6">
        <DashboardHeader />

        <h1 className="text-3xl font-bold text-brand-700 dark:text-brand-400 mt-10 text-center">
          Process is a Work In Progress
        </h1>
      </div>
    </div>
  );
}
