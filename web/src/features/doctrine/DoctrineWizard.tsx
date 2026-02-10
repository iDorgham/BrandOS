import React, { useState } from 'react';
import { ArrowRight, Sparkles, Target, Eye, Heart, Lightbulb, Palette, Users } from 'lucide-react';
import { Button, Card } from '@/components/ui';
import { BrandProfile } from '@/types';

interface DoctrineWizardProps {
    brand: BrandProfile;
    onUpdateBrand: (brand: BrandProfile) => void;
}

export const DoctrineWizard: React.FC<DoctrineWizardProps> = ({ brand, onUpdateBrand }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState({
        // Step 1: Brand Identity
        brandName: brand.name || '',
        mission: '',
        vision: '',

        // Step 2: Emotional Intent
        emotionalIntent: 'SOPHISTICATED' as 'EUPHORIC' | 'MYSTERIOUS' | 'SOPHISTICATED' | 'MINIMALIST' | 'ENERGIZED' | 'WARM',

        // Step 3: Target Audience
        audienceAge: '25-40',
        audienceType: 'professionals',
        audienceValues: 'innovation',

        // Step 4: Visual Style
        visualStyle: 'minimalist',
        colorPhilosophy: 'monochromatic',
        typography: 'sans-serif',

        // Step 5: Communication Tone
        voice: 'professional',
        keyValues: [] as string[],
        language: 'inspiring'
    });

    const totalSteps = 5;
    const progress = ((currentStep + 1) / totalSteps) * 100;

    const handleNext = () => {
        if (currentStep < totalSteps - 1) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handlePrevious = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleSave = () => {
        const doctrineStatement = generateDoctrineStatement(formData);
        onUpdateBrand({
            ...brand,
            name: formData.brandName,
            doctrine: doctrineStatement
        });
    };

    const generateDoctrineStatement = (data: typeof formData) => {
        const intents = {
            EUPHORIC: 'joyful, uplifting, energizing',
            MYSTERIOUS: 'intriguing, sophisticated, enigmatic',
            SOPHISTICATED: 'elegant, premium, refined',
            MINIMALIST: 'clean, focused, intentional',
            ENERGIZED: 'dynamic, bold, active',
            WARM: 'approachable, caring, authentic'
        };

        return `${data.brandName} embodies ${data.visualStyle} through ${data.voice} communication, creating ${data.emotionalIntent.toLowerCase()} experiences for ${data.audienceType} by delivering ${data.audienceValues}.

We exist to inspire and transform. Our voice is ${data.voice} yet accessible, characterized by ${data.emotionalIntent.toLowerCase()}.

Visually, we express ourselves through ${data.visualStyle} principles with ${data.colorPhilosophy} colors and ${data.typography} typography.

When we succeed, our audience feels ${intents[data.emotionalIntent]}`;
    };

    const renderStep1 = () => (
        <div className="space-y-6">
            <div className="text-center mb-8">
                <Target className="mx-auto mb-4 text-primary" size={48} />
                <h3 className="text-xl font-bold mb-2">Brand Identity</h3>
                <p className="text-muted-foreground">Define who your brand is at its core</p>
            </div>

            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-2">Brand Name</label>
                    <input
                        type="text"
                        value={formData.brandName}
                        onChange={(e) => setFormData({ ...formData, brandName: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-border bg-background"
                        placeholder="Enter your brand name"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">Brand Mission</label>
                    <textarea
                        value={formData.mission}
                        onChange={(e) => setFormData({ ...formData, mission: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-border bg-background"
                        rows={3}
                        placeholder="What problem does your brand solve?"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">Vision Statement</label>
                    <textarea
                        value={formData.vision}
                        onChange={(e) => setFormData({ ...formData, vision: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-border bg-background"
                        rows={3}
                        placeholder="Where do you want to take your brand?"
                    />
                </div>
            </div>
        </div>
    );

    const renderStep2 = () => (
        <div className="space-y-6">
            <div className="text-center mb-8">
                <Heart className="mx-auto mb-4 text-primary" size={48} />
                <h3 className="text-xl font-bold mb-2">Emotional Intent</h3>
                <p className="text-muted-foreground">Choose the feeling you want to evoke</p>
            </div>

            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-2">Brand Vibe</label>
                    <select
                        value={formData.emotionalIntent}
                        onChange={(e) => setFormData({ ...formData, emotionalIntent: e.target.value as any })}
                        className="w-full px-4 py-3 rounded-lg border border-border bg-background"
                    >
                        <option value="EUPHORIC">🎉 Euphoric - Joyful, uplifting, energizing</option>
                        <option value="MYSTERIOUS">🔮 Mysterious - Intriguing, sophisticated, enigmatic</option>
                        <option value="SOPHISTICATED">🎭 Sophisticated - Elegant, premium, refined</option>
                        <option value="MINIMALIST">✨ Minimalist - Clean, focused, intentional</option>
                        <option value="ENERGIZED">⚡ Energized - Dynamic, bold, active</option>
                        <option value="WARM">🤗 Warm - Approachable, caring, authentic</option>
                    </select>
                </div>

                <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                    <h4 className="font-medium mb-2">Selected Vibe Characteristics:</h4>
                    <p className="text-sm text-muted-foreground">
                        {formData.emotionalIntent === 'EUPHORIC' && 'Creates joy, enthusiasm, and positive energy. Perfect for entertainment, lifestyle, and youth brands.'}
                        {formData.emotionalIntent === 'MYSTERIOUS' && 'Builds intrigue and curiosity. Great for luxury, exclusive, and premium brands.'}
                        {formData.emotionalIntent === 'SOPHISTICATED' && 'Conveys elegance and expertise. Ideal for professional, high-end, and luxury brands.'}
                        {formData.emotionalIntent === 'MINIMALIST' && 'Promotes clarity and focus. Excellent for tech, modern, and contemporary brands.'}
                        {formData.emotionalIntent === 'ENERGIZED' && 'Generates excitement and action. Perfect for sports, fitness, and adventure brands.'}
                        {formData.emotionalIntent === 'WARM' && 'Creates connection and trust. Ideal for community, wellness, and family brands.'}
                    </p>
                </div>
            </div>
        </div>
    );

    const renderStep3 = () => (
        <div className="space-y-6">
            <div className="text-center mb-8">
                <Users className="mx-auto mb-4 text-primary" size={48} />
                <h3 className="text-xl font-bold mb-2">Target Audience</h3>
                <p className="text-muted-foreground">Define who you're speaking to</p>
            </div>

            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-2">Primary Age Group</label>
                    <select
                        value={formData.audienceAge}
                        onChange={(e) => setFormData({ ...formData, audienceAge: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-border bg-background"
                    >
                        <option value="18-25">🎓 Gen Z (18-25)</option>
                        <option value="25-40">💼 Millennials (25-40)</option>
                        <option value="40-60">🏢 Gen X (40-60)</option>
                        <option value="60+">👵 Boomers (60+)</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">Audience Type</label>
                    <select
                        value={formData.audienceType}
                        onChange={(e) => setFormData({ ...formData, audienceType: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-border bg-background"
                    >
                        <option value="professionals">👔 Professionals & Business</option>
                        <option value="consumers">🛍 General Consumers</option>
                        <option value="creatives">🎨 Creatives & Artists</option>
                        <option value="students">📚 Students & Educators</option>
                        <option value="families">👨‍👩‍👧‍👦 Families & Parents</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">Core Values</label>
                    <select
                        value={formData.audienceValues}
                        onChange={(e) => setFormData({ ...formData, audienceValues: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-border bg-background"
                    >
                        <option value="innovation">💡 Innovation & Progress</option>
                        <option value="tradition">🏛️ Tradition & Heritage</option>
                        <option value="sustainability">🌱 Sustainability & Eco-friendly</option>
                        <option value="luxury">💎 Luxury & Premium Quality</option>
                        <option value="accessibility">♿ Accessibility & Inclusion</option>
                        <option value="community">🤝 Community & Connection</option>
                    </select>
                </div>
            </div>
        </div>
    );

    const renderStep4 = () => (
        <div className="space-y-6">
            <div className="text-center mb-8">
                <Palette className="mx-auto mb-4 text-primary" size={48} />
                <h3 className="text-xl font-bold mb-2">Visual Style</h3>
                <p className="text-muted-foreground">Define your brand's visual identity</p>
            </div>

            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-2">Visual Style</label>
                    <select
                        value={formData.visualStyle}
                        onChange={(e) => setFormData({ ...formData, visualStyle: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-border bg-background"
                    >
                        <option value="minimalist">✨ Minimalist - Clean, focused, intentional</option>
                        <option value="bold">💪 Bold - Confident, strong, impactful</option>
                        <option value="elegant">🎩 Elegant - Refined, sophisticated, graceful</option>
                        <option value="playful">🎮 Playful - Fun, creative, energetic</option>
                        <option value="modern">🏢 Modern - Contemporary, fresh, innovative</option>
                        <option value="vintage">📻 Vintage - Classic, nostalgic, timeless</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">Color Philosophy</label>
                    <select
                        value={formData.colorPhilosophy}
                        onChange={(e) => setFormData({ ...formData, colorPhilosophy: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-border bg-background"
                    >
                        <option value="monochromatic">⚫ Monochromatic - Single color shades</option>
                        <option value="complementary">🎨 Complementary - Opposite colors</option>
                        <option value="analogous">🌈 Analogous - Neighboring colors</option>
                        <option value="triadic">🔺 Triadic - Three evenly spaced</option>
                        <option value="earth tones">🌍 Earth Tones - Natural, organic</option>
                        <option value="vibrant">🌈 Vibrant - Bold, saturated</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">Typography</label>
                    <select
                        value={formData.typography}
                        onChange={(e) => setFormData({ ...formData, typography: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-border bg-background"
                    >
                        <option value="sans-serif">🔤 Sans-serif - Modern, clean, accessible</option>
                        <option value="serif">📖 Serif - Traditional, elegant, authoritative</option>
                        <option value="script">✍️ Script - Artistic, flowing, personal</option>
                        <option value="display">🎪 Display - Decorative, unique, statement-making</option>
                        <option value="monospace">💻 Monospace - Technical, consistent, structured</option>
                    </select>
                </div>
            </div>
        </div>
    );

    const renderStep5 = () => (
        <div className="space-y-6">
            <div className="text-center mb-8">
                <Lightbulb className="mx-auto mb-4 text-primary" size={48} />
                <h3 className="text-xl font-bold mb-2">Communication Tone</h3>
                <p className="text-muted-foreground">Define how your brand speaks</p>
            </div>

            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-2">Brand Voice</label>
                    <select
                        value={formData.voice}
                        onChange={(e) => setFormData({ ...formData, voice: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-border bg-background"
                    >
                        <option value="professional">👔 Professional - Knowledgeable, authoritative, trustworthy</option>
                        <option value="casual">😊 Casual - Friendly, approachable, conversational</option>
                        <option value="playful">🎮 Playful - Fun, creative, energetic</option>
                        <option value="inspiring">🚀 Inspiring - Motivational, visionary, uplifting</option>
                        <option value="empathetic">🤗 Empathetic - Caring, understanding, supportive</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">Language Style</label>
                    <select
                        value={formData.language}
                        onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-border bg-background"
                    >
                        <option value="inspiring">💫 Inspiring - Motivational, uplifting, visionary</option>
                        <option value="educational">📚 Educational - Informative, clear, helpful</option>
                        <option value="persuasive">🎯 Persuasive - Convincing, compelling, action-oriented</option>
                        <option value="entertaining">🎪 Entertaining - Engaging, fun, memorable</option>
                        <option value="supportive">🤝 Supportive - Reassuring, caring, helpful</option>
                    </select>
                </div>
            </div>
        </div>
    );

    const renderPreview = () => (
        <div className="space-y-6">
            <div className="text-center mb-8">
                <Sparkles className="mx-auto mb-4 text-primary" size={48} />
                <h3 className="text-xl font-bold mb-2">Your Core Doctrine</h3>
                <p className="text-muted-foreground">Review and save your brand foundation</p>
            </div>

            <div className="p-6 bg-primary/5 rounded-xl border border-primary/20 space-y-4">
                <h4 className="font-bold text-primary text-center mb-4">Generated Doctrine Statement</h4>
                <p className="text-sm leading-relaxed italic bg-background/50 p-4 rounded-lg border border-border">
                    "{generateDoctrineStatement(formData)}"
                </p>
            </div>

            <div className="p-4 bg-muted rounded-lg">
                <h5 className="font-medium mb-2">Brand Profile Summary:</h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                        <span className="font-medium">Brand:</span> {formData.brandName}
                    </div>
                    <div>
                        <span className="font-medium">Vibe:</span> {formData.emotionalIntent.toLowerCase()}
                    </div>
                    <div>
                        <span className="font-medium">Audience:</span> {formData.audienceAge} {formData.audienceType}
                    </div>
                    <div>
                        <span className="font-medium">Visual:</span> {formData.visualStyle}, {formData.colorPhilosophy}
                    </div>
                    <div>
                        <span className="font-medium">Voice:</span> {formData.voice}
                    </div>
                    <div>
                        <span className="font-medium">Values:</span> {formData.audienceValues}
                    </div>
                </div>
            </div>
        </div>
    );

    const renderStep = () => {
        switch (currentStep) {
            case 0: return renderStep1();
            case 1: return renderStep2();
            case 2: return renderStep3();
            case 3: return renderStep4();
            case 4: return renderPreview();
            default: return renderStep1();
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-8">
            {/* Progress Bar */}
            <div className="mb-8">
                <div className="flex items-center justify-between mb-2">
                    <h2 className="text-lg font-bold">Initialize DNA - Core Doctrine</h2>
                    <span className="text-sm text-muted-foreground">Step {currentStep + 1} of {totalSteps}</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                    <div
                        className="h-full bg-primary rounded-full transition-all duration-500"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>

            {/* Step Content */}
            <Card className="p-8">
                {renderStep()}
            </Card>

            {/* Navigation */}
            <div className="flex justify-between items-center">
                <Button
                    variant="secondary"
                    onClick={handlePrevious}
                    disabled={currentStep === 0}
                    className="gap-2"
                >
                    ← Previous
                </Button>

                {currentStep < totalSteps - 1 ? (
                    <Button onClick={handleNext} className="gap-2">
                        Next Step
                        <ArrowRight size={16} />
                    </Button>
                ) : (
                    <Button onClick={handleSave} className="gap-2">
                        <Eye size={16} />
                        Save Doctrine
                    </Button>
                )}
            </div>
        </div>
    );
};
