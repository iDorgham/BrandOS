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
                <div className="flex-1 flex flex-col items-center justify-center p-12 text-center bg-[var(--cds-layer-01)] backdrop-blur-sm relative overflow-hidden">
                    {/* Background Detail */}
                    <div className="absolute inset-0 opacity-5 pointer-events-none">
                        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,var(--cds-interactive-01)_0%,transparent_70%)]" />
                    </div>

                    <div className="relative z-10 flex flex-col items-center">
                        <div className="w-16 h-16 bg-[var(--cds-support-error)] bg-opacity-10 flex items-center justify-center text-[var(--cds-support-error)] mb-8 border border-[var(--cds-support-error)] border-opacity-20 shadow-sm transition-transform hover:scale-105 duration-300">
                            <AlertCircle size={32} />
                        </div>

                        <h2 className="text-xl font-bold tracking-[0.2em] uppercase mb-4 text-[var(--cds-text-primary)]">
                            Something went wrong
                        </h2>

                        <p className="text-[11px] text-[var(--cds-text-secondary)] max-w-md mb-10 leading-relaxed uppercase tracking-wider font-medium opacity-80">
                            The system encountered an unexpected anomaly.
                            Please try reloading the session or attempt a quick recovery.
                        </p>

                        <div className="flex gap-[1px] bg-[var(--carbon-table-border)] border border-[var(--carbon-table-border)] shadow-lg">
                            <Button
                                onClick={() => window.location.reload()}
                                className="h-11 px-8 bg-[var(--cds-interactive-01)] hover:bg-[var(--cds-link-primary-hover)] text-white font-bold uppercase tracking-[0.2em] text-[10px] rounded-none border-transparent transition-all"
                            >
                                <RefreshCw size={14} className="mr-3" /> Reload
                            </Button>
                            <Button
                                variant="ghost"
                                onClick={() => this.setState({ hasError: false })}
                                className="h-11 px-8 bg-[var(--cds-layer-02)] hover:bg-[var(--cds-layer-hover)] text-[var(--cds-text-primary)] font-bold uppercase tracking-[0.2em] text-[10px] rounded-none border-transparent transition-all"
                            >
                                Try again
                            </Button>
                        </div>

                        {this.state.error && (
                            <div className="mt-16 p-5 bg-[var(--cds-field-01)] border border-[var(--carbon-table-border)] text-left max-w-2xl w-full group transition-all hover:border-[var(--cds-support-error)] hover:border-opacity-30">
                                <div className="flex items-center gap-2 mb-3 opacity-40 group-hover:opacity-80 transition-opacity">
                                    <div className="w-1 h-3 bg-[var(--cds-support-error)]" />
                                    <p className="text-[9px] font-mono font-bold text-[var(--cds-text-secondary)] uppercase tracking-[0.2em]">Error Signature</p>
                                </div>
                                <code className="text-[10px] font-mono text-[var(--cds-support-error)] break-all leading-relaxed whitespace-pre-wrap selection:bg-[var(--cds-support-error)] selection:text-white">
                                    {this.state.error.message}
                                </code>
                            </div>
                        )}
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}
