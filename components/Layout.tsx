
import React from 'react';
import { LOGO_SVG } from '../constants';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, title }) => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="scale-75">{LOGO_SVG}</div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Estate Estimate
            </span>
          </div>
          {title && <h1 className="text-slate-600 font-medium hidden sm:block">{title}</h1>}
        </div>
      </header>
      <main className="flex-grow">
        {children}
      </main>
      <footer className="py-8 text-center text-slate-400 text-sm border-t border-slate-200 bg-white">
        © 2024 Estate Estimate • Real Estate Intelligence for Karnataka
      </footer>
    </div>
  );
};

export default Layout;
