import React from 'react';
import { useLanguage } from '../LanguageContext';

export const LanguageSelector: React.FC = () => {
    const { locale, setLocale } = useLanguage();

    const languages = [
        { code: 'pt-BR', name: 'PT' },
        { code: 'en-US', name: 'EN' },
        { code: 'ru-RU', name: 'RU' },
        { code: 'es-ES', name: 'ES' },
    ];

    return (
        <div className="flex items-center space-x-2">
            {languages.map((lang) => (
                <button
                    key={lang.code}
                    onClick={() => setLocale(lang.code as 'pt-BR' | 'en-US' | 'ru-RU' | 'es-ES')}
                    className={`px-3 py-1 text-sm font-medium rounded-md transition-colors duration-200 ${
                        locale === lang.code
                            ? 'bg-gray-700 text-white'
                            : 'bg-transparent text-gray-400 hover:bg-gray-800'
                    }`}
                >
                    {lang.name}
                </button>
            ))}
        </div>
    );
};
