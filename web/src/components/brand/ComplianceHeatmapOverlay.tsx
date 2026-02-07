import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Eye, EyeOff, AlertTriangle, CheckCircle, X, Info, RotateCcw } from 'lucide-react';

import { Card, Button } from '@/components/ui';

interface ComplianceViolation {
  type: 'color' | 'space' | 'typography';
  x: number;
  y: number;
  width: number;
  height: number;
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  fix?: string;
}

interface ComplianceHeatmapOverlayProps {
  assetPreviewUrl: string;
  violations: ComplianceViolation[];
  opacity?: number;
  onDismissViolation?: (violationId: string) => void;
  onRefreshAnalysis?: () => void;
}

const ComplianceHeatmapOverlay: React.FC<ComplianceHeatmapOverlayProps> = ({
  assetPreviewUrl,
  violations = [],
  opacity = 0.85,
  onDismissViolation,
  onRefreshAnalysis
}) => {
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const canvasRef = useRef<HTMLDivElement>(null);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [currentViolations, setCurrentViolations] = useState<ComplianceViolation[]>([]);

  // Auto-analyze asset when URL changes
  useEffect(() => {
    if (assetPreviewUrl) {
      analyzeAssetCompliance();
    }
  }, [assetPreviewUrl, onRefreshAnalysis]);

  // Analyze asset compliance using AI
  const analyzeAssetCompliance = useCallback(async () => {
    setIsAnalyzing(true);
    setAnalysisProgress(0);
    setShowAnalysis(false);

    try {
      // Simulate AI analysis (in real implementation, this would call your AI service)
      const mockViolations: ComplianceViolation[] = [];
      
      // Generate mock violations based on common brand guideline issues
      if (Math.random() > 0.7) {
        // Color palette violation
        mockViolations.push({
          id: 'color-violation-1',
          type: 'color',
          x: 20,
          y: 15,
          width: 40,
          height: 40,
          severity: 'high',
          message: 'Color outside brand palette - detected hex #FF0000'
        });
      }

      if (Math.random() > 0.5) {
        // Typography violation
        mockViolations.push({
          id: 'typography-violation-1',
          type: 'typography',
          x: 140,
          y: 45,
          width: 60,
          height: 30,
          severity: 'medium',
          message: 'Font family not in brand guidelines'
        });
      }

      if (Math.random() > 0.3) {
        // Negative space violation
        mockViolations.push({
          id: 'space-violation-1',
          type: 'space',
          x: 100,
          y: 25,
          width: 120,
          height: 80,
          severity: 'critical',
          message: 'Insufficient negative space - requires 30% empty area'
        });
      }

      if (Math.random() > 0.8) {
        // Aspect ratio violation
        mockViolations.push({
          id: 'space-violation-2',
          type: 'space',
          x: 50,
          y: 200,
          width: 100,
          height: 50,
          severity: 'high',
          message: 'Composition too dense - requires more breathing room'
        });
      }

      // Progressive update to show analysis progress
      for (let i = 0; i <= 4; i++) {
        setAnalysisProgress((prev) => Math.min(prev + 25, 100));
        await new Promise(resolve => setTimeout(resolve, 300));
      }

      setCurrentViolations(mockViolations);
      setShowAnalysis(true);
      setAnalysisProgress(100);

    } catch (error) {
      console.error('Analysis failed:', error);
      setIsAnalyzing(false);
      setAnalysisProgress(0);
    }
  }, [assetPreviewUrl]);

  const dismissViolation = useCallback((violationId: string) => {
    setCurrentViolations(prev => prev.filter(v => v.id !== violationId));
  }, []);

  const refreshAnalysis = useCallback(() => {
    analyzeAssetCompliance();
  }, [assetPreviewUrl]);

  const getViolationIcon = (type: ComplianceViolation['type']) => {
    switch (type) {
      case 'color':
        return <AlertTriangle className="text-red-500" size={16} />;
      case 'typography':
        return <AlertTriangle className="text-orange-500" size={16} />;
      case 'space':
        return <AlertTriangle className="text-yellow-500" size={16} />;
      default:
        return <AlertTriangle className="text-blue-500" size={16} />;
    }
  };

  const getViolationColor = (severity: ComplianceViolation['severity']) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-500/10 border-red-500/20 text-red-500';
      case 'high':
        return 'bg-orange-500/10 border-orange-500/20 text-orange-500';
      case 'medium':
        return 'bg-yellow-500/10 border-yellow-500/20 text-yellow-500';
      case 'low':
        return 'bg-blue-500/10 border-blue-500/20 text-blue-500';
      default:
        return 'bg-gray-500/10 border-gray-500/20 text-gray-500';
    }
  };

  return (
    <div className="relative">
      {/* Overlay Toggle Button */}
      <Button
        onClick={() => setShowAnalysis(!showAnalysis)}
        variant="outline"
        size="sm"
        className={`absolute top-4 right-4 z-50 border border-border bg-background/90 backdrop-blur-sm p-2 rounded-lg flex items-center gap-2 transition-all hover:border-primary/50`}
      >
        <Eye size={16} className={showAnalysis ? "text-muted-foreground" : "text-primary"} />
        {showAnalysis ? 'Hide Analysis' : 'Show Analysis'}
      </Button>

      {/* Analysis Panel */}
      {showAnalysis && (
        <div className="absolute top-16 right-4 z-40 w-80 bg-background/95 backdrop-blur-sm border border-border rounded-lg shadow-2xl p-4 animate-in slide-in-from-right duration-300">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <AlertTriangle className="text-orange-500" size={20} />
              Compliance Analysis
            </h3>
            <Button
              variant="outline"
              size="sm"
              onClick={refreshAnalysis}
              disabled={isAnalyzing}
              className="gap-2"
            >
              <RotateCcw size={14} className={isAnalyzing ? "animate-spin" : ""} />
              {isAnalyzing ? 'Analyzing...' : 'Refresh'}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowAnalysis(false)}
              className="gap-2"
            >
              <X size={16} />
            </Button>
          </div>

          {/* Progress Bar */}
          <div className="mb-4">
            <div className="w-full bg-background/20 rounded-full h-1.5">
              <div 
                className="h-full bg-gradient-to-r from-green-500 to-emerald-500 transition-all duration-700 ease-linear"
                style={{ width: `${analysisProgress}%` }}
              />
            </div>
            <div className="text-center -mt-2 text-xs font-medium text-muted-foreground">
              Analysis: {Math.round(analysisProgress)}%
            </div>
          </div>

          {/* Violations List */}
          <div className="space-y-3 max-h-60 overflow-y-auto">
            {currentViolations.length === 0 ? (
              <div className="text-center text-muted-foreground py-8">
                <CheckCircle size={24} className="text-green-500 mb-2" />
                <div>
                  <div className="flex items-center gap-2 text-center px-2 py-1 rounded-full bg-red-500/10">
                    <span className="text-white text-sm font-bold">{currentViolations.length}</span>
                  </div>
                  <h4 className="text-white">Violations</h4>
                </div>

                {currentViolations.map((violation, index) => (
                  <div key={violation.id} className={`p-4 border-2 rounded-lg ${getViolationColor(violation.severity)} transition-all hover:shadow-lg`}>
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className={`p-1 rounded-full ${getViolationColor(violation.severity)} text-white shrink-0`}>
                          {getViolationIcon(violation.type)}
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-white">{violation.type.toUpperCase()}</div>
                          <div className="text-xs text-white opacity-80">{violation.message}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="px-2 py-0.5 bg-white/10 rounded-lg border border-white/20">
                          <span className="text-xs font-medium">Severity: {violation.severity}</span>
                          <span className="text-[8px] font-bold">Position: ({Math.round(violation.x)}, {Math.round(violation.y)})</span>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onDismissViolation(violation.id)}
                        className="gap-1"
                      >
                        <CheckCircle size={12} />
                        {violation.fix ? (
                          <span className="text-xs text-muted-foreground">Fixed</span>
                        ) : (
                          <span className="text-xs text-muted-foreground">Dismiss</span>
                        )}
                      </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>

          {/* Analysis Summary */}
          {currentViolations.length > 0 && (
            <div className="mt-6 p-4 bg-accent/30 rounded-lg border border-border">
              <div className="flex items-center gap-3 mb-2">
                <Info size={16} className="text-blue-500" />
                <h4 className="font-bold">Analysis Summary</h4>
                <div className="text-xs text-muted-foreground">
                  <span className="text-orange-500 font-bold">{currentViolations.filter(v => v.severity === 'critical').length}</span> Critical
                  {' '}
                  <span className="text-red-500 font-bold">{currentViolations.filter(v => v.severity === 'high').length}</span> High
                  {' '}
                  <span className="text-orange-500 font-bold">{currentViolations.filter(v => v.severity === 'medium').length}</span> Medium
                  {' '}
                  <span className="text-blue-500 font-bold">{currentViolations.filter(v => v.severity === 'low').length}</span> Low
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Overlay Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full pointer-events-none z-50"
        style={{ opacity: opacity }}
      />

      {/* Draw violation zones on canvas */}
      <svg className="absolute top-0 left-0 w-full h-full pointer-events-none z-50">
        {currentViolations.map((violation, index) => (
          <g key={`violation-${index}`}>
            <rect
              x={violation.x}
              y={violation.y}
              width={violation.width}
              height={violation.height}
              className={`${getViolationColor(violation.severity)} opacity-30`}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeDasharray="5,5"
            />
            <circle
              cx={violation.x + violation.width / 2}
              cy={violation.y + violation.height / 2}
              r="4"
              className={`${getViolationColor(violation.severity)} fill="currentColor" opacity-50`}
              stroke="white"
              strokeWidth="2"
            />
          </g>
        ))}
      </svg>
    </div>
    ) : null}

    {/* Mobile Touch Zones */}
    <div className="absolute bottom-4 right-4 z-50 flex flex-col gap-2">
      {currentViolations.map((violation, index) => (
        <div
          key={`touch-zone-${index}`}
          className="absolute bg-black/50 border border-white/5 rounded-full p-2 text-white text-center opacity-80 transition-opacity"
          style={{
            left: `${violation.x}px`,
            top: `${violation.y}px`,
            width: '80px',
            height: '80px'
          }}
          onClick={() => {
            const rect = canvasRef.current?.getBoundingClientRect();
            if (rect) {
              const x = (violation.x / rect.width) * 100;
              const y = (violation.y / rect.height) * 100;
              
              alert(`Touch violation zone: ${violation.type.toUpperCase()}\nPosition: ${Math.round(x)}%, ${Math.round(y)}%`);
            }
          }}
        >
          <div className="text-xs font-mono uppercase tracking-widest">
            {violation.type.charAt(0)}
          </div>
          {getViolationIcon(violation.type)}
        </div>
      ))}
    </div>
    </div>
  );
};

export default ComplianceHeatmapOverlay;
