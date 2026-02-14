import React, { useMemo } from 'react';
import { NodeResizer, Handle, Position } from '@xyflow/react';
import { GitBranch, Merge, Split, Grid3X3 } from 'lucide-react';
import { MoodNodeData } from '../types';
import { NodeContainer } from '../components/NodeComponents';
import { PORT_TYPE_COLORS } from '../execution/portTypes';

// Specialized Hook-style Handle for Switch Logic
const SwitchHandle = ({ type, position, index, total, color }: { type: 'source' | 'target', position: Position, index: number, total: number, color: string }) => {
    const top = `${((index + 1) / (total + 1)) * 100}%`;
    const portId = type === 'target' ? `input_${index}` : `output_${index}`;

    return (
        <Handle
            type={type}
            position={position}
            id={portId}
            style={{
                top,
                background: 'transparent',
                border: 'none',
                width: '1px',
                height: '1px',
                zIndex: 50
            }}
            className="group"
        >
            {/* Visual Dot */}
            <div className={`
                absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                w-2.5 h-2.5 rounded-full border-2 ${color.replace('bg-', 'border-')}
                bg-background transition-all duration-300
                group-hover:scale-150 group-hover:bg-primary group-hover:border-primary
                group-connected:bg-primary group-connected:border-white
            `} />

            {/* Index Label */}
            <div className={`
                absolute top-1/2 ${position === Position.Left ? 'left-4' : 'right-4'} -translate-y-1/2
                text-[6px] font-mono font-black text-zinc-500 opacity-0 group-hover:opacity-100 transition-opacity
            `}>
                {index.toString().padStart(2, '0')}
            </div>
        </Handle>
    );
};

export const SwitchNode = ({ id, data, selected }: { id: string; data: MoodNodeData; selected: boolean }) => {
    // 3 Modes: 'Aggregator' (10:1), 'Broadcaster' (1:10), 'Matrix' (10:10)
    const mode = (data.mode as 'Aggregator' | 'Broadcaster' | 'Matrix') || 'Matrix';

    // Stable grid pattern (deterministic, no Math.random in render)
    const gridPattern = useMemo(() =>
        Array.from({ length: 25 }).map((_, i) => i % 3 === 0 || i % 7 === 0),
    []);

    const handleConfig = useMemo(() => {
        switch (mode) {
            case 'Aggregator': return { inputs: 10, outputs: 1 };
            case 'Broadcaster': return { inputs: 1, outputs: 10 };
            case 'Matrix': return { inputs: 10, outputs: 10 };
            default: return { inputs: 1, outputs: 1 };
        }
    }, [mode]);

    const Icon = useMemo(() => {
        if (mode === 'Aggregator') return Merge;
        if (mode === 'Broadcaster') return Split;
        return Grid3X3;
    }, [mode]);

    return (
        <NodeContainer
            selected={selected}
            title={`Switch::${mode}`}
            icon={Icon}
            typeColor="bg-blue-600"
            data={{ ...data, id, type: 'switch' }}
            id={id}
            resizer={
                <NodeResizer
                    minWidth={240}
                    minHeight={400} // Taller for handle distribution
                    isVisible={selected}
                    lineClassName="!border-blue-600/60"
                    handleClassName="!w-3 !h-3 !bg-blue-600 !border-background !rounded-full"
                />
            }
        >
            {/* Custom Dynamic Handles */}
            <div className="absolute inset-y-0 left-0 w-4 -translate-x-full">
                {Array.from({ length: handleConfig.inputs }).map((_, i) => (
                    <SwitchHandle key={`in-${i}`} type="target" position={Position.Left} index={i} total={handleConfig.inputs} color="bg-blue-600" />
                ))}
            </div>
            <div className="absolute inset-y-0 right-0 w-4 translate-x-full">
                {Array.from({ length: handleConfig.outputs }).map((_, i) => (
                    <SwitchHandle key={`out-${i}`} type="source" position={Position.Right} index={i} total={handleConfig.outputs} color="bg-blue-600" />
                ))}
            </div>

            <div className="flex flex-col p-6 h-full font-mono bg-zinc-900/40">
                <div className="space-y-6">
                    {/* Signal Matrix Visualization */}
                    <div className="aspect-square bg-zinc-950/80 border border-zinc-800 p-4 relative overflow-hidden group">
                        <div className="grid grid-cols-5 grid-rows-5 gap-2 h-full opacity-20 group-hover:opacity-40 transition-opacity">
                            {gridPattern.map((active, i) => (
                                <div key={i} className={`w-full h-full border border-blue-500/20 ${active ? 'bg-blue-500/20' : ''}`} />
                            ))}
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div className="text-[10px] font-black text-blue-500/80 uppercase tracking-[0.5em] animate-pulse">Matrix_Active</div>
                        </div>
                    </div>

                    {/* Mode Toggles */}
                    <div className="space-y-2">
                        <div className="text-[8px] font-black text-zinc-500 uppercase tracking-widest px-2">Routing_Protocol</div>
                        <div className="grid grid-cols-1 gap-1">
                            {['Aggregator', 'Broadcaster', 'Matrix'].map(m => (
                                <div
                                    key={m}
                                    onClick={() => data.onChange?.(id, { mode: m })}
                                    className={`
                                        px-3 py-2 text-[10px] uppercase font-bold tracking-wider transition-all cursor-pointer
                                        ${mode === m ? 'bg-blue-600 text-white' : 'bg-zinc-900 text-zinc-500 hover:text-white hover:bg-zinc-800'}
                                    `}
                                >
                                    {m}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mt-auto flex items-center justify-between opacity-40">
                    <span className="text-[8px] font-mono">SW_CORE_REL_v2.1</span>
                    <GitBranch size={10} />
                </div>
            </div>
        </NodeContainer>
    );
};
