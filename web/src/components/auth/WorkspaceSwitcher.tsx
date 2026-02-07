import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button, Card } from '@/components/ui';
import { ChevronDown, Plus, Users, LayoutGrid, Check } from 'lucide-react';
import { organizationService } from '@/services/persistence.service';
import { toast } from 'sonner';

export const WorkspaceSwitcher: React.FC = () => {
    const { workspaces, activeWorkspace, setActiveWorkspace, refreshData } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const [isCreating, setIsCreating] = useState(false);
    const [newOrgName, setNewOrgName] = useState('');

    const handleCreateOrg = async () => {
        if (!newOrgName) return;
        try {
            const slug = newOrgName.toLowerCase().replace(/\s+/g, '-');
            const newOrg = await organizationService.createWorkspace(newOrgName, slug);
            setActiveWorkspace(newOrg);
            setIsCreating(false);
            setNewOrgName('');
            setIsOpen(false);
            toast.success('Workspace created!');
            await refreshData();
        } catch (error: any) {
            console.error('Failed to create workspace:', error);
            const message = error?.message || 'Check your connection or permissions';
            toast.error(`Protocol Failed: ${message}`);
        }
    };

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/10 hover:bg-white/5 transition-all text-[11px] font-black uppercase tracking-widest"
            >
                <LayoutGrid size={14} className="text-primary" />
                <span className="truncate max-w-[120px]">
                    {activeWorkspace ? activeWorkspace.name : 'Personal'}
                </span>
                <ChevronDown size={12} className={`transition-transform duration-200 opacity-40 ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
                <>
                    <div
                        className="fixed inset-0 z-40"
                        onClick={() => { setIsOpen(false); setIsCreating(false); }}
                    />
                    <Card className="absolute top-full left-0 mt-2 w-64 p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                        <div className="text-[9px] font-black text-muted-foreground uppercase px-2 py-1 mb-1 opacity-40 tracking-widest">
                            Workspaces
                        </div>

                        <button
                            onClick={() => { setActiveWorkspace(null); setIsOpen(false); refreshData(); }}
                            className={`w-full flex items-center justify-between px-2 py-1.5 rounded-md text-[11px] transition-all ${!activeWorkspace ? 'bg-primary/10 text-primary font-black' : 'hover:bg-white/5 text-muted-foreground font-bold'
                                }`}
                        >
                            <div className="flex items-center gap-2">
                                <Users size={12} />
                                <span>Personal</span>
                            </div>
                            {!activeWorkspace && <Check size={12} />}
                        </button>

                        {workspaces.map((org) => (
                            <button
                                key={org.id}
                                onClick={() => { setActiveWorkspace(org); setIsOpen(false); refreshData(); }}
                                className={`w-full flex items-center justify-between px-2 py-1.5 rounded-md text-[11px] transition-all ${activeWorkspace?.id === org.id ? 'bg-primary/10 text-primary font-black' : 'hover:bg-white/5 text-muted-foreground font-bold'
                                    }`}
                            >
                                <div className="flex items-center gap-2">
                                    <LayoutGrid size={12} />
                                    <span>{org.name}</span>
                                </div>
                                {activeWorkspace?.id === org.id && <Check size={12} />}
                            </button>
                        ))}

                        <div className="h-px bg-border my-2" />

                        {!isCreating ? (
                            <button
                                onClick={() => setIsCreating(true)}
                                className="w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-[10px] font-black uppercase tracking-widest text-primary hover:bg-primary/5 transition-all"
                            >
                                <Plus size={12} />
                                <span>Create Workspace</span>
                            </button>
                        ) : (
                            <div className="p-2 space-y-2">
                                <input
                                    autoFocus
                                    type="text"
                                    placeholder="Org Name"
                                    className="w-full bg-background border border-border rounded px-2 py-1 text-xs focus:border-primary outline-none"
                                    value={newOrgName}
                                    onChange={(e) => setNewOrgName(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleCreateOrg()}
                                />
                                <div className="flex gap-1">
                                    <Button size="xs" className="flex-1 text-[10px]" onClick={handleCreateOrg}>Create</Button>
                                    <Button size="xs" variant="ghost" className="flex-1 text-[10px]" onClick={() => setIsCreating(false)}>Cancel</Button>
                                </div>
                            </div>
                        )}
                    </Card>
                </>
            )}
        </div>
    );
};
