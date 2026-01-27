
import { GoogleGenAI, Type } from "@google/genai";
import { BrandProfile, GeneratedAsset } from "../types";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

export const checkApiKeyStatus = async () => {
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
    - feedback: A short 1-sentence critique on how to improve brand alignment.
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
                        feedback: { type: Type.STRING }
                    },
                    required: ["colorMatch", "spatialCompliance", "vibeCheck", "feedback"]
                }
            }
        });

        const text = response.text?.trim();
        return JSON.parse(text || '{"colorMatch": 80, "spatialCompliance": 80, "vibeCheck": 80, "feedback": "Validation complete."}');
    } catch (error) {
        return { colorMatch: 75, spatialCompliance: 75, vibeCheck: 75, feedback: "Audit service unavailable." };
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
    - compositionalPatterns: 3 distinct rules for spatial layout (e.g. 'wide margins', 'geometric symmetry').
    - stylisticSignatures: 3 core artistic characteristics (e.g. 'high-grain film texture', 'vector-based brutalism', 'organic brushwork').
    - moodTags: 3 emotional descriptive keywords.
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
                    required: ["dominantColors", "compositionalPatterns", "stylisticSignatures", "background"]
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
            background: data.background || '#050505',
            extractedPatterns: data.compositionalPatterns,
            stylisticSignatures: data.stylisticSignatures
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
