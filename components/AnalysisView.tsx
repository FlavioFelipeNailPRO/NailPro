import React, { useState } from 'react';
import type { AnalysisResult } from '../types';
import { InteractiveNailImage } from './InteractiveNailImage';
import { AnalysisResultDisplay } from './AnalysisResultDisplay';
import { useLanguage } from '../LanguageContext';

interface AnalysisViewProps {
  imagePreview: string;
  analysis: AnalysisResult;
  onReset: () => void;
}

const pointToSectionMap: Record<string, keyof AnalysisResult | string> = {
  cuticle: 'conditionAnalysis',
  apex: 'nailMeasurements',
  freeEdge: 'f1MoldApplication',
  sideWalls: 'f1MoldSpecialization',
};

export const AnalysisView: React.FC<AnalysisViewProps> = ({ imagePreview, analysis, onReset }) => {
  const [activePoint, setActivePoint] = useState<string | null>(null);
  const { t } = useLanguage();

  const activeSection = activePoint ? pointToSectionMap[activePoint] : null;

  return (
    <div className="w-full animate-fade-in space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <div className="lg:sticky lg:top-28">
          <InteractiveNailImage 
            imagePreview={imagePreview}
            onPointHover={setActivePoint}
            activePoint={activePoint}
          />
        </div>
        <div>
          <AnalysisResultDisplay 
            result={analysis}
            activeSection={activeSection}
          />
        </div>
      </div>
      <div className="text-center mt-8">
        <button
          onClick={onReset}
          className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-200"
        >
          {t('analysisView.button.startOver')}
        </button>
      </div>
    </div>
  );
};