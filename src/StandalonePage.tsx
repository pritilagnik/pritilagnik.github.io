import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';

// Tablet-width minimum: smaller screens scroll horizontally instead of squeezing the layout.
export const StandalonePage: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ThemeProvider>
    <LanguageProvider>
      <div className="min-h-screen min-w-[768px] overflow-x-auto bg-amber-50/20 dark:bg-stone-950 text-stone-900 dark:text-stone-100">
        <div className="border-b border-amber-200/50 dark:border-stone-800 px-6 h-14 flex items-center">
          <a href="./" className="inline-flex items-center gap-2 text-sm font-semibold text-amber-700 dark:text-amber-400 hover:underline">
            <ArrowLeft className="w-4 h-4" /> Back to Priti-Lagnik 2026
          </a>
        </div>
        {children}
      </div>
    </LanguageProvider>
  </ThemeProvider>
);
