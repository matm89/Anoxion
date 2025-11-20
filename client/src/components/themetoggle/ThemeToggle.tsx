import { useThemeStore } from '../../context/theme';
import { VscColorMode } from 'react-icons/vsc';

interface Props {
  className?: string;
}

export default function ThemeToggle({ className = '' }: Props) {
  const { toggleTheme, mode } = useThemeStore();

  return (
    <button
      onClick={toggleTheme}
      title="Toggle Dark Mode"
      className={`p-2 rounded-full bg-white/50 dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-700 transition-all shadow-sm border border-transparent dark:border-slate-700 ${className}`}>
      <VscColorMode size={24} className={mode === 'dark' ? 'text-brand-400' : 'text-brand-700'} />
    </button>
  );
}
