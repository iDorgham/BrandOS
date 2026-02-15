import React, { useRef, useState } from 'react';
import { NodeResizer } from '@xyflow/react';
import { Image as ImageIcon, Upload } from 'lucide-react';
import { toast } from 'sonner';
import { MoodNodeData } from '../types';
import { NodeContainer, TypedHandles } from '../components/NodeComponents';
import { useMoodBoard } from '../MoodBoardContext';

export const ImageNode = React.memo(({ id, data, selected }: { id: string; data: MoodNodeData; selected: boolean }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [tempLabel, setTempLabel] = useState(data.label);
    const [isDraggingOver, setIsDraggingOver] = useState(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const imageUrl = reader.result as string;
                const img = new Image();
                img.onload = () => {
                    const maxWidth = 500;
                    const aspectRatio = img.height / img.width;
                    const width = Math.min(img.width, maxWidth);
                    const height = width * aspectRatio;
                    const finalWidth = width;
                    const finalHeight = height + 40 + 20;

                    data.onChange?.(id, {
                        imageUrl,
                        width: img.width,
                        height: img.height
                    }, {
                        width: finalWidth,
                        height: finalHeight
                    });
                };
                img.src = imageUrl;
                toast.success('DNA visual reference captured');
            };
            reader.readAsDataURL(file);
        }
    };

    const { isShiftPressed } = useMoodBoard();

    return (
        <NodeContainer
            selected={selected}
            title={String(data.label || 'Image')}
            icon={ImageIcon}
            typeColor="bg-blue-600"
            onEdit={() => setIsEditing(!isEditing)}
            isEditing={isEditing}
            handles={<TypedHandles nodeType="image" />}
            data={{ ...data, id, type: 'image' }}
            id={id}
            resizer={
                <NodeResizer
                    minWidth={120}
                    minHeight={100}
                    isVisible={selected}
                    keepAspectRatio={isShiftPressed || data.isRatioLocked}
                    lineClassName="!border-primary/60"
                    handleClassName="!w-3 !h-3 !bg-primary !border-background !rounded-full shadow-xl hover:scale-150 transition-transform"
                />
            }
        >
            {isEditing && (
                <div className="px-3 pt-2">
                    <input
                        type="text"
                        value={tempLabel}
                        onChange={(e) => setTempLabel(e.target.value)}
                        onBlur={() => { data.onChange?.(id, { label: tempLabel }); setIsEditing(false); }}
                        className="w-full bg-muted/40 border-b border-primary/40 text-[10px] font-mono font-black outline-none py-1 uppercase tracking-widest"
                        autoFocus
                    />
                </div>
            )}
            <div
                className={`relative flex-1 bg-muted/30 overflow-hidden group/img cursor-crosshair transition-all min-h-0 flex flex-col justify-center ${isDraggingOver ? 'ring-2 ring-primary ring-inset bg-primary/5' : ''}`}
                onClick={() => fileInputRef.current?.click()}
                onDragOver={(e) => {
                    e.preventDefault();
                    if (e.dataTransfer.types.includes('Files')) {
                        setIsDraggingOver(true);
                    }
                }}
                onDragLeave={() => setIsDraggingOver(false)}
                onDrop={(e) => {
                    e.preventDefault();
                    setIsDraggingOver(false);
                    const file = e.dataTransfer.files?.[0];
                    if (file && file.type.startsWith('image/')) {
                        const reader = new FileReader();
                        reader.onload = () => {
                            const imageUrl = reader.result as string;
                            const img = new Image();
                            img.onload = () => {
                                const maxWidth = 500;
                                const aspectRatio = img.height / img.width;
                                const width = Math.min(img.width, maxWidth);
                                const height = width * aspectRatio;
                                const finalWidth = width;
                                const finalHeight = height + 40 + 20;

                                data.onChange?.(id, {
                                    imageUrl,
                                    width: img.width,
                                    height: img.height
                                }, {
                                    width: finalWidth,
                                    height: finalHeight
                                });
                                toast.success('Source asset successfully hot-swapped');
                            };
                            img.src = imageUrl;
                        };
                        reader.readAsDataURL(file);
                    }
                }}
            >
                {data.imageUrl ? (
                    <>
                        <img
                            src={data.imageUrl}
                            alt={String(data.label || '')}
                            className="w-full h-full object-cover transition-all duration-300"
                            style={{
                                filter: `
                                    contrast(${(data.contrast as number) ?? 105}%) 
                                    saturate(${(data.saturation as number) ?? 95}%)
                                    brightness(${(data.brightness as number) ?? 100}%)
                                    grayscale(${(data.grayscale as number) ?? 0}%)
                                    sepia(${(data.sepia as number) ?? 0}%)
                                    blur(${(data.blur as number) ?? 0}px)
                                    hue-rotate(${(data.hueRotate as number) ?? 0}deg)
                                    invert(${(data.invert as number) ?? 0}%)
                                `
                            }}
                        />

                        {/* Technical Viewport Overlay - Architectural Grid */}
                        <div className="absolute inset-0 border border-zinc-200 dark:border-zinc-800 opacity-0 group-hover/img:opacity-100 transition-all duration-300 pointer-events-none">
                            <div className="absolute top-2 left-2 text-[6px] font-mono tracking-widest uppercase text-zinc-400">
                                FRAME_ID::{id.slice(-4)}
                            </div>
                            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-primary m-1" />
                            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-primary m-1" />
                            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-primary m-1" />
                            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-primary m-1" />
                        </div>

                        {/* Central Action Backdrop */}
                        <div className="absolute inset-0 bg-zinc-900/60 opacity-0 group-hover/img:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                            <div className="bg-white dark:bg-zinc-800 px-3 py-2 border border-zinc-200 dark:border-zinc-700 flex items-center gap-2 transform translate-y-2 group-hover/img:translate-y-0 transition-transform shadow-lg">
                                <Upload size={10} className="text-primary" />
                                <span className="text-[8px] font-bold font-mono tracking-widest text-zinc-900 dark:text-zinc-100 uppercase">UPDATE_SOURCE</span>
                            </div>
                        </div>

                        {/* Technical Metadata Bar - Slimmed and Refined */}
                        <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-zinc-900/80 to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity duration-300">
                            <div className="flex justify-between items-center text-[6px] font-mono text-white/90 tracking-widest uppercase">
                                <div className="flex items-center gap-1.5">
                                    <div className="w-1 h-1 bg-primary" />
                                    <span>ASSET_REF::{(data.width as number) || 0}N{(data.height as number) || 0}</span>
                                </div>
                                <div className="px-1.5 py-0.5 border border-white/20 bg-white/10 backdrop-blur-sm">
                                    IMG_DATA_STREAM
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex flex-col items-center justify-center h-full gap-4 transition-all py-8 px-4">
                        <div className="relative">
                            <div className="w-12 h-12 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center group-hover/img:border-primary transition-all duration-300">
                                <Upload size={16} className="text-zinc-300 dark:text-zinc-600 group-hover/img:text-primary transition-colors" strokeWidth={1} />
                            </div>
                        </div>
                        <div className="space-y-1 text-center">
                            <span className="text-[9px] font-bold font-mono tracking-widest block uppercase text-zinc-500 dark:text-zinc-400 group-hover/img:text-primary transition-all">Capture_Reference</span>
                            <span className="text-[6px] font-mono text-zinc-300 dark:text-zinc-600 block tracking-[0.2em] uppercase">Awaiting Source Signal...</span>
                        </div>
                    </div>
                )}
                <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} />
            </div>
        </NodeContainer>
    );
});
