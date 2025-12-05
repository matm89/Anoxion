import ThemeToggle from '../themetoggle/ThemeToggle';

export function DashboardHeader() {
  return (
    <div id="header-container" className="relative w-full flex flex-col items-center mb-6 mt-4">
      <div className="flex items-center gap-3">
        <ThemeToggle className="absolute right-0 top-4" />

        <img
          src="/logo.png"
          alt="logo"
          className="h-20 sm:h-28 w-auto mb-4 drop-shadow-lg object-contain"
        />
      </div>
    </div>
  );
}
