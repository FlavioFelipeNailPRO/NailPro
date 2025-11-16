import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { ImageUploader } from './components/ImageUploader';
import { AnalysisResultDisplay } from './components/AnalysisResultDisplay';
import { Loader } from './components/Loader';
import { Footer } from './components/Footer';
import { analyzeNailImage } from './services/geminiService';
import type { AnalysisResult } from './types';
import { useLanguage } from './LanguageContext';
import { SubscriptionCTA } from './components/SubscriptionCTA';
import { AnalysisView } from './components/AnalysisView';

const App: React.FC = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);
  const { locale, t } = useLanguage();

  const handleImageChange = (file: File) => {
    setImageFile(file);
    setAnalysis(null);
    setApiError(null);
    setValidationError(null);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleValidationError = (message: string) => {
    setValidationError(message);
    setImageFile(null);
    setImagePreview(null);
  }

  const handleAnalysis = useCallback(async () => {
    if (!imageFile || !imagePreview) return;

    setIsLoading(true);
    setAnalysis(null);
    setApiError(null);
    setValidationError(null);

    try {
      // imagePreview is a base64 string like "data:image/jpeg;base64,..."
      // We need to extract the mime type and the base64 data
      const parts = imagePreview.split(',');
      if (parts.length !== 2) {
        throw new Error("Invalid image data URL format.");
      }
      const mimeType = parts[0].split(':')[1].split(';')[0];
      const base64Data = parts[1];
      
      const result = await analyzeNailImage(base64Data, mimeType, locale);
      setAnalysis(result);
    } catch (err) {
      console.error("Analysis failed:", err);
      if (err instanceof Error && err.message === 'NOT_A_NAIL') {
        setApiError(t('app.error.notANail'));
      } else {
        setApiError(t('app.error.description'));
      }
    } finally {
      setIsLoading(false);
    }
  }, [imageFile, imagePreview, locale, t]);
  
  const handleReset = () => {
    setImageFile(null);
    setImagePreview(null);
    setAnalysis(null);
    setApiError(null);
    setValidationError(null);
    setIsLoading(false);
  };

  const handleSubscribe = () => {
    // In a real application, this would trigger a payment flow.
    // For this simulation, we'll just update the state.
    setIsSubscribed(true);
  };

  return (
    <div className="min-h-screen bg-black text-gray-200 font-sans flex flex-col">
      <Header />
      <main className="flex-grow flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-4xl lg:max-w-6xl mx-auto">
          {isSubscribed ? (
            <>
              {!imagePreview && !analysis && (
                <div className="text-center mb-8">
                    <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2">{t('app.title')}</h2>
                    <p className="text-gray-400 text-lg">{t('app.subtitle')}</p>
                </div>
              )}
              
              {!analysis && (
                <ImageUploader 
                  onImageChange={handleImageChange}
                  onAnalyze={handleAnalysis}
                  onReset={handleReset}
                  imagePreview={imagePreview}
                  isLoading={isLoading}
                  hasAnalysis={!!analysis}
                  onValidationError={handleValidationError}
                  error={validationError}
                />
              )}
              
              {isLoading && <Loader />}

              {apiError && !isLoading && (
                <div className="mt-8 text-center bg-red-900/50 border border-red-700 text-red-300 p-4 rounded-lg">
                  <p className="font-semibold">{t('app.error.title')}</p>
                  <p>{apiError}</p>
                </div>
              )}

              {analysis && !isLoading && imagePreview && (
                 <AnalysisView 
                    imagePreview={imagePreview}
                    analysis={analysis}
                    onReset={handleReset}
                 />
              )}
            </>
          ) : (
            <SubscriptionCTA onSubscribe={handleSubscribe} />
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;