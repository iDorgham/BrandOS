import { GoogleGenAI, Type } from "@google/genai";
import { BrandProfile, GeneratedAsset } from "../types";

// Check if API key is available through AI Studio extension
const getApiKey = (): string => {
  // First try to get from environment variable
  if (import.meta.env.GOOGLE_AI_API_KEY) {
    return import.meta.env.GOOGLE_AI_API_KEY;
  }
  
  // Then try to get from global window (AI Studio extension)
  if (typeof (window as any).aistudio?.getApiKey === 'function') {
    return (window as any).aistudio.getApiKey();
  }
  
  // Finally return empty string to trigger proper error handling
  return '';
};

// Model configurations
export interface AIModel {
  id: string;
  name: string;
  provider: 'google' | 'anthropic' | 'meta' | 'openai';
  capabilities: ('image' | 'text' | 'analysis')[];
  recommendedFor: string[];
}

export const AVAILABLE_MODELS: AIModel[] = [
  {
    id: 'gemini-3-pro-preview',
    name: 'Gemini 3 Pro',
    provider: 'google',
    capabilities: ['text', 'analysis'],
    recommendedFor: 'Complex brand alignment, prompt refinement'
  },
  {
    id: 'gemini-3-pro-image-preview',
    name: 'Gemini 3 Pro Image',
    provider: 'google',
    capabilities: ['image'],
    recommendedFor: 'Vector graphics, high-fidelity assets'
  },
  {
    id: 'claude-3-opus',
    name: 'Claude 3 Opus',
    provider: 'anthropic',
    capabilities: ['text'],
    recommendedFor: 'Creative writing, detailed descriptions'
  },
  {
    id: 'meta-imagegen',
    name: 'Meta ImageGen',
    provider: 'meta',
    capabilities: ['image'],
    recommendedFor: 'Photorealistic imagery, marketing visuals'
  },
  {
    id: 'dall-e-4',
    name: 'DALL-E 4',
    provider: 'openai',
    capabilities: ['image'],
    recommendedFor: 'Concept art, creative illustrations'
  }
];

// Default model settings
const DEFAULT_TEXT_MODEL = 'gemini-3-pro-preview';
const DEFAULT_IMAGE_MODEL = 'gemini-3-pro-image-preview';

class AIServiceManager {
  private static instance: AIServiceManager;
  private clients: Map<string, any> = new Map();
  private currentModel: AIModel = AVAILABLE_MODELS[0];

  static getInstance(): AIServiceManager {
    if (!AIServiceManager.instance) {
      AIServiceManager.instance = new AIServiceManager();
    }
    return AIServiceManager.instance;
  }

  // Get AI client for specific model
  private getClient(model: AIModel) {
    if (this.clients.has(model.id)) {
      return this.clients.get(model.id);
    }

    let client;
    switch (model.provider) {
      case 'google':
        client = new GoogleGenAI({ apiKey: getApiKey() });
        break;
      case 'anthropic':
        // Initialize Anthropic client (would need their SDK)
        console.warn('Anthropic client not yet implemented');
        break;
      case 'meta':
        // Initialize Meta client
        console.warn('Meta client not yet implemented');
        break;
      case 'openai':
        // Initialize OpenAI client (would need their SDK)
        console.warn('OpenAI client not yet implemented');
        break;
    }

    if (client) {
      this.clients.set(model.id, client);
    }
    return client;
  }

  // Model management
  getCurrentModel(): AIModel {
    return this.currentModel;
  }

  setModel(modelId: string): void {
    const model = AVAILABLE_MODELS.find(m => m.id === modelId);
    if (model) {
      this.currentModel = model;
      localStorage.setItem('selectedAIModel', modelId);
    }
  }

  getModelForCapability(capability: 'text' | 'image' | 'analysis'): AIModel {
    const model = AVAILABLE_MODELS.find(m => 
      m.capabilities.includes(capability) && m.provider === this.currentModel.provider
    );
    return model || this.currentModel;
  }

  // Core AI operations
  async generateText(prompt: string, modelId?: string): Promise<string> {
    const model = modelId ? AVAILABLE_MODELS.find(m => m.id === modelId) : this.getModelForCapability('text');
    if (!model || !model.capabilities.includes('text')) {
      throw new Error('Selected model does not support text generation');
    }

    const client = this.getClient(model);
    
    switch (model.provider) {
      case 'google':
        try {
          const response = await client.models.generateContent({
            model: model.id,
            contents: prompt,
          });
          return response.text?.trim() || "Failed to generate text.";
        } catch (error) {
          console.error("Text generation failed:", error);
          throw error;
        }
      default:
        throw new Error(`Text generation not implemented for ${model.provider}`);
    }
  }

  async generateImage(prompt: string, aspectRatio: "1:1" | "16:9" | "9:16" | "4:3" | "3:4" = "1:1", modelId?: string): Promise<string | null> {
    const model = modelId ? AVAILABLE_MODELS.find(m => m.id === modelId) : this.getModelForCapability('image');
    if (!model || !model.capabilities.includes('image')) {
      throw new Error('Selected model does not support image generation');
    }

    const client = this.getClient(model);
    
    switch (model.provider) {
      case 'google':
        try {
          const response = await client.models.generateContent({
            model: model.id,
            contents: {
              parts: [{ text: prompt }]
            },
            config: {
              imageConfig: {
                aspectRatio,
                imageSize: "1K"
              }
            }
          });

          for (const part of response.candidates?.[0]?.content?.parts || []) {
            if (part.inlineData) {
              return `data:image/png;base64,${part.inlineData.data}`;
            }
          }
          return null;
        } catch (error) {
          console.error("Image generation failed:", error);
          if (error instanceof Error && error.message.includes("Requested entity was not found")) {
            throw new Error("API_KEY_EXPIRED");
          }
          throw error;
        }
      default:
        throw new Error(`Image generation not implemented for ${model.provider}`);
    }
  }

  async analyzeContent(content: string | { text: string, image?: string }, analysisType: 'compliance' | 'reference'): Promise<any> {
    const model = this.getModelForCapability('analysis');
    const client = this.getClient(model);

    switch (model.provider) {
      case 'google':
        try {
          let parts;
          if (typeof content === 'string') {
            parts = [{ text: content }];
          } else {
            parts = [];
            if (content.image) {
              const base64Data = content.image.split(',')[1];
              parts.push({ inlineData: { data: base64Data, mimeType: 'image/png' } });
            }
            if (content.text) {
              parts.push({ text: content.text });
            }
          }

          const response = await client.models.generateContent({
            model: model.id,
            contents: { parts },
            config: {
              responseMimeType: "application/json",
              responseSchema: this.getAnalysisSchema(analysisType)
            }
          });

          const text = response.text?.trim();
          return JSON.parse(text || '{}');
        } catch (error) {
          console.error("Analysis failed:", error);
          return this.getDefaultAnalysis(analysisType);
        }
      default:
        throw new Error(`Analysis not implemented for ${model.provider}`);
    }
  }

  private getAnalysisSchema(analysisType: 'compliance' | 'reference'): any {
    switch (analysisType) {
      case 'compliance':
        return {
          type: Type.OBJECT,
          properties: {
            colorMatch: { type: Type.NUMBER },
            spatialCompliance: { type: Type.NUMBER },
            vibeCheck: { type: Type.NUMBER },
            feedback: { type: Type.STRING }
          },
          required: ["colorMatch", "spatialCompliance", "vibeCheck", "feedback"]
        };
      case 'reference':
        return {
          type: Type.OBJECT,
          properties: {
            dominantColors: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  hex: { type: Type.STRING },
                  label: { type: Type.STRING }
                }
              }
            },
            background: { type: Type.STRING },
            compositionalPatterns: { type: Type.ARRAY, items: { type: Type.STRING } },
            stylisticSignatures: { type: Type.ARRAY, items: { type: Type.STRING } },
            moodTags: { type: Type.ARRAY, items: { type: Type.STRING } }
          },
          required: ["dominantColors", "compositionalPatterns", "stylisticSignatures", "background"]
        };
      default:
        return null;
    }
  }

  private getDefaultAnalysis(analysisType: 'compliance' | 'reference'): any {
    switch (analysisType) {
      case 'compliance':
        return { colorMatch: 75, spatialCompliance: 75, vibeCheck: 75, feedback: "Analysis unavailable." };
      case 'reference':
        return {
          dominantColors: [],
          background: '#000000',
          compositionalPatterns: [],
          stylisticSignatures: []
        };
      default:
        return {};
    }
  }
}

// Export singleton instance
export const aiManager = AIServiceManager.getInstance();

// Initialize model from localStorage
const savedModelId = localStorage.getItem('selectedAIModel');
if (savedModelId) {
  aiManager.setModel(savedModelId);
}

// Enhanced functions using the manager
export const generateBrandAlignedPrompt = async (
  subject: string,
  brand: BrandProfile,
  intensities: { energy: number, warmth: number, sophistication: number },
  assetType: string,
  previousFeedback?: string
): Promise<string> => {
  const colorStrings = brand.palette.map(c => `${c.label}: ${c.hex}`).join(', ');
  const grammarStrings = brand.grammarRules?.map(r => `IF ${r.condition} THEN ${r.directive}`).join('\n') || 'None defined';

  const prompt = `
  Generate a high-end, technical image generation prompt for a "${assetType}" featuring subject: "${subject}".
  
  ASSET TYPE SPECIFIC PROTOCOL:
  - Target Output: ${assetType}
  
  BRAND DOCTRINE & DNA:
  - Doctrine: ${brand.doctrine}
  - Color Palette: ${colorStrings} (Background: ${brand.background})
  - Negative Space: At least ${brand.negativeSpace}% of the canvas must be empty/negative space.
  - Emotional Intent: ${brand.emotionalTags.join(', ')}.
  - Forbidden Elements: ${brand.forbiddenElements.join(', ')}.

  ADVANCED GRAMMAR RULES (Apply these conditionally based on subject):
  ${grammarStrings}
  
  EXTRACTED VISUAL SIGNATURES:
  - Compositional Patterns: ${brand.extractedPatterns?.join(', ') || 'Maintain luxury spatial hierarchy'}.
  - Stylistic Signatures: ${brand.stylisticSignatures?.join(', ') || 'Minimalist high-fidelity execution'}.
  
  INTENSITIES: 
  - Energy: ${intensities.energy}%
  - Warmth: ${intensities.warmth}%
  - Sophistication: ${intensities.sophistication}%

  ${previousFeedback ? `
  CRITICAL CORRECTION PROTOCOL:
  The previous iteration failed compliance checks. You MUST address this feedback:
  "${previousFeedback}"
  Adjust technical prompt to specifically resolve this issue while maintaining brand DNA.
  ` : ''}

  The output should be a detailed, technical prompt. 
  If assetType is 'Vector' or 'Icon', focus on flat geometry and clean paths. 
  If assetType is 'Stock Image', focus on lighting, lens specs, and photographic realism within brand bounds.
  Incorporate specific stylistic signatures and compositional patterns identified above.
  Ensure "Wabi-Sabi" intentionality (asymmetry, natural textures, intentional imperfection).
`;

  return await aiManager.generateText(prompt);
};

export const generateImage = async (
  prompt: string,
  aspectRatio: "1:1" | "16:9" | "9:16" | "4:3" | "3:4" = "1:1"
): Promise<string | null> => {
  return await aiManager.generateImage(prompt, aspectRatio);
};

export const auditCompliance = async (imageUrl: string, brand: BrandProfile): Promise<GeneratedAsset['auditDetails']> => {
  const colorStrings = brand.palette.map(c => c.hex).join(', ');
  const prompt = `
  Analyze this generated artwork against the following Brand Profile:
  - Colors: ${colorStrings}
  - Negative Space Target: ${brand.negativeSpace}%
  - Emotional Intent: ${brand.emotionalTags.join(', ')}

  Return a JSON object with:
  - scores (0-100) for colorMatch, spatialCompliance, vibeCheck.
  - feedback: A short 1-sentence critique on how to improve brand alignment.
`;

  return await aiManager.analyzeContent({ image: imageUrl, text: prompt }, 'compliance');
};

export const analyzeReferenceAsset = async (base64Data: string): Promise<Partial<BrandProfile>> => {
  const prompt = `
  Analyze this brand asset (logo, mood board, or past campaign artwork). 
  Extract key visual DNA traits that define this brand's unique identity.
  Return the following in JSON format:
  - dominantColors: Array of hex codes and suggested labels (e.g. [{"hex": "#000000", "label": "Deep Space"}]). Up to 6 colors.
  - background: The most suitable background hex code.
  - compositionalPatterns: 3 distinct rules for spatial layout (e.g. 'wide margins', 'geometric symmetry').
  - stylisticSignatures: 3 core artistic characteristics (e.g. 'high-grain film texture', 'vector-based brutalism', 'organic brushwork').
  - moodTags: 3 emotional descriptive keywords.
`;

  const result = await aiManager.analyzeContent({ image: `data:image/jpeg;base64,${base64Data}`, text: prompt }, 'reference');
  
  return {
    palette: (result.dominantColors || []).map((c: any, i: number) => ({
      id: Math.random().toString(36).substr(2, 9),
      hex: c.hex,
      label: c.label || `Color ${i + 1}`
    })),
    background: result.background || '#262626',
    extractedPatterns: result.compositionalPatterns,
    stylisticSignatures: result.stylisticSignatures,
    moodTags: result.moodTags
  };
};

export type { AIModel };
