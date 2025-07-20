'use client';

import { useState } from 'react';
import { Model } from '../lib/types';
import { AVAILABLE_MODELS } from '../lib/constants';

interface ModelSwitcherProps {
  selectedModel: Model;
  onModelChange: (model: Model) => void;
}

const ModelSwitcher = ({
  selectedModel,
  onModelChange,
}: ModelSwitcherProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleModelSelect = (model: Model) => {
    onModelChange(model);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
        <span>{selectedModel.name}</span>
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
          <div className="absolute top-full left-0 mt-2 w-80 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl z-20 overflow-hidden">
            <div className="p-2">
              <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide px-3 py-2">
                Choose Model
              </div>
              {AVAILABLE_MODELS.map((model) => (
                <button
                  key={model.id}
                  className={`w-full p-3 rounded-lg transition-all duration-200 text-left ${
                    selectedModel.id === model.id
                      ? 'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800'
                      : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                  onClick={() => handleModelSelect(model)}
                  tabIndex={0}
                  aria-label={`Select ${model.name} model`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleModelSelect(model);
                    }
                  }}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            selectedModel.id === model.id
                              ? 'bg-blue-500'
                              : 'bg-gray-400'
                          }`}
                        ></div>
                        <span className="font-medium text-sm text-gray-900 dark:text-gray-100">
                          {model.name}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                        {model.description}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {model.capabilities.slice(0, 3).map((capability) => (
                          <span
                            key={capability}
                            className="text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
                          >
                            {capability}
                          </span>
                        ))}
                      </div>
                    </div>
                    {selectedModel.id === model.id && (
                      <svg
                        className="w-4 h-4 text-blue-500 mt-1"
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

export default ModelSwitcher;
