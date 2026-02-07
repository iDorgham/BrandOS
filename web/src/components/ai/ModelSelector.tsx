import React from 'react';
import { Settings, Check, Zap, Brain, Eye, Sparkles } from 'lucide-react';
import { Card, Button } from '@/components/ui';
import { aiManager, AVAILABLE_MODELS, AIModel } from '../../services/ai.service';

interface ModelSelectorProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ModelSelector: React.FC<ModelSelectorProps> = ({ isOpen, onClose }) => {
  const currentModel = aiManager.getCurrentModel();

  const handleModelSelect = (model: AIModel) => {
    aiManager.setModel(model.id);
    onClose();
  };

  const getModelIcon = (model: AIModel) => {
    switch (model.provider) {
      case 'google':
        return <Zap className="text-blue-500" size={20} />;
      case 'anthropic':
        return <Brain className="text-purple-500" size={20} />;
      case 'meta':
        return <Eye className="text-blue-400" size={20} />;
      case 'openai':
        return <Sparkles className="text-green-500" size={20} />;
      default:
        return <Settings size={20} />;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-background/80 backdrop-blur-sm animate-in fade-in duration-200">
      <Card className="w-full max-w-2xl max-h-[80vh] overflow-y-auto shadow-2xl bg-card border border-border">
        {/* Header */}
        <div className="sticky top-0 bg-card border-b border-border p-4 sm:p-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-display font-black flex items-center gap-3">
              <Settings className="text-primary" /> AI Model Selection
            </h2>
            <p className="text-sm text-muted-foreground mt-1">Choose the best AI model for your creative workflow</p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <Settings size={20} />
          </Button>
        </div>

        <div className="p-4 sm:p-6 space-y-4">
          {AVAILABLE_MODELS.map((model) => (
            <div
              key={model.id}
              onClick={() => handleModelSelect(model)}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all hover:border-primary/50 ${
                currentModel.id === model.id
                  ? 'border-primary bg-primary/10'
                  : 'border-border bg-card hover:bg-accent/50'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-1">
                  {getModelIcon(model)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-bold text-base">{model.name}</h3>
                    {currentModel.id === model.id && (
                      <span className="px-2 py-1 bg-primary text-primary-foreground text-xs font-bold rounded-full">
                        Active
                      </span>
                    )}
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-3">
                    Recommended for: {model.recommendedFor}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {model.capabilities.map((capability) => (
                      <span
                        key={capability}
                        className={`px-2 py-1 text-xs font-mono rounded border ${
                          capability === 'text'
                            ? 'bg-blue-100 text-blue-700 border-blue-200'
                            : capability === 'image'
                            ? 'bg-green-100 text-green-700 border-green-200'
                            : 'bg-purple-100 text-purple-700 border-purple-200'
                        }`}
                      >
                        {capability.toUpperCase()}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div className="mt-6 p-4 bg-accent/30 rounded-lg border border-border">
            <h4 className="font-bold text-sm mb-2 flex items-center gap-2">
              <Brain className="text-primary" size={16} />
              Model Routing Logic
            </h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Brand OS automatically routes to the best model based on task type:
            </p>
            <div className="mt-3 space-y-2 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <span><strong>Vector/Graphics:</strong> Gemini 3 Pro Image (highest fidelity)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-500" />
                <span><strong>Text/Prompts:</strong> Selected text model (default: Gemini 3 Pro)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-purple-500" />
                <span><strong>Analysis:</strong> Claude 3 Opus (for detailed insights)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-card border-t border-border p-4 sm:p-6 flex gap-3">
          <Button variant="outline" onClick={onClose} className="flex-1">
            Cancel
          </Button>
        </div>
      </Card>
    </div>
  );
};

// Simple button component for triggering model selector
export const ModelSelectorButton: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const currentModel = aiManager.getCurrentModel();

  const getModelIcon = (model: AIModel) => {
    switch (model.provider) {
      case 'google':
        return <Zap className="text-blue-500" size={16} />;
      case 'anthropic':
        return <Brain className="text-purple-500" size={16} />;
      case 'meta':
        return <Eye className="text-blue-400" size={16} />;
      case 'openai':
        return <Sparkles className="text-green-500" size={16} />;
      default:
        return <Settings size={16} />;
    }
  };

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(true)}
        className="gap-2"
      >
        {getModelIcon(currentModel)}
        {currentModel.name}
      </Button>
      
      <ModelSelector isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};
