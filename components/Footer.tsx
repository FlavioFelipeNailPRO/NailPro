import React from 'react';
import { useLanguage } from '../LanguageContext';

export const Footer: React.FC = () => {
  const { t } = useLanguage();
  return (
    <footer className="py-6 text-center text-gray-600 text-sm mt-12">
      <p>{t('footer.copyright')}</p>
      <p>{t('footer.poweredBy')}</p>
    </footer>
  );
};
