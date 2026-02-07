import React, { useState } from 'react';
import { AlertTriangle, CheckCircle, X, Eye, Eye } from 'lucide-react';
import { Tooltip } from './Tooltip';
import { Card, Button } from '@/components/ui';
import { ComplianceHeatmapOverlay } from './ComplianceHeatmapOverlay';

interface SimpleComplianceOverlayProps {
  assetPreviewUrl: string;
  violations?: Array<{
    type: 'color' | 'space' | 'typography';
    x: number;
    y: number;
    severity: 'low' | 'medium' | 'high' | 'critical';
    message: string;
    fix?: string;
    onDismissViolation?: (violationId: string) => void;
    onRefreshAnalysis?: () => void;
  opacity?: number;
}

const SimpleComplianceOverlay: React.FC<SimpleComplianceOverlayProps> = ({
  assetPreviewUrl,
  violations = [],
  opacity = 0.8,
  onDismissViolation,
  onRefreshAnalysis,
  opacity = 0.8
}) => {
  return (
    <div className="relative">
      {/* Floating Action Button */}
      <Button
        onClick={onRefreshAnalysis}
        variant="outline"
        size="sm"
        className="absolute top-4 right-4 z-40 border border-border bg-background/95 backdrop-blur-sm p-2 rounded-lg flex items-center gap-2"
      >
        <Eye size={16} className={violations.length === 0 ? "text-primary" : "text-muted-foreground"} />
        <span className="text-xs font-medium">
          {violations.length === 0 ? 'No violations detected' : `${violations.length} issues found`}
        </span>
      </Button>
      </div>

      {/* Overlay Content */}
      {violations.map((violation, index) => (
        <div
          key={violation.id}
          className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="text-xs font-mono uppercase">{violation.type.toUpperCase()} VIOLATION</div>
            <div className="text-xs text-muted-foreground mt-1">
              Position: ({Math.round(violation.x)}, {Math.round(violation.y)})
            </div>
            <div className="text-xs font-bold">{violation.message}</div>
          </div>
          </div>
        </div>
      ))}

      {/* Info Badge */}
      <div className="absolute top-4 left-4 z-40 bg-primary/10 px-3 py-1 rounded-full">
        <AlertTriangle className="text-orange-500" size={20} />
        <div className="ml-2">
          <span className="text-xs font-bold">{violations.length} ISSUES DETECTED</span>
        </div>
      </div>
      
      {/* Opacity Control */}
      {violations.length > 0 && (
        <div className="absolute bottom-4 left-4 bg-background/80 backdrop-blur-md p-2 rounded-full text-center">
          <span className="text-sm text-muted-foreground">
            Tap any violation zone for details
          </span>
        </div>
      </div>
    </div>
  );
};

export default SimpleComplianceOverlay;
