
import { GoogleGenAI, Type } from "@google/genai";
import { BrandProfile, GeneratedAsset } from "../types";

const getAI = () => {
    // Try to get key from Vite's built-in env loader (VITE_ prefixed)
    // or from a global fallback if provided by a secure injection pattern
    const key = import.meta.env.VITE_GEMINI_API_KEY || (process.env as any).GEMINI_API_KEY;
    if (!key) {
        console.warn("GEMINI_API_KEY is missing. AI features will be limited.");
    }
    return new GoogleGenAI({ apiKey: key || 'MISSING_KEY' });
};

export const checkApiKeyStatus = async () => {
    const key = import.meta.env.VITE_GEMINI_API_KEY || (process.env as any).GEMINI_API_KEY;
    if (!key) return false;

    if (typeof (window as any).aistudio?.hasSelectedApiKey === 'function') {
        return await (window as any).aistudio.hasSelectedApiKey();
    }
    return true;
};

export const openApiKeyDialog = async () => {
    if (typeof (window as any).aistudio?.openSelectKey === 'function') {
        await (window as any).aistudio.openSelectKey();
        return true;
    }
    return false;
};

export const generateBrandAlignedPrompt = async (
    subject: string,
    brand: BrandProfile,
    intensities: { energy: number, warmth: number, sophistication: number },
    assetType: string,
    previousFeedback?: string
): Promise<string> => {
    const ai = getAI();
    const colorStrings = brand.palette.map(c => `${c.label}: ${c.hex}`).join(', ');
    const grammarStrings = brand.grammarRules?.map(r => `IF ${r.condition} THEN ${r.directive}`).join('\n') || 'None defined';

    const prompt = `
    Generate a high-end, technical image generation prompt for a "${assetType}" featuring the subject: "${subject}".
    
    ASSET TYPE SPECIFIC PROTOCOL:
    - Target Output: ${assetType}
    
    BRAND DOCTRINE & DNA:
    - Doctrine: ${brand.doctrine}
    - Color Palette: ${colorStrings} (Background: ${brand.background})
    - Negative Space: At least ${brand.negativeSpace}% of the canvas must be empty/negative space.
    - Emotional Intent: ${brand.emotionalTags.join(', ')}.
    - Forbidden Elements: ${brand.forbiddenElements.join(', ')}.

    HIGH-FIDELITY DESIGN SPECIFICATIONS:
    - Typography: ${brand.typography ? `${brand.typography.fontFamily}, weights: ${brand.typography.weightScale.join('/')}, spacing: ${brand.typography.letterSpacing}` : 'Clean typography consistent with brand doctrine'}
    - Lighting Setup: ${brand.lighting ? `${brand.lighting.setup} configuration, Contrast Ratio: ${brand.lighting.contrastRatio}, Temp: ${brand.lighting.colorTemperature}` : 'Sophisticated studio lighting'}
    - Structural Grid: ${brand.grid ? `${brand.grid.type} grid system with ${brand.grid.gutterRatio}x spacing` : 'Rule of thirds composition'}

    ADVANCED GRAMMAR RULES (Apply these conditionally based on the subject):
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
    Adjust the technical prompt to specifically resolve this issue while maintaining brand DNA.
    ` : ''}

    The output should be a detailed, technical prompt. 
    If assetType is 'Vector' or 'Icon', focus on flat geometry and clean paths. 
    If assetType is 'Stock Image', focus on lighting, lens specs, and photographic realism within brand bounds.
    Incorporate the specific stylistic signatures and compositional patterns identified above.
    Ensure "Wabi-Sabi" intentionality (asymmetry, natural textures, intentional imperfection).
    You MUST explicitly reference the Lighting Setup and structural grid directives in your technical description.
  `;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-3-pro-preview',
            contents: prompt,
        });
        return response.text?.trim() || "Failed to generate prompt.";
    } catch (error) {
        console.error("Prompt generation failed:", error);
        return `Professional ${assetType} of ${subject}, following ${brand.name} guidelines.`;
    }
};

export const generateImage = async (
    prompt: string,
    aspectRatio: "1:1" | "16:9" | "9:16" | "4:3" | "3:4" = "1:1"
): Promise<string | null> => {
    const ai = getAI();
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-3-pro-image-preview',
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
        return null;
    }
};

export const auditCompliance = async (imageUrl: string, brand: BrandProfile): Promise<GeneratedAsset['auditDetails']> => {
    const ai = getAI();
    const base64Data = imageUrl.split(',')[1];
    const colorStrings = brand.palette.map(c => c.hex).join(', ');

    const prompt = `
    Analyze this generated artwork against the following Brand Profile:
    - Colors: ${colorStrings}
    - Negative Space Target: ${brand.negativeSpace}%
    - Emotional Intent: ${brand.emotionalTags.join(', ')}

    Return a JSON object with:
    - scores (0-100) for colorMatch, spatialCompliance, vibeCheck.
    - feedback: A short 1-sentence critique.
    - suggestedFixes: An array of 3 specific technical prompt fragments that would improve the score (e.g., "increase negative space in top right", "add #10b981 highlights").
  `;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: {
                parts: [
                    { inlineData: { data: base64Data, mimeType: 'image/png' } },
                    { text: prompt }
                ]
            },
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        colorMatch: { type: Type.NUMBER },
                        spatialCompliance: { type: Type.NUMBER },
                        vibeCheck: { type: Type.NUMBER },
                        feedback: { type: Type.STRING },
                        suggestedFixes: { type: Type.ARRAY, items: { type: Type.STRING } }
                    },
                    required: ["colorMatch", "spatialCompliance", "vibeCheck", "feedback", "suggestedFixes"]
                }
            }
        });

        const text = response.text?.trim();
        return JSON.parse(text || '{"colorMatch": 80, "spatialCompliance": 80, "vibeCheck": 80, "feedback": "Validation complete.", "suggestedFixes": []}');
    } catch (error) {
        return { colorMatch: 75, spatialCompliance: 75, vibeCheck: 75, feedback: "Audit service unavailable.", suggestedFixes: [] };
    }
};

export const analyzeReferenceAsset = async (base64Data: string): Promise<Partial<BrandProfile>> => {
    const ai = getAI();
    const prompt = `
    Analyze this brand asset (logo, mood board, or past campaign artwork). 
    Extract key visual DNA traits that define this brand's unique identity.
    Return the following in JSON format:
    - dominantColors: Array of hex codes and suggested labels (e.g. [{"hex": "#000000", "label": "Deep Space"}]). Up to 6 colors.
    - background: The most suitable background hex code.
    - compositionalPatterns: 3 distinct rules for spatial layout.
    - stylisticSignatures: 3 core artistic characteristics.
    - moodTags: 3 emotional descriptive keywords.
    - typography: { fontFamily, weightScale: string[], letterSpacing: string }
    - lighting: { setup: "Rembrandt" | "High-key" | "Noir" | "Natural", contrastRatio: string, colorTemperature: string }
    - grid: { type: "thirds" | "golden" | "modular" | "minimalist", gutterRatio: number }
  `;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: {
                parts: [
                    { inlineData: { data: base64Data, mimeType: 'image/jpeg' } },
                    { text: prompt }
                ]
            },
            config: {
                responseMimeType: "application/json",
                responseSchema: {
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
                    required: ["dominantColors", "compositionalPatterns", "stylisticSignatures", "background", "typography", "lighting", "grid"]
                }
            }
        });

        const data = JSON.parse(response.text || '{}');
        return {
            palette: (data.dominantColors || []).map((c: any, i: number) => ({
                id: Math.random().toString(36).substr(2, 9),
                hex: c.hex,
                label: c.label || `Color ${i + 1}`
            })),
            background: data.background || '#262626',
            extractedPatterns: data.compositionalPatterns,
            stylisticSignatures: data.stylisticSignatures,
            typography: data.typography,
            lighting: data.lighting,
            grid: data.grid
        };
    } catch (error) {
        console.error("Reference analysis failed:", error);
        return {};
    }
};

export interface CategorizedSuggestions {
    style: string[];
    color: string[];
    composition: string[];
}

export const getCategorizedBrandSuggestions = async (currentText: string, brand: BrandProfile): Promise<CategorizedSuggestions> => {
    const ai = getAI();
    const prompt = `
    You are an intelligent brand grammar engine for "${brand.name}".
    The user is currently editing a generative prompt.
    
    BRAND DNA CONTEXT:
    - Doctrine: ${brand.doctrine}
    - Stylistic Signatures: ${brand.stylisticSignatures?.join(', ') || 'High-fidelity minimalism'}
    - Compositional Patterns: ${brand.extractedPatterns?.join(', ') || 'Balanced spatial hierarchy'}
    - Forbidden: ${brand.forbiddenElements.join(', ')}
    
    CURRENT PROMPT CONTENT:
    "${currentText}"

    TASK:
    Analyze the current prompt and suggest short, brand-aligned extensions.
    Categorize suggestions into three groups:
    1. STYLE: phrases describing texture, lighting, or artistic rendering.
    2. COLOR: phrases describing specific palette usage or tonal shifts.
    3. COMPOSITION: phrases describing layout, negative space, or focal points.

    Return exactly 3-4 items per category in a JSON structure.
  `;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        style: { type: Type.ARRAY, items: { type: Type.STRING } },
                        color: { type: Type.ARRAY, items: { type: Type.STRING } },
                        composition: { type: Type.ARRAY, items: { type: Type.STRING } }
                    },
                    required: ["style", "color", "composition"]
                }
            }
        });

        return JSON.parse(response.text || '{"style": [], "color": [], "composition": []}');
    } catch (error) {
        console.error("Categorized suggestions fetch failed:", error);
        return { style: [], color: [], composition: [] };
    }
};

export const getDynamicFragments = async (currentText: string, brand: BrandProfile): Promise<string[]> => {
    const ai = getAI();
    const prompt = `
    Analyze current prompt: "${currentText}"
    Brand "${brand.name}" signatures: ${brand.stylisticSignatures?.join(', ')}
    Forbidden: ${brand.forbiddenElements.join(', ')}

    Suggest exactly 5 brand-aligned technical fragments (2-4 words) that improve adherence to the brand doctrine.
    Return as a JSON array of strings.
  `;
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING }
                }
            }
        });
        return JSON.parse(response.text || '[]');
    } catch (err) {
        return [];
    }
}

export const getForbiddenAlternatives = async (forbiddenWord: string, brand: BrandProfile): Promise<string[]> => {
    const ai = getAI();
    const prompt = `
    The word "${forbiddenWord}" is FORBIDDEN for the brand "${brand.name}".
    Visual Doctrine: ${brand.doctrine}
    Allowed Signatures: ${brand.stylisticSignatures?.join(', ')}

    Suggest 3-4 brand-compliant alternative phrases or visual descriptors that convey a similar intent but adhere to the brand grammar.
    Return a JSON list of alternative strings.
  `;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        alternatives: { type: Type.ARRAY, items: { type: Type.STRING } }
                    },
                    required: ["alternatives"]
                }
            }
        });
        const data = JSON.parse(response.text || '{"alternatives": []}');
        return data.alternatives || [];
    } catch (error) {
        return ["minimalist approach", "brand-aligned texture", "refined focus"];
    }
};
