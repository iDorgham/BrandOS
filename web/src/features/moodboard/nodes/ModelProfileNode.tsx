import React from 'react';
import { NodeResizer } from '@xyflow/react';
import { User, Palette, Sparkles, Wand2, Layers } from 'lucide-react';
import { MoodNodeData } from '../types';
import { NodeContainer, NodeHandles } from '../components/NodeComponents';

export const ModelProfileNode = ({ id, data, selected }: { id: string; data: MoodNodeData; selected: boolean }) => {
    return (
        <NodeContainer
            selected={selected}
            title="Model Profile"
            icon={User}
            typeColor="bg-fuchsia-500"
            handles={<NodeHandles nodeColor="bg-fuchsia-500" />}
            data={{ ...data, id, type: 'model_profile' }}
            id={id}
            resizer={
                <NodeResizer
                    minWidth={300}
                    minHeight={420}
                    isVisible={selected}
                    lineClassName="!border-fuchsia-500/60"
                    handleClassName="!w-3 !h-3 !bg-fuchsia-500 !border-background !rounded-full"
                />
            }
        >
            <div className="flex flex-col p-6 h-full space-y-6 overflow-hidden">
                {/* Avatar / Identity Preview */}
                <div className="relative group aspect-[3/4] bg-zinc-100 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center overflow-hidden">
                    <User size={64} className="text-zinc-200 dark:text-zinc-900 group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-fuchsia-500/10 to-transparent" />
                    <div className="absolute top-4 left-4 flex gap-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-fuchsia-500 shadow-[0_0_8px_rgba(232,58,237,0.5)]" />
                        <span className="text-[7px] font-black uppercase tracking-widest text-fuchsia-600">Rig_Active</span>
                    </div>
                    {/* Character Metas */}
                    <div className="absolute bottom-4 left-4 right-4 space-y-1">
                        <div className="h-1 w-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden">
                            <div className="h-full bg-fuchsia-500 w-2/3" />
                        </div>
                        <div className="flex justify-between text-[6px] font-mono text-zinc-400 font-bold">
                            <span>CONSISTENCY::68%</span>
                            <span>AESTHETIC::PRIME</span>
                        </div>
                    </div>
                </div>

                {/* Profile Traits */}
                <div className="space-y-3 flex-1 overflow-y-auto custom-scrollbar pr-2">
                    <div className="flex items-center justify-between text-[8px] font-black uppercase tracking-widest text-zinc-500 border-b border-zinc-100 dark:border-zinc-900 pb-2 mb-2">
                        <span>CHARACTER_ATTRIBUTES</span>
                        <Wand2 size={10} className="text-fuchsia-400" />
                    </div>

                    <div className="space-y-2">
                        {[
                            { label: 'Ethnicity', value: 'Cyber-Nordic' },
                            { label: 'Palette', value: 'Neon_Chrome' },
                            { label: 'Lighting', value: 'Volumetric_Fog' },
                            { label: 'Expression', value: 'Stoic_Minimalism' }
                        ].map(trait => (
                            <div key={trait.label} className="flex flex-col gap-1 p-2 bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 group hover:border-fuchsia-500/20 transition-all cursor-text">
                                <span className="text-[7px] font-mono font-bold uppercase text-zinc-400 group-hover:text-fuchsia-500 transition-colors">{trait.label}</span>
                                <span className="text-[9px] font-bold text-zinc-800 dark:text-zinc-200 uppercase tracking-wider">{trait.value}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Actions Footer */}
                <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between gap-4">
                    <div className="flex gap-2">
                        <Palette size={14} className="text-zinc-400 hover:text-fuchsia-500 cursor-pointer transition-colors" />
                        <Layers size={14} className="text-zinc-400 hover:text-fuchsia-500 cursor-pointer transition-colors" />
                    </div>
                    <div className="flex-1" />
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-fuchsia-500/10 border border-fuchsia-500/20 text-fuchsia-500">
                        <Sparkles size={10} className="animate-pulse" />
                        <span className="text-[8px] font-black uppercase tracking-widest">Rig_Sync</span>
                    </div>
                </div>
            </div>
        </NodeContainer>
    );
};
