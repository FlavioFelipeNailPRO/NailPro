import React from 'react';
import { SparklesIcon } from './icons/SparklesIcon';
import { LanguageSelector } from './LanguageSelector';

export const Header: React.FC = () => {
  return (
    <header className="py-4 px-4 sm:px-6 lg:px-8 border-b border-gray-800 bg-black/50 backdrop-blur-sm sticky top-0 z-10">
      <div className="max-w-4xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
            <SparklesIcon className="w-7 h-7 text-gray-400" />
            <h1 className="text-2xl font-bold text-white tracking-wider">
                Nail<span className="text-gray-400">Pro</span>
            </h1>
        </div>
        <LanguageSelector />
      </div>
    </header>
  );
};
