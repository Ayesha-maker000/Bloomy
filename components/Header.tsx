import React from 'react';
import type { View } from '../types';
import { BloomyMascot, SettingsIcon, SparkleIcon, WindIcon } from './Icons';

interface HeaderProps {
  currentView: View;
  setView: (view: View) => void;
  resetChat: () => void;
  onOpenSettings: () => void;
  onShowAffirmation: () => void;
  onOpenBreathingExercise: () => void;
}

export const Header: React.FC<HeaderProps> = ({ currentView, setView, resetChat, onOpenSettings, onShowAffirmation, onOpenBreathingExercise }) => {
  const handleNavClick = (view: View) => {
      if (view === 'mood-check-in') {
          resetChat();
      } else {
          setView(view);
      }
  }

  const NavButton: React.FC<{ view: View, label: string }> = ({ view, label }) => {
    const isActive = currentView === view;
    return (
        <button
            onClick={() => handleNavClick(view)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 transform active:scale-95 ${
                isActive
                ? 'bg-brand-primary text-white shadow-md'
                : 'bg-bg-secondary/70 hover:bg-bg-secondary text-text-accent'
            }`}
        >
            {label}
        </button>
    )
  }

  return (
    <header className="bg-bg-accent backdrop-blur-md shadow-sm p-3 sticky top-0 z-20">
      <div className="max-w-4xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-3">
          <BloomyMascot className="w-12 h-12" />
          <div className="flex items-baseline gap-1.5">
            <h1 className="text-2xl font-bold text-text-accent">Bloomy</h1>
            <span className="text-xs font-semibold text-text-accent/80 tracking-wider uppercase">beta</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
            {/* Prominent New Chat Button */}
            <button
                onClick={resetChat}
                className="px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 bg-brand-primary text-white shadow-md hover:bg-brand-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-secondary dark:focus:ring-offset-dark-bg transform hover:scale-105 active:scale-95"
            >
                New Chat
            </button>
            <nav className="flex items-center gap-2 p-1 bg-bg-primary rounded-full">
              <NavButton view="garden" label="My Garden" />
            </nav>
            <button
                onClick={onShowAffirmation}
                className="p-2 rounded-full bg-bg-secondary/70 hover:bg-bg-secondary text-yellow-500 transition-all duration-300 transform hover:scale-110 active:scale-95"
                aria-label="Show a positive affirmation"
            >
                <SparkleIcon className="w-7 h-7" />
            </button>
             <button
                onClick={onOpenBreathingExercise}
                className="p-2 rounded-full bg-bg-secondary/70 hover:bg-bg-secondary text-blue-400 transition-all duration-300 transform hover:scale-110 active:scale-95"
                aria-label="Start breathing exercise"
            >
                <WindIcon className="w-7 h-7" />
            </button>
             <button
                onClick={onOpenSettings}
                className="p-2 rounded-full bg-bg-secondary/70 hover:bg-bg-secondary text-text-accent transition-all duration-300 transform hover:scale-110 active:scale-95"
                aria-label="Open settings"
            >
                <SettingsIcon className="w-7 h-7" />
            </button>
        </div>
      </div>
    </header>
  );
};