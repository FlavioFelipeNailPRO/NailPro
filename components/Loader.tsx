import React from 'react';
import { useLanguage } from '../LanguageContext';

export const Loader: React.FC = () => {
  const { t } = useLanguage();
  return (
    <div className="flex flex-col items-center justify-center my-10 text-center">
      <div className="relative w-16 h-16">
        <div className="absolute top-0 left-0 w-full h-full border-4 border-gray-700 rounded-full"></div>
        <div className="absolute top-0 left-0 w-full h-full border-4 border-gray-400 rounded-full animate-spin border-t-transparent"></div>
      </div>
      <p className="mt-4 text-gray-400">{t('loader.text')}</p>
    </div>
  );
};
