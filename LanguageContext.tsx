import React, { createContext, useState, useContext, useMemo } from 'react';

type Locale = 'en-US' | 'pt-BR' | 'ru-RU' | 'es-ES';

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
}

const translations: Record<Locale, Record<string, string>> = {
  'en-US': {
    'app.title': 'AI Nail Analysis',
    'app.subtitle': 'Upload a photo of the nail for an instant professional analysis.',
    'app.error.title': 'An Error Occurred',
    'app.error.description': 'Failed to analyze the image. The AI may be overloaded. Please try again later.',
    'uploader.clickToUpload': 'Click to upload',
    'uploader.dragAndDrop': 'or drag and drop the image',
    'uploader.fileTypes': 'PNG, JPG, WEBP (MAX. 5MB)',
    'uploader.ready': 'Image ready for analysis.',
    'uploader.button.analyzing': 'Analyzing...',
    'uploader.button.analyzed': 'Analysis Complete',
    'uploader.button.analyze': 'Analyze Nail',
    'uploader.button.changeImage': 'Change Image',
    'uploader.error.invalidType': 'Invalid file type. Please upload a PNG, JPG, or WEBP.',
    'uploader.error.tooLarge': 'File is too large. Maximum size is {size}MB.',
    'result.shape.title': 'Identified Shape',
    'result.description.title': 'Shape Description',
    'result.condition.title': 'Condition Analysis',
    'result.improvement.title': 'Improvement Recommendations',
    'result.measurements.title': 'Ideal Shape Measurements',
    'result.f1Mold.title': 'F1 Mold Application Guide',
    'result.f1Specialization.title': 'F1 Mold Specialization',
    'loader.text': 'Analyzing... The AI is processing the image.',
    'footer.copyright': `© ${new Date().getFullYear()} NailPro. All rights reserved.`,
    'footer.poweredBy': 'Nail analysis powered by AI.',
    'subscription.title': 'Unlock Your NailPro Potential',
    'subscription.description': 'Subscribe to our monthly plan to get unlimited access to our AI-powered nail analysis, detailed guides, and professional insights.',
    'subscription.feature1': 'Unlimited Nail Analyses',
    'subscription.feature2': 'Personalized F1 Mold Guides',
    'subscription.feature3': 'Advanced Condition Insights',
    'subscription.price': '$9.99 / month',
    'subscription.button': 'Subscribe Now',
    'analysisView.button.startOver': 'Start New Analysis',
    'point.label.cuticle': 'Cuticle',
    'point.label.apex': 'Apex',
    'point.label.sideWalls': 'Side Walls',
    'point.label.freeEdge': 'Free Edge',
  },
  'pt-BR': {
    'app.title': 'Análise de Unhas com IA',
    'app.subtitle': 'Faça o upload de uma foto da unha para uma análise profissional instantânea.',
    'app.error.title': 'Ocorreu um Erro',
    'app.error.description': 'Falha ao analisar a imagem. A IA pode estar sobrecarregada. Por favor, tente novamente mais tarde.',
    'uploader.clickToUpload': 'Clique para fazer o upload',
    'uploader.dragAndDrop': 'ou arraste e solte a imagem',
    'uploader.fileTypes': 'PNG, JPG, WEBP (MAX. 5MB)',
    'uploader.ready': 'Imagem pronta para análise.',
    'uploader.button.analyzing': 'Analisando...',
    'uploader.button.analyzed': 'Análise Concluída',
    'uploader.button.analyze': 'Analisar Unha',
    'uploader.button.changeImage': 'Trocar Imagem',
    'uploader.error.invalidType': 'Tipo de arquivo inválido. Por favor, envie um PNG, JPG ou WEBP.',
    'uploader.error.tooLarge': 'O arquivo é muito grande. O tamanho máximo é de {size}MB.',
    'result.shape.title': 'Formato Identificado',
    'result.description.title': 'Descrição do Formato',
    'result.condition.title': 'Análise da Condição',
    'result.improvement.title': 'Recomendações de Melhoria',
    'result.measurements.title': 'Medidas Ideais do Formato',
    'result.f1Mold.title': 'Guia de Aplicação do Molde F1',
    'result.f1Specialization.title': 'Especialização em Molde F1',
    'loader.text': 'Analisando... A IA está processando a imagem.',
    'footer.copyright': `© ${new Date().getFullYear()} NailPro. Todos os direitos reservados.`,
    'footer.poweredBy': 'Análise de unhas potencializada por IA.',
    'subscription.title': 'Desbloqueie seu Potencial NailPro',
    'subscription.description': 'Assine nosso plano mensal para obter acesso ilimitado às nossas análises de unhas com IA, guias detalhados e insights profissionais.',
    'subscription.feature1': 'Análises de Unhas Ilimitadas',
    'subscription.feature2': 'Guias Personalizados de Molde F1',
    'subscription.feature3': 'Insights Avançados da Condição',
    'subscription.price': 'R$ 29,99 / mês',
    'subscription.button': 'Assine Agora',
    'analysisView.button.startOver': 'Iniciar Nova Análise',
    'point.label.cuticle': 'Cutícula',
    'point.label.apex': 'Ápice',
    'point.label.sideWalls': 'Paredes Laterais',
    'point.label.freeEdge': 'Borda Livre',
  },
  'ru-RU': {
    'app.title': 'Анализ ногтей с помощью ИИ',
    'app.subtitle': 'Загрузите фото ногтя для мгновенного профессионального анализа.',
    'app.error.title': 'Произошла ошибка',
    'app.error.description': 'Не удалось проанализировать изображение. ИИ может быть перегружен. Пожалуйста, попробуйте позже.',
    'uploader.clickToUpload': 'Нажмите, чтобы загрузить',
    'uploader.dragAndDrop': 'или перетащите изображение',
    'uploader.fileTypes': 'PNG, JPG, WEBP (МАКС. 5МБ)',
    'uploader.ready': 'Изображение готово к анализу.',
    'uploader.button.analyzing': 'Анализ...',
    'uploader.button.analyzed': 'Анализ завершен',
    'uploader.button.analyze': 'Анализировать ноготь',
    'uploader.button.changeImage': 'Сменить изображение',
    'uploader.error.invalidType': 'Недопустимый тип файла. Пожалуйста, загрузите PNG, JPG или WEBP.',
    'uploader.error.tooLarge': 'Файл слишком большой. Максимальный размер {size}МБ.',
    'result.shape.title': 'Определенная форма',
    'result.description.title': 'Описание формы',
    'result.condition.title': 'Анализ состояния',
    'result.improvement.title': 'Рекомендации по улучшению',
    'result.measurements.title': 'Идеальные размеры формы',
    'result.f1Mold.title': 'Руководство по применению формы F1',
    'result.f1Specialization.title': 'Специализация по форме F1',
    'loader.text': 'Анализ... ИИ обрабатывает изображение.',
    'footer.copyright': `© ${new Date().getFullYear()} NailPro. Все права защищены.`,
    'footer.poweredBy': 'Анализ ногтей на базе ИИ.',
    'subscription.title': 'Раскройте свой потенциал с NailPro',
    'subscription.description': 'Подпишитесь на наш месячный план, чтобы получить неограниченный доступ к нашему анализу ногтей на базе ИИ, подробным руководствам и профессиональным советам.',
    'subscription.feature1': 'Неограниченные анализы ногтей',
    'subscription.feature2': 'Персональные руководства по формам F1',
    'subscription.feature3': 'Расширенный анализ состояния',
    'subscription.price': '₽ 499 / месяц',
    'subscription.button': 'Подписаться сейчас',
    'analysisView.button.startOver': 'Начать новый анализ',
    'point.label.cuticle': 'Кутикула',
    'point.label.apex': 'Апекс',
    'point.label.sideWalls': 'Боковые стенки',
    'point.label.freeEdge': 'Свободный край',
  },
  'es-ES': {
    'app.title': 'Análisis de Uñas con IA',
    'app.subtitle': 'Sube una foto de la uña para un análisis profesional instantáneo.',
    'app.error.title': 'Ocurrió un Error',
    'app.error.description': 'No se pudo analizar la imagen. La IA puede estar sobrecargada. Por favor, inténtalo de nuevo más tarde.',
    'uploader.clickToUpload': 'Haz clic para subir',
    'uploader.dragAndDrop': 'o arrastra y suelta la imagen',
    'uploader.fileTypes': 'PNG, JPG, WEBP (MÁX. 5MB)',
    'uploader.ready': 'Imagen lista para el análisis.',
    'uploader.button.analyzing': 'Analizando...',
    'uploader.button.analyzed': 'Análisis Completo',
    'uploader.button.analyze': 'Analizar Uña',
    'uploader.button.changeImage': 'Cambiar Imagen',
    'uploader.error.invalidType': 'Tipo de archivo no válido. Por favor, sube un PNG, JPG o WEBP.',
    'uploader.error.tooLarge': 'El archivo es demasiado grande. El tamaño máximo es de {size}MB.',
    'result.shape.title': 'Forma Identificada',
    'result.description.title': 'Descripción de la Forma',
    'result.condition.title': 'Análisis de Condición',
    'result.improvement.title': 'Recomendaciones de Mejora',
    'result.measurements.title': 'Medidas Ideales de la Forma',
    'result.f1Mold.title': 'Guía de Aplicación de Molde F1',
    'result.f1Specialization.title': 'Especialización en Molde F1',
    'loader.text': 'Analizando... La IA está procesando la imagen.',
    'footer.copyright': `© ${new Date().getFullYear()} NailPro. Todos los derechos reservados.`,
    'footer.poweredBy': 'Análisis de uñas impulsado por IA.',
    'subscription.title': 'Desbloquea tu Potencial NailPro',
    'subscription.description': 'Suscríbete a nuestro plan mensual para obtener acceso ilimitado a nuestros análisis de uñas con IA, guías detalladas e información profesional.',
    'subscription.feature1': 'Análisis de uñas ilimitados',
    'subscription.feature2': 'Guías personalizadas de moldes F1',
    'subscription.feature3': 'Información avanzada sobre la condición',
    'subscription.price': '9,99 € / mes',
    'subscription.button': 'Suscríbete Ahora',
    'analysisView.button.startOver': 'Empezar Nuevo Análisis',
    'point.label.cuticle': 'Cutícula',
    'point.label.apex': 'Ápice',
    'point.label.sideWalls': 'Paredes Laterales',
    'point.label.freeEdge': 'Borde Libre',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [locale, setLocale] = useState<Locale>('en-US');

  const t = useMemo(() => (key: string, params?: Record<string, string | number>) => {
    let translation = translations[locale][key] || key;
    if (params) {
      Object.keys(params).forEach(pKey => {
        translation = translation.replace(`{${pKey}}`, String(params[pKey]));
      });
    }
    return translation;
  }, [locale]);

  const value = { locale, setLocale, t };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
