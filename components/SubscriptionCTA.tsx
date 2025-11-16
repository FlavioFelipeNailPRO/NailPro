import React from 'react';
import { useLanguage } from '../LanguageContext';
import { SparklesIcon } from './icons/SparklesIcon';

interface SubscriptionCTAProps {
  onSubscribe: () => void;
}

const CheckIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 flex-shrink-0 text-gray-400" viewBox="0 0 20 20" fill="currentColor" {...props}>
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
);

export const SubscriptionCTA: React.FC<SubscriptionCTAProps> = ({ onSubscribe }) => {
  const { t } = useLanguage();

  return (
    <div className="relative w-full bg-black border border-gray-800 rounded-2xl p-8 sm:p-12 text-center animate-fade-in flex flex-col items-center overflow-hidden">
        {/* Background decorative glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gray-800/50 rounded-full blur-3xl opacity-30 pointer-events-none"></div>
        
        {/* Icon with a decorative container and pulse animation */}
        <div className="relative z-10 mb-6 flex items-center justify-center w-20 h-20 bg-gray-900/70 border border-gray-700 rounded-full animate-pulse-slow">
            <SparklesIcon className="w-10 h-10 text-gray-300" />
        </div>

        {/* Title with text gradient */}
        <h2 className="relative z-10 text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400 mb-4">
            {t('subscription.title')}
        </h2>
        
        <p className="relative z-10 text-gray-400 max-w-xl mb-8">
            {t('subscription.description')}
        </p>
        
        {/* Features list */}
        <div className="relative z-10 space-y-4 text-left mb-10 self-center inline-block text-gray-300 max-w-md w-full">
            <div className="flex items-center bg-gray-900/50 p-3 rounded-lg border border-gray-800 backdrop-blur-sm"><CheckIcon /><span>{t('subscription.feature1')}</span></div>
            <div className="flex items-center bg-gray-900/50 p-3 rounded-lg border border-gray-800 backdrop-blur-sm"><CheckIcon /><span>{t('subscription.feature2')}</span></div>
            <div className="flex items-center bg-gray-900/50 p-3 rounded-lg border border-gray-800 backdrop-blur-sm"><CheckIcon /><span>{t('subscription.feature3')}</span></div>
        </div>
        
        {/* Price box */}
        <div className="relative z-10 bg-gray-900 border border-gray-700 rounded-lg p-4 mb-8 w-full max-w-xs">
            <p className="text-3xl font-bold text-white">{t('subscription.price')}</p>
        </div>

        {/* Subscribe button with gradient and hover effect */}
        <button
            onClick={onSubscribe}
            className="relative z-10 w-full max-w-xs bg-gradient-to-r from-gray-100 to-gray-300 hover:from-white hover:to-gray-200 text-black font-bold py-4 px-6 rounded-lg transition-all duration-300 ease-in-out text-lg shadow-lg shadow-gray-500/10 transform hover:scale-105"
        >
            {t('subscription.button')}
        </button>
    </div>
  );
};

// Add animations to a style tag.
const style = document.createElement('style');
if (!document.querySelector('#cta-animations-style')) {
  style.id = 'cta-animations-style';
  style.innerHTML = `
  @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
  }
  @keyframes pulse-slow {
      50% {
        opacity: 0.8;
        transform: scale(1.05);
      }
  }
  .animate-fade-in {
      animation: fadeIn 0.7s ease-out forwards;
  }
  .animate-pulse-slow {
      animation: pulse-slow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }
  `;
  document.head.appendChild(style);
}
