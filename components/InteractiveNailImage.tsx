import React from 'react';
import { useLanguage } from '../LanguageContext';

interface InteractiveNailImageProps {
  imagePreview: string;
  onPointHover: (key: string | null) => void;
  activePoint: string | null;
}

export const InteractiveNailImage: React.FC<InteractiveNailImageProps> = ({ imagePreview, onPointHover, activePoint }) => {
  const { t } = useLanguage();

  const points = [
    { key: 'cuticle', top: '15%', left: '50%', label: t('point.label.cuticle') },
    { key: 'apex', top: '40%', left: '50%', label: t('point.label.apex') },
    { key: 'sideWalls', top: '55%', left: '15%', label: t('point.label.sideWalls') },
    { key: 'freeEdge', top: '85%', left: '50%', label: t('point.label.freeEdge') },
  ];

  return (
    <div className="relative w-full aspect-square max-w-md mx-auto">
      <img 
        src={imagePreview} 
        alt="Analyzed nail" 
        className="rounded-xl object-cover w-full h-full" 
      />
      {points.map(point => (
        <div
          key={point.key}
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ top: point.top, left: point.left }}
          onMouseEnter={() => onPointHover(point.key)}
          onMouseLeave={() => onPointHover(null)}
        >
          <div 
            className={`relative flex items-center justify-center w-8 h-8 cursor-pointer group`}
          >
            <div 
              className={`absolute w-full h-full rounded-full bg-white/30 transition-all duration-300 group-hover:scale-125 ${activePoint === point.key ? 'scale-125' : 'scale-100'}`}
            ></div>
            <div className="absolute w-2 h-2 rounded-full bg-white"></div>
            <span className="absolute bottom-full mb-2 w-max bg-black/80 text-white text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              {point.label}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};