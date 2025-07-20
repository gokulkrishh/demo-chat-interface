'use client';

import { useState } from 'react';
import { Mode } from '../lib/types';
import { MODE_DESCRIPTIONS } from '../lib/constants';

interface ModeToggleProps {
  selectedMode: Mode;
  onModeChange: (mode: Mode) => void;
}

const ModeToggle = ({ selectedMode, onModeChange }: ModeToggleProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const modes: {
    id: Mode;
    label: string;
    icon: string;
    description: string;
  }[] = [
    {
      id: 'chat',
      label: 'Chat',
      icon: '💬',
      description: 'Casual conversation',
    },
    {
      id: 'research',
      label: 'Research',
      icon: '🔍',
      description: 'With citations',
    },
    { id: 'web', label: 'Web', icon: '🌐', description: 'Real-time search' },
  ];

  const handleModeSelect = (mode: Mode) => {
    onModeChange(mode);
    setIsOpen(false);
  };

  const currentMode = modes.find((m) => m.id === selectedMode) || modes[0];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span className="text-base">{currentMode.icon}</span>
        <span>{currentMode.label}</span>
        <svg
          className={`w-4 h-4 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
          <div className="absolute top-full right-0 mt-2 w-64 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl z-20 overflow-hidden">
            <div className="p-2">
              <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide px-3 py-2">
                Choose Mode
              </div>
              {modes.map((mode) => (
                <button
                  key={mode.id}
                  className={`w-full p-3 rounded-lg transition-all duration-200 text-left ${
                    selectedMode === mode.id
                      ? 'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800'
                      : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                  onClick={() => handleModeSelect(mode.id)}
                  tabIndex={0}
                  aria-label={`Switch to ${mode.label} mode`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleModeSelect(mode.id);
                    }
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-lg">{mode.icon}</span>
                      <div>
                        <div className="font-medium text-sm text-gray-900 dark:text-gray-100">
                          {mode.label}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {mode.description}
                        </div>
                      </div>
                    </div>
                    {selectedMode === mode.id && (
                      <svg
                        className="w-4 h-4 text-blue-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ModeToggle;
