import React from 'react';
import type { AnalysisResult } from '../types';
import { useLanguage } from '../LanguageContext';

interface AnalysisResultProps {
  result: AnalysisResult;
  activeSection?: keyof AnalysisResult | string | null;
}

interface ResultSectionProps {
  title: string;
  children: React.ReactNode;
  isActive: boolean;
}

const ResultSection: React.FC<ResultSectionProps> = ({ title, children, isActive }) => (
  <div className={`p-6 rounded-lg border transition-all duration-300 ${isActive ? 'bg-gray-800 border-gray-500 scale-[1.02]' : 'bg-gray-900/50 border-gray-800'}`}>
    <h3 className="text-xl font-semibold text-white mb-3 tracking-wide">{title}</h3>
    <div className="text-gray-300 space-y-2 leading-relaxed">{children}</div>
  </div>
);


// A helper function to parse markdown-like text from the API response
const renderMarkdown = (text: string) => {
  // Split into lines and filter out empty ones
  const lines = text.split('\n').filter(line => line.trim() !== '');

  // Function to render a single line, handling bold text
  const renderLineContent = (line: string) => {
    // Split the line by the bold markers, keeping the markers
    const parts = line.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        // It's a bold part, render it as <strong>
        return <strong key={i}>{part.slice(2, -2)}</strong>;
      }
      // It's a regular text part
      return part;
    });
  };

  // Check if the text is intended to be a list (starts with '- ')
  if (lines.some(line => line.trim().startsWith('- '))) {
    return (
      <ul className="space-y-3">
        {lines.map((item, index) => (
          <li key={index} className="flex items-start">
            <span className="mr-3 mt-2 block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gray-500"></span>
            <span>{renderLineContent(item.trim().substring(2))}</span>
          </li>
        ))}
      </ul>
    );
  }

  // Otherwise, render as paragraphs
  return (
    <div className="space-y-2">
      {lines.map((line, index) => (
        <p key={index}>{renderLineContent(line)}</p>
      ))}
    </div>
  );
};


export const AnalysisResultDisplay: React.FC<AnalysisResultProps> = ({ result, activeSection }) => {
  const { t } = useLanguage();
  return (
    <div className="space-y-6">
      <div className="text-center p-6 bg-gray-900 rounded-xl border border-gray-800">
        <h2 className="text-sm uppercase text-gray-400 tracking-widest">{t('result.shape.title')}</h2>
        <p className="text-4xl font-bold text-white mt-1">{result.shape}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ResultSection title={t('result.description.title')} isActive={activeSection === 'shapeDescription'}>
          {renderMarkdown(result.shapeDescription)}
        </ResultSection>
        
        <ResultSection title={t('result.condition.title')} isActive={activeSection === 'conditionAnalysis'}>
          {renderMarkdown(result.conditionAnalysis)}
        </ResultSection>
      </div>

      <ResultSection title={t('result.improvement.title')} isActive={activeSection === 'improvementFeedback'}>
        {renderMarkdown(result.improvementFeedback)}
      </ResultSection>

      <ResultSection title={t('result.measurements.title')} isActive={activeSection === 'nailMeasurements'}>
        {renderMarkdown(result.nailMeasurements)}
      </ResultSection>

      <ResultSection title={t('result.f1Mold.title')} isActive={activeSection === 'f1MoldApplication'}>
        {renderMarkdown(result.f1MoldApplication)}
      </ResultSection>

      <ResultSection title={t('result.f1Specialization.title')} isActive={activeSection === 'f1MoldSpecialization'}>
        {renderMarkdown(result.f1MoldSpecialization)}
      </ResultSection>

    </div>
  );
};

// Add fade-in animation to tailwind config or a style tag if needed. For simplicity, adding it here.
const style = document.createElement('style');
style.innerHTML = `
@keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in {
    animation: fadeIn 0.5s ease-out forwards;
}
`;
document.head.appendChild(style);