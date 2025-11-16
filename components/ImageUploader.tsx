import React, { useRef } from 'react';
import { UploadIcon } from './icons/UploadIcon';
import { useLanguage } from '../LanguageContext';

interface ImageUploaderProps {
  onImageChange: (file: File) => void;
  onAnalyze: () => void;
  onReset: () => void;
  imagePreview: string | null;
  isLoading: boolean;
  hasAnalysis: boolean;
  onValidationError: (message: string) => void;
  error: string | null;
}

const MAX_SIZE_MB = 5;
const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;
const ALLOWED_TYPES = ['image/png', 'image/jpeg', 'image/webp'];


export const ImageUploader: React.FC<ImageUploaderProps> = ({
  onImageChange,
  onAnalyze,
  onReset,
  imagePreview,
  isLoading,
  hasAnalysis,
  onValidationError,
  error
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { t } = useLanguage();

  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    // Reset file input value to allow re-uploading the same file
    if (event.target) {
        event.target.value = '';
    }
    
    if (!file) {
      return;
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      const errorMessage = t('uploader.error.invalidType');
      console.error(errorMessage, {fileName: file.name, fileType: file.type});
      onValidationError(errorMessage);
      return;
    }

    if (file.size > MAX_SIZE_BYTES) {
      const errorMessage = t('uploader.error.tooLarge', { size: MAX_SIZE_MB });
      console.error(errorMessage, {fileName: file.name, fileSize: file.size});
      onValidationError(errorMessage);
      return;
    }

    onImageChange(file);
  };

  return (
    <div className="w-full bg-gray-900 border-2 border-dashed border-gray-700 rounded-xl p-6 transition-all duration-300 ease-in-out hover:border-gray-500">
      {!imagePreview ? (
        <div 
          className="flex flex-col items-center justify-center space-y-4 cursor-pointer"
          onClick={handleFileSelect}
        >
          <UploadIcon className="w-12 h-12 text-gray-500" />
          <p className="text-gray-400 text-center">
            <span className="font-semibold text-gray-300">{t('uploader.clickToUpload')}</span> {t('uploader.dragAndDrop')}
          </p>
          <p className="text-xs text-gray-500">{t('uploader.fileTypes')}</p>
          {error && <p className="text-sm text-red-400 mt-2">{error}</p>}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            accept="image/png, image/jpeg, image/webp"
          />
        </div>
      ) : (
        <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-full md:w-1/3 flex-shrink-0">
                <img 
                    src={imagePreview} 
                    alt="Pré-visualização da unha" 
                    className="rounded-lg object-cover w-full h-auto aspect-square" 
                />
            </div>
            <div className="flex flex-col items-center md:items-start space-y-4 w-full">
                <p className="text-lg font-medium text-white">{t('uploader.ready')}</p>
                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                    <button
                        onClick={onAnalyze}
                        disabled={isLoading || hasAnalysis}
                        className="w-full sm:w-auto bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:text-gray-500 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200"
                    >
                        {isLoading ? t('uploader.button.analyzing') : hasAnalysis ? t('uploader.button.analyzed') : t('uploader.button.analyze')}
                    </button>
                    <button
                        onClick={onReset}
                        disabled={isLoading}
                        className="w-full sm:w-auto bg-transparent hover:bg-gray-800 text-gray-400 font-semibold py-3 px-6 border border-gray-700 hover:border-gray-600 rounded-lg transition-colors duration-200"
                    >
                        {t('uploader.button.changeImage')}
                    </button>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};
