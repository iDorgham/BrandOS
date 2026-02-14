import React from 'react';
import { NodeResizer } from '@xyflow/react';
import { Send, Mail, SendHorizontal, HardDrive, Share2, Globe } from 'lucide-react';
import { MoodNodeData } from '../types';
import { NodeContainer, TypedHandles } from '../components/NodeComponents';

export const EmitterNode = ({ id, data, selected }: { id: string; data: MoodNodeData; selected: boolean }) => {
    return (
        <NodeContainer
            selected={selected}
            title="Signal Out"
            icon={Send}
            typeColor="bg-indigo-500"
            handles={<TypedHandles nodeType="emitter" />}
            data={{ ...data, id, type: 'emitter' }}
            id={id}
            resizer={
                <NodeResizer
                    minWidth={280}
                    minHeight={160}
                    isVisible={selected}
                    lineClassName="!border-indigo-500/60"
                    handleClassName="!w-3 !h-3 !bg-indigo-500 !border-background !rounded-full shadow-sm hover:scale-150 transition-transform"
                />
            }
        >
            <div className="flex flex-col gap-4 p-5 h-full relative overflow-hidden">
                <div className="space-y-4 pt-2">
                    {/* Destination Selector */}
                    <div className="grid grid-cols-2 gap-2">
                        <div className="flex flex-col gap-1 p-3 bg-zinc-50 dark:bg-zinc-900 border border-indigo-500/40 transition-colors group cursor-pointer">
                            <SendHorizontal size={12} className="text-indigo-500" />
                            <span className="text-[9px] font-black uppercase tracking-widest text-zinc-900 dark:text-zinc-100">Telegram</span>
                            <span className="text-[7px] font-mono text-zinc-400 tracking-tight">Channel::Social_Buzz</span>
                        </div>
                        <div className="flex flex-col gap-1 p-3 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-indigo-500/40 transition-colors group cursor-pointer opacity-50">
                            <HardDrive size={12} className="text-zinc-400 group-hover:text-indigo-500 transition-colors" />
                            <span className="text-[9px] font-black uppercase tracking-widest text-zinc-900 dark:text-zinc-100">G_Drive</span>
                            <span className="text-[7px] font-mono text-zinc-400 tracking-tight">Folder::Drafts</span>
                        </div>
                    </div>

                    {/* Metadata */}
                    <div className="flex flex-col gap-2">
                        <div className="flex justify-between items-center text-[7px] font-mono font-black uppercase tracking-widest text-zinc-500 bg-zinc-50 dark:bg-zinc-900/50 p-2 border-l-2 border-indigo-500">
                            <span>DESTINATION_STABLE</span>
                            <span className="text-emerald-500">CONNECTED</span>
                        </div>
                        <div className="space-y-1 px-2">
                            <div className="flex items-center gap-2">
                                <Mail size={10} className="text-zinc-400" />
                                <span className="text-[7px] font-mono uppercase tracking-[0.2em] text-zinc-400">Email_Digest::Ready</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Globe size={10} className="text-zinc-400" />
                                <span className="text-[7px] font-mono uppercase tracking-[0.2em] text-zinc-400">Webhook::Inactive</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-auto pt-4 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Share2 size={10} className="text-indigo-400" />
                        <span className="text-[6px] font-mono uppercase tracking-widest text-zinc-500">DISTRIBUTION_HUB</span>
                    </div>
                    <div className="flex gap-1.5 opacity-30">
                        <div className="w-1 h-3 bg-indigo-500" />
                        <div className="w-1 h-3 bg-indigo-500" />
                        <div className="w-1 h-1 bg-indigo-500" />
                    </div>
                </div>
            </div>
        </NodeContainer>
    );
};
