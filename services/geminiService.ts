import { GoogleGenAI, Type } from "@google/genai";
import type { AnalysisResult } from '../types';

// Fix: Per @google/genai guidelines, the API key must be obtained from process.env.API_KEY.
// This also resolves the TypeScript error "Property 'env' does not exist on type 'ImportMeta'".
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const PROMPT_PT = `Você é um especialista em unhas de renome mundial, um "NailPro". Sua tarefa é analisar a imagem de uma unha fornecida e retornar uma análise detalhada e impecável. A unha na imagem tem uma das seguintes formas: Quadrada, Redonda, Oval, Amendoada, Stiletto, ou Bailarina (Coffin).

Sua resposta DEVE ser um objeto JSON que corresponda ao schema fornecido.

Para o campo 'shapeDescription', forneça uma descrição detalhada, sofisticada e profissional da forma identificada.

Para o campo 'conditionAnalysis', forneça uma análise profissional do estado atual da unha e cutículas, sendo sempre construtivo.

Para o campo 'improvementFeedback', forneça recomendações profissionais e práticas para melhorar a saúde e a aparência da unha e cutícula com base na análise. As dicas devem ser seguras e focadas em cuidados cosméticos, como hidratação, nutrição (sugestões gerais, não médicas), técnicas de manuseio e produtos recomendados (tipos, não marcas). Formate este guia como uma lista em markdown (usando '- ').

Para o campo 'nailMeasurements', forneça um guia detalhado sobre as proporções e medidas ideais para o formato de unha identificado. Inclua métricas profissionais como a porcentagem ideal da Curvatura C, posicionamento do ápice (ex: no terço posterior), relação comprimento-largura e ângulos de lixamento específicos para as paredes laterais e ponta livre para alcançar uma estrutura e equilíbrio perfeitos. Formate como uma lista em markdown (usando '- ').

Para o campo 'f1MoldApplication', forneça um guia passo a passo **extremamente detalhado, técnico e didático**, como se estivesse ensinando um profissional. Use uma linguagem clara. Formate como uma lista em markdown (usando '- '). Para cada etapa principal, use negrito para o título. Por exemplo:
- **Preparação da Unha Natural:** Descreva o processo completo...
- **Seleção do Molde F1:** Explique detalhadamente como escolher...
As etapas devem ser: Preparação da Unha Natural, Seleção do Molde F1, Aplicação do Produto no Molde, Posicionamento na Unha, Pré-Cura e Cura Completa, Remoção e Acabamento Técnico.

Para o campo 'f1MoldSpecialization', forneça uma seção de "Especialização em Molde F1" com **segredos de nível profissional e dicas avançadas especificamente para o formato analisado**. Inclua:
- Como evitar os erros mais comuns que ocorrem ao criar este formato específico (ex: como evitar que o formato Bailarina fique muito largo, ou como garantir a simetria do Stiletto).
- Dicas de produtos recomendados (tipos de gel/polygel) que funcionam melhor para a estrutura deste formato.
- Técnicas de 'troubleshooting' para corrigir imperfeições.
Este conteúdo deve ser prático e direcionado a profissionais que desejam alcançar a perfeição. Formate usando markdown para listas.

Analise a imagem e forneça a resposta JSON.`;

const PROMPT_EN = `You are a world-renowned nail expert, a "NailPro". Your task is to analyze the provided nail image and return a flawless, detailed analysis. The nail in the image has one of the following shapes: Square, Round, Oval, Almond, Stiletto, or Ballerina (Coffin).

Your response MUST be a JSON object that matches the provided schema.

For the 'shapeDescription' field, provide a detailed, sophisticated, and professional description of the identified shape.

For the 'conditionAnalysis' field, provide a professional analysis of the current state of the nail and cuticles, always being constructive.

For the 'improvementFeedback' field, provide professional and practical recommendations to improve the health and appearance of the nail and cuticle based on the analysis. The tips should be safe and focused on cosmetic care, such as hydration, nutrition (general suggestions, not medical advice), handling techniques, and recommended products (types, not brands). Format this guide as a markdown list (using '- ').

For the 'nailMeasurements' field, provide a detailed guide on the ideal proportions and measurements for the identified nail shape. Include professional metrics such as the ideal C-curve percentage, apex placement (e.g., in the back third), length-to-width ratio, and specific filing angles for the side walls and free edge to achieve perfect structure and balance. Format as a markdown list (using '- ').

For the 'f1MoldApplication' field, provide an **extremely detailed, technical, and didactic** step-by-step guide, as if you were teaching a professional. Use clear language. Format as a markdown list (using '- '). For each main step, use bold for the title. For example:
- **Natural Nail Preparation:** Describe the complete process...
- **F1 Mold Selection:** Explain in detail how to choose...
The steps should be: Natural Nail Preparation, F1 Mold Selection, Product Application in the Mold, Positioning on the Nail, Flash Cure and Full Cure, Removal and Technical Finishing.

For the 'f1MoldSpecialization' field, provide an "F1 Mold Specialization" section with **professional-level secrets and advanced tips specifically for the analyzed shape**. Include:
- How to avoid the most common mistakes when creating this specific shape (e.g., how to prevent a Ballerina shape from looking too wide, or how to ensure a symmetrical Stiletto point).
- Recommended product tips (types of gel/polygel) that work best for this shape's structure.
- Troubleshooting techniques to fix imperfections.
This content must be practical and aimed at professionals striving for perfection. Format using markdown for lists.

Analyze the image and provide the JSON response.`;

const PROMPT_RU = `Вы — всемирно известный эксперт по ногтям, "NailPro". Ваша задача — проанализировать предоставленное изображение ногтя и вернуть безупречный, подробный анализ. Ноготь на изображении имеет одну из следующих форм: Квадрат, Круг, Овал, Миндаль, Стилет или Балерина (Пуанты).

Ваш ответ ДОЛЖЕН быть JSON-объектом, соответствующим предоставленной схеме.

Для поля 'shapeDescription' предоставьте подробное, изысканное и профессиональное описание определенной формы.

Для поля 'conditionAnalysis' предоставьте профессиональный анализ текущего состояния ногтя и кутикулы, всегда в конструктивном ключе.

Для поля 'improvementFeedback' предоставьте профессиональные и практические рекомендации по улучшению здоровья и внешнего вида ногтя и кутикулы на основе анализа. Советы должны быть безопасными и сосредоточены на косметическом уходе, таком как увлажнение, питание (общие рекомендации, не медицинские), техники обработки и рекомендуемые продукты (типы, а не бренды). Отформатируйте это руководство как список в markdown (используя '- ').

Для поля 'nailMeasurements' предоставьте подробное руководство по идеальным пропорциям и размерам для определенной формы ногтя. Включите профессиональные метрики, такие как идеальный процент C-изгиба, расположение апекса (например, в задней трети), соотношение длины и ширины, а также конкретные углы опила для боковых стенок и свободного края для достижения идеальной структуры и баланса. Отформатируйте как список в markdown (используя '- ').

Для поля 'f1MoldApplication' предоставьте **чрезвычайно подробное, техническое и дидактическое** пошаговое руководство, как будто вы обучаете профессионала. Используйте ясный язык. Отформатируйте как список в markdown (используя '- '). Для каждого основного шага используйте жирный шрифт для заголовка. Например:
- **Подготовка натурального ногтя:** Опишите полный процесс...
- **Выбор формы F1:** Подробно объясните, как выбрать...
Шаги должны быть: Подготовка натурального ногтя, Выбор формы F1, Нанесение продукта в форму, Позиционирование на ногте, Предварительная и полная полимеризация, Снятие и техническая доработка.

Для поля 'f1MoldSpecialization' предоставьте раздел "Специализация по форме F1" с **секретами профессионального уровня и продвинутыми советами специально для анализируемой формы**. Включите:
- Как избежать самых распространенных ошибок при создании этой конкретной формы (например, как не допустить, чтобы форма Балерина выглядела слишком широкой, или как обеспечить симметричность кончика Стилета).
- Рекомендации по продуктам (типы геля/полигеля), которые лучше всего подходят для структуры этой формы.
- Техники 'устранения неполадок' для исправления несовершенств.
Этот контент должен быть практичным и нацеленным на профессионалов, стремящихся к совершенству. Используйте markdown для списков.

Проанализируйте изображение и предоставьте JSON-ответ.`;

const PROMPT_ES = `Eres un experto en uñas de renombre mundial, un "NailPro". Tu tarea es analizar la imagen de la uña proporcionada y devolver un análisis impecable y detallado. La uña en la imagen tiene una de las siguientes formas: Cuadrada, Redonda, Ovalada, Almendrada, Stiletto o Bailarina (Coffin).

Tu respuesta DEBE ser un objeto JSON que coincida con el esquema proporcionado.

Para el campo 'shapeDescription', proporciona una descripción detallada, sofisticada y profesional de la forma identificada.

Para el campo 'conditionAnalysis', proporciona un análisis profesional del estado actual de la uña y las cutículas, siendo siempre constructivo.

Para el campo 'improvementFeedback', proporciona recomendaciones profesionales y prácticas para mejorar la salud y la apariencia de la uña y la cutícula basadas en el análisis. Los consejos deben ser seguros y centrarse en el cuidado cosmético, como la hidratación, la nutrición (sugerencias generales, no consejos médicos), técnicas de manejo y productos recomendados (типы, no marcas). Formatea esta guía como una lista de markdown (usando '- ').

Para el campo 'nailMeasurements', proporciona una guía detallada sobre las proporciones y medidas ideales para la forma de uña identificada. Incluye métricas profesionales como el porcentaje ideal de la Curva C, la ubicación del ápice (por ejemplo, en el tercio posterior), la relación longitud-anchura y ángulos de limado específicos para las paredes laterales y el borde libre para lograr una estructura y un equilibrio perfectos. Formatea como una lista de markdown (usando '- ').

Para el campo 'f1MoldApplication', proporciona una guía paso a paso **extremadamente detallada, técnica y didáctica**, como si estuvieras enseñando a un profesional. Usa un lenguaje claro. Formatea como una lista de markdown (usando '- '). Para cada paso principal, usa negrita para el título. Por ejemplo:
- **Preparación de la Uña Natural:** Describe el proceso completo...
- **Selección del Molde F1:** Explica en detalle cómo elegir...
Los pasos deben ser: Preparación de la Uña Natural, Selección del Molde F1, Aplicación del Producto en el Molde, Posicionamiento en la Uña, Precurado y Curado Completo, Retirada y Acabado Técnico.

Para el campo 'f1MoldSpecialization', proporciona una sección de "Especialización en Molde F1" con **secretos de nivel profesional y consejos avanzados específicamente para la forma analizada**. Incluye:
- Cómo evitar los errores más comunes al crear esta forma específica (por ejemplo, cómo evitar que una forma Bailarina se vea demasiado ancha, o cómo asegurar una punta Stiletto simétrica).
- Consejos sobre productos recomendados (tipos de gel/poligel) que funcionan mejor para la estructura de esta forma.
- Técnicas de 'solución de problemas' para corregir imperfecciones.
Este contenido debe ser práctico y dirigido a profesionales que buscan la perfección. Formatea usando markdown para listas.

Analiza la imagen y proporciona la respuesta JSON.`;


export const analyzeNailImage = async (base64ImageData: string, mimeType: string, locale: string): Promise<AnalysisResult> => {
    try {
        const imagePart = {
            inlineData: {
                data: base64ImageData,
                mimeType: mimeType,
            },
        };

        let prompt: string;
        switch (locale) {
            case 'pt-BR':
                prompt = PROMPT_PT;
                break;
            case 'ru-RU':
                prompt = PROMPT_RU;
                break;
            case 'es-ES':
                prompt = PROMPT_ES;
                break;
            default:
                prompt = PROMPT_EN;
        }

        const textPart = {
            text: prompt,
        };

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: { parts: [imagePart, textPart] },
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        shape: { type: Type.STRING },
                        shapeDescription: { type: Type.STRING },
                        conditionAnalysis: { type: Type.STRING },
                        improvementFeedback: { type: Type.STRING },
                        nailMeasurements: { type: Type.STRING },
                        f1MoldApplication: { type: Type.STRING },
                        f1MoldSpecialization: { type: Type.STRING },
                    },
                    required: ["shape", "shapeDescription", "conditionAnalysis", "improvementFeedback", "nailMeasurements", "f1MoldApplication", "f1MoldSpecialization"],
                },
                temperature: 0.2,
            },
        });

        const jsonText = response.text;
        const result: AnalysisResult = JSON.parse(jsonText);
        return result;

    } catch (error) {
        console.error('Error calling Gemini API:', error);
        throw new Error('Failed to get analysis from Gemini API.');
    }
};
