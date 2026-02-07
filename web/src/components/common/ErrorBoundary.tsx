import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui';

interface Props {
    children?: ReactNode;
    fallback?: ReactNode;
}

interface State {
    hasError: boolean;
    error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Uncaught error in view:', error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            if (this.props.fallback) {
                return this.props.fallback;
            }

            return (
                <div className="flex-1 flex flex-col items-center justify-center p-12 text-center bg-background/50 backdrop-blur-sm">
                    <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center text-destructive mb-6">
                        <AlertCircle size={32} />
                    </div>
                    <h2 className="text-xl font-display font-black tracking-tight uppercase mb-4">View Extraction Failure</h2>
                    <p className="text-sm text-muted-foreground max-w-md mb-8 leading-relaxed">
                        The neural protocol encountered an anomaly while rendering this sector.
                        The data stream has been interrupted to protect system integrity.
                    </p>
                    <div className="flex gap-4">
                        <Button
                            onClick={() => window.location.reload()}
                            className="rounded-none px-6 font-mono font-black uppercase tracking-widest"
                        >
                            <RefreshCw size={16} className="mr-2" /> Re-Initialize Session
                        </Button>
                        <Button
                            variant="secondary"
                            onClick={() => this.setState({ hasError: false })}
                            className="rounded-none px-6 font-mono font-black uppercase tracking-widest border-border/40"
                        >
                            Attempt Recovery
                        </Button>
                    </div>
                    {this.state.error && (
                        <div className="mt-12 p-4 bg-black/40 border border-white/5 rounded-none text-left max-w-2xl w-full">
                            <p className="text-[10px] font-mono text-muted-foreground uppercase mb-2 opacity-50">Error Signature:</p>
                            <code className="text-[10px] font-mono text-rose-400 break-all">{this.state.error.message}</code>
                        </div>
                    )}
                </div>
            );
        }

        return this.props.children;
    }
}
