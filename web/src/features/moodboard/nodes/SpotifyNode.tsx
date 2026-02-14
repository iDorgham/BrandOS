import React from 'react';
import { NodeResizer } from '@xyflow/react';
import { Music } from 'lucide-react';
import { MoodNodeData } from '../types';
import { NodeContainer, TypedHandles } from '../components/NodeComponents';

export const SpotifyNode = ({ id, data, selected }: { id: string; data: MoodNodeData; selected: boolean }) => (
    <NodeContainer
        selected={selected}
        title="Sonic_Stream"
        icon={Music}
        typeColor="bg-green-500"
        handles={<TypedHandles nodeType="spotify" />}
        data={{ ...data, id, type: 'spotify' }}
        id={id}
        resizer={
            <NodeResizer
                minWidth={200}
                minHeight={150}
                isVisible={selected}
                lineClassName="!border-primary/60"
                handleClassName="!w-3 !h-3 !bg-primary !border-background !rounded-full shadow-sm hover:scale-150 transition-transform"
            />
        }
    >
        <div className="flex flex-col h-full bg-zinc-50 dark:bg-zinc-900/40">
            <div className="flex-1 flex items-center justify-center p-6 relative overflow-hidden group/art bg-white dark:bg-zinc-950/40">
                <div className="w-16 h-16 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center relative group-hover/art:border-primary transition-all duration-500">
                    <Music size={24} className="text-zinc-300 dark:text-zinc-700 animate-pulse group-hover:text-primary" strokeWidth={1} />
                </div>

                {/* Technical Grid */}
                <div className="absolute inset-0 opacity-5 dark:opacity-10 pointer-events-none">
                    <div className="absolute inset-4 border border-zinc-200 dark:border-zinc-800" />
                </div>

                {/* Animated Spectrum - monochrome */}
                <div className="absolute bottom-4 inset-x-0 flex justify-center gap-1.5 h-6 px-8">
                    {[1, 3, 2, 4, 3, 5, 2, 4].map((h, i) => (
                        <div key={i} className="flex-1 max-w-[2px] bg-zinc-200 dark:bg-zinc-800" style={{
                            height: `${h * 20}%`,
                            animation: `pulse 1.5s infinite ${i * 0.2}s ease-in-out`
                        }}>
                            <div className="h-full bg-primary/20 w-full" />
                        </div>
                    ))}
                </div>
            </div>

            <div className="p-5 bg-white dark:bg-zinc-900 border-t border-zinc-100 dark:border-zinc-800 space-y-4">
                <div className="space-y-2">
                    <div className="h-0.5 bg-zinc-100 dark:bg-zinc-800 w-full overflow-hidden">
                        <div className="h-full bg-primary w-1/3" />
                    </div>
                    <div className="flex justify-between items-center text-[6px] font-mono tracking-widest text-zinc-400">
                        <span>L_0:42</span>
                        <span>R_3:14</span>
                    </div>
                </div>

                <div className="flex justify-between items-end">
                    <div className="space-y-1">
                        <div className="text-[11px] font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-tight truncate max-w-[140px]">Layer_Ref_01.aac</div>
                        <div className="flex items-center gap-2">
                            <span className="text-[6px] font-mono text-zinc-400 uppercase tracking-widest">SONIC_FINGERPRINT::0x882</span>
                        </div>
                    </div>
                    <div className="px-1.5 py-0.5 border border-zinc-200 dark:border-zinc-700 text-[6px] font-mono font-bold text-zinc-500 uppercase">
                        SONIC_O1
                    </div>
                </div>
            </div>
        </div>
    </NodeContainer>
);
