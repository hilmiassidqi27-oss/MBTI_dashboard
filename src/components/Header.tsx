import React from 'react';
import { Brain, Settings, ShieldCheck, UserCheck } from 'lucide-react';

interface HeaderProps {
  onAdminToggle: () => void;
  onHomeClick: () => void;
  currentStep: string;
}

export const Header: React.FC<HeaderProps> = ({ onAdminToggle, onHomeClick, currentStep }) => {
  return (
    <header className="bg-background border-b border-surface-border w-full px-6 h-16 max-w-7xl mx-auto flex justify-between items-center sticky top-0 z-40 backdrop-blur-md bg-opacity-90">
      <div className="flex items-center space-x-3 cursor-pointer group" onClick={onHomeClick}>
        <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 transition-all">
          <Brain className="text-primary w-6 h-6" />
        </div>
        <div>
          <h1 className="font-bold text-lg text-text-primary tracking-tight group-hover:text-primary transition-colors">
            PT. Dian Pandu Pratama
          </h1>
          <p className="text-xs text-text-secondary hidden md:block">
            Psychometric & Personality Assessment Platform
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {currentStep === 'admin' ? (
          <button
            onClick={onHomeClick}
            className="flex items-center space-x-2 text-xs font-semibold bg-surface-container hover:bg-surface-container-high border border-surface-border text-primary px-3 py-1.5 rounded-lg transition-all"
          >
            <UserCheck className="w-4 h-4" />
            <span>Portal Candidate</span>
          </button>
        ) : (
          <button
            onClick={onAdminToggle}
            className="flex items-center space-x-2 text-xs font-semibold bg-surface-container hover:bg-surface-container-high border border-surface-border text-text-secondary hover:text-primary px-3 py-1.5 rounded-lg transition-all"
            title="Akses Portal Administrator HR"
          >
            <ShieldCheck className="w-4 h-4 text-primary" />
            <span className="hidden sm:inline">Admin Registry</span>
            <Settings className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </header>
  );
};
