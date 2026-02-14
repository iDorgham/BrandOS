import React from 'react';
import { NodeResizer } from '@xyflow/react';
import { Globe } from 'lucide-react';
import { MoodNodeData } from '../types';
import { NodeContainer, TypedHandles } from '../components/NodeComponents';

export const WebRefNode = ({ id, data, selected }: { id: string; data: MoodNodeData; selected: boolean }) => (
    <NodeContainer
        selected={selected}
        title="Web_Portal"
        icon={Globe}
        typeColor="bg-indigo-500"
        handles={<TypedHandles nodeType="web_ref" />}
        data={{ ...data, id, type: 'web_ref' }}
        id={id}
        resizer={
            <NodeResizer
                minWidth={250}
                minHeight={150}
                isVisible={selected}
                lineClassName="!border-primary/60"
                handleClassName="!w-3 !h-3 !bg-primary !border-background !rounded-full shadow-sm hover:scale-150 transition-transform"
            />
        }
    >
        <div className="flex flex-col h-full bg-zinc-50 dark:bg-zinc-900/40">
            <div className="flex items-center gap-3 p-2 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-4">
                <div className="flex gap-1">
                    {[1, 2, 3].map(i => <div key={i} className="w-1.5 h-1.5 border border-zinc-200 dark:border-zinc-700" />)}
                </div>
                <div className="flex-1 bg-zinc-50 dark:bg-zinc-950 h-5 border border-zinc-200 dark:border-zinc-800 px-3 flex items-center text-[7px] font-mono text-zinc-400 truncate tracking-widest uppercase">
                    URL_REF_GATEWAY::0x8821
                </div>
            </div>

            <div className="flex-1 relative group/iframe bg-white dark:bg-zinc-950/40 overflow-hidden">
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center gap-4">
                    <div className="w-12 h-12 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center group-hover/iframe:border-primary transition-all duration-500">
                        <Globe size={24} className="text-zinc-300 dark:text-zinc-700 group-hover/iframe:text-primary transition-colors" strokeWidth={1} />
                    </div>
                    <div className="space-y-1">
                        <span className="text-[9px] font-bold font-mono uppercase tracking-widest text-zinc-800 dark:text-zinc-200">PORTAL_STREAMS_ACTIVE</span>
                        <div className="text-[6px] font-mono text-zinc-400 uppercase tracking-[0.3em]">Lat: 22ms // Protocol: TLS_1.3</div>
                    </div>
                </div>

                {/* Tech Grid */}
                <div className="absolute inset-0 bg-[radial-gradient(rgba(0,0,0,0.02)_1px,transparent_1px)] dark:bg-[radial-gradient(rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[length:16px_16px] pointer-events-none" />

                {/* Scanner Line */}
                <div className="absolute inset-x-0 h-px bg-primary/20 top-0 animate-[scan_4s_linear_infinite]" />
            </div>
        </div>
    </NodeContainer>
);
