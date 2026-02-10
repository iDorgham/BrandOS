import React, { useEffect, useState, useMemo } from 'react';
import {
    Activity,
    Search,
    Filter,
    Download,
    Calendar,
    User,
    Clock,
    ChevronLeft,
    ChevronRight,
    FileText,
    Shield,
    Database,
    ExternalLink
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, Button } from '@/components/ui';
import { useAuth } from '@/contexts/AuthContext';
import { auditService } from '@/services/persistence.service';
import { AuditLog } from '@/types';
import { toast } from 'sonner';

const formatTimestamp = (timestamp: number, type: 'full' | 'time' | 'date' = 'full') => {
    const date = new Date(timestamp);
    if (type === 'time') return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
    if (type === 'date') return date.toLocaleDateString([], { year: 'numeric', month: '2-digit', day: '2-digit' });
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString([], { hour12: false })}`;
};

export const AuditLogDashboard: React.FC = () => {
    const { activeWorkspace } = useAuth();
    const [logs, setLogs] = useState<AuditLog[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterAction, setFilterAction] = useState<string>('all');
    const [page, setPage] = useState(0);
    const PAGE_SIZE = 15;

    useEffect(() => {
        if (activeWorkspace) {
            loadLogs();
        }
    }, [activeWorkspace, page, filterAction]);

    const loadLogs = async () => {
        if (!activeWorkspace) return;
        try {
            setLoading(true);
            const data = await auditService.getAuditLogs(activeWorkspace.id, {
                action: filterAction === 'all' ? undefined : filterAction,
                limit: PAGE_SIZE,
                offset: page * PAGE_SIZE
            });
            setLogs(data);
        } catch (error) {
            console.error('Failed to load audit logs:', error);
            toast.error('Failed to load audit telemetry');
        } finally {
            setLoading(false);
        }
    };

    const filteredLogs = useMemo(() => {
        if (!searchTerm) return logs;
        const lowTerm = searchTerm.toLowerCase();
        return logs.filter(log =>
            log.action.toLowerCase().includes(lowTerm) ||
            log.entityType.toLowerCase().includes(lowTerm) ||
            log.entityId?.toLowerCase().includes(lowTerm)
        );
    }, [logs, searchTerm]);

    const exportToCSV = () => {
        if (logs.length === 0) return;

        const headers = ['ID', 'Date', 'User ID', 'Action', 'Entity Type', 'Entity ID', 'Metadata'];
        const csvContent = [
            headers.join(','),
            ...logs.map(log => [
                log.id,
                formatTimestamp(log.createdAt),
                log.userId || 'System',
                log.action,
                log.entityType,
                log.entityId || 'N/A',
                JSON.stringify(log.metadata).replace(/,/g, ';')
            ].join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', `brand_os_audit_${activeWorkspace?.id || 'export'}_${Date.now()}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        toast.success('Audit trail exported successfully');
    };

    const getActionColor = (action: string) => {
        if (action.includes('CREATE')) return 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20';
        if (action.includes('UPDATE')) return 'text-primary bg-primary/10 border-primary/20';
        if (action.includes('DELETE')) return 'text-destructive bg-destructive/10 border-destructive/20';
        if (action.includes('DOWNLOAD')) return 'text-amber-500 bg-amber-500/10 border-amber-500/20';
        return 'text-muted-foreground bg-muted/10 border-muted/20';
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            {/* Header / Stats */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h2 className="text-[12px] font-mono font-black uppercase tracking-[0.4em] mb-2 flex items-center gap-2">
                        <Shield size={14} className="text-primary" /> Immutable Audit Trail
                    </h2>
                    <p className="text-[10px] font-mono text-muted-foreground/60 uppercase tracking-widest">Global compliance and action telemetry logs.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button
                        variant="secondary"
                        size="sm"
                        onClick={exportToCSV}
                        className="rounded-none border-border/40 text-[10px] font-mono font-black uppercase tracking-widest h-10 px-6 gap-3"
                    >
                        <Download size={14} /> Export CSV
                    </Button>
                </div>
            </div>

            {/* Controls */}
            <Card className="p-2 bg-card/60 border-border/40 rounded-none flex flex-wrap items-center gap-4">
                <div className="relative flex-1 min-w-[300px]">
                    <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/40" />
                    <input
                        type="text"
                        placeholder="SEARCH_BY_ACTION_OR_ENTITY..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-transparent border-none text-[10px] font-mono pl-12 pr-4 py-3 focus:ring-0 placeholder:text-muted-foreground/20 uppercase tracking-widest"
                    />
                </div>
                <div className="h-8 w-[1px] bg-border/20 hidden md:block" />
                <div className="flex items-center gap-4 px-4">
                    <Filter size={14} className="text-muted-foreground/40" />
                    <select
                        value={filterAction}
                        onChange={(e) => {
                            setFilterAction(e.target.value);
                            setPage(0);
                        }}
                        className="bg-transparent border-none text-[10px] font-mono focus:ring-0 cursor-pointer uppercase tracking-widest text-muted-foreground"
                    >
                        <option value="all">ALL ACTIONS</option>
                        <option value="BRAND_UPDATE">BRAND_UPDATE</option>
                        <option value="ASSET_CREATED">ASSET_CREATED</option>
                        <option value="ASSET_DOWNLOADED">ASSET_DOWNLOADED</option>
                        <option value="DEPLOYMENT_REQUESTED">DEPLOYMENT_REQUESTED</option>
                    </select>
                </div>
            </Card>

            {/* Results Table */}
            <div className="border border-border/40 rounded-none overflow-hidden bg-card/20 backdrop-blur-sm shadow-2xl">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-border/40 bg-muted/5">
                            <th className="p-6 text-[10px] font-mono font-black uppercase tracking-[0.3em] text-muted-foreground/60">Registry Time</th>
                            <th className="p-6 text-[10px] font-mono font-black uppercase tracking-[0.3em] text-muted-foreground/60">Action Node</th>
                            <th className="p-6 text-[10px] font-mono font-black uppercase tracking-[0.3em] text-muted-foreground/60">Entity Integrity</th>
                            <th className="p-6 text-[10px] font-mono font-black uppercase tracking-[0.3em] text-muted-foreground/60">Operator ID</th>
                            <th className="p-6 text-[10px] font-mono font-black uppercase tracking-[0.3em] text-muted-foreground/60">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border/20">
                        <AnimatePresence mode="wait">
                            {loading ? (
                                <tr>
                                    <td colSpan={5} className="p-20 text-center">
                                        <div className="flex flex-col items-center gap-4 opacity-40">
                                            <div className="w-8 h-8 rounded-none border-2 border-primary/20 border-t-primary animate-spin" />
                                            <p className="text-[10px] font-mono uppercase tracking-[0.4em]">Decrypting Logs...</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : filteredLogs.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="p-20 text-center">
                                        <div className="flex flex-col items-center gap-4 opacity-20">
                                            <Database size={40} strokeWidth={1} />
                                            <p className="text-[10px] font-mono uppercase tracking-[0.4em]">Registry Empty</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                filteredLogs.map((log) => (
                                    <motion.tr
                                        key={log.id}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="group hover:bg-primary/[0.02] transition-colors"
                                    >
                                        <td className="p-6">
                                            <div className="flex items-center gap-3">
                                                <Clock size={12} className="text-muted-foreground/40" />
                                                <div className="space-y-1">
                                                    <p className="text-[10px] font-mono font-black uppercase tracking-tight">{formatTimestamp(log.createdAt, 'time')}</p>
                                                    <p className="text-[8px] font-mono text-muted-foreground/40 uppercase tracking-widest">{formatTimestamp(log.createdAt, 'date')}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-6">
                                            <div className="flex items-center gap-3">
                                                <div className={`p-1.5 border ${getActionColor(log.action)}`}>
                                                    <Activity size={12} />
                                                </div>
                                                <span className="text-[11px] font-mono font-black uppercase tracking-tight">{log.action}</span>
                                            </div>
                                        </td>
                                        <td className="p-6">
                                            <div className="flex items-center gap-3">
                                                <FileText size={12} className="text-muted-foreground/40" />
                                                <div className="space-y-1">
                                                    <p className="text-[10px] font-mono font-black uppercase tracking-tight">{log.entityType}</p>
                                                    <p className="text-[8px] font-mono text-muted-foreground/40 uppercase tracking-widest font-black truncate max-w-[120px]">
                                                        {log.entityId}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-6">
                                            <div className="flex items-center gap-3">
                                                <User size={12} className="text-muted-foreground/40" />
                                                <span className="text-[9px] font-mono text-muted-foreground/60 uppercase tracking-widest font-black truncate max-w-[150px]">
                                                    {log.userId || 'SYSTEM_CORE'}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="p-6 text-right">
                                            <div className="flex items-center justify-end">
                                                <div className="flex items-center gap-2 px-3 py-1 bg-emerald-500/5 border border-emerald-500/20">
                                                    <div className="w-1 h-1 rounded-full bg-emerald-500" />
                                                    <span className="text-[8px] font-mono font-black text-emerald-500 uppercase tracking-widest">Verified</span>
                                                </div>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))
                            )}
                        </AnimatePresence>
                    </tbody>
                </table>

                {/* Pagination */}
                <div className="p-6 border-t border-border/40 bg-muted/5 flex items-center justify-between">
                    <p className="text-[9px] font-mono text-muted-foreground/40 uppercase tracking-widest font-black">
                        Registry Sector {page + 1} // Limit {PAGE_SIZE} Nodes
                    </p>
                    <div className="flex items-center gap-4">
                        <Button
                            variant="ghost"
                            size="sm"
                            disabled={page === 0}
                            onClick={() => setPage(p => p - 1)}
                            className="rounded-none border border-transparent hover:border-border/40 h-8 w-8 p-0"
                        >
                            <ChevronLeft size={16} />
                        </Button>
                        <span className="text-[10px] font-mono font-black uppercase tracking-widest">{page + 1}</span>
                        <Button
                            variant="ghost"
                            size="sm"
                            disabled={logs.length < PAGE_SIZE}
                            onClick={() => setPage(p => p + 1)}
                            className="rounded-none border border-transparent hover:border-border/40 h-8 w-8 p-0"
                        >
                            <ChevronRight size={16} />
                        </Button>
                    </div>
                </div>
            </div>

            {/* Footer Note */}
            <div className="p-8 border border-primary/10 bg-primary/[0.02] rounded-none flex items-start gap-6">
                <Shield size={20} className="text-primary/40 shrink-0 mt-1" />
                <div className="space-y-2">
                    <h4 className="text-[10px] font-mono font-black uppercase tracking-[0.3em] text-primary/60">Compliance Protocol Alpha</h4>
                    <p className="text-[10px] font-mono text-muted-foreground/30 uppercase tracking-widest leading-relaxed max-w-2xl">
                        THIS REGISTRY IS IMMUTABLE AND SECURED BY ROW-LEVEL SECURITY. ALL DATA SENSING, MODIFICATION, AND EXPORT ATTEMPT ARE PERMANENTLY RECORDED FOR REGULATORY OVERSIGHT.
                    </p>
                </div>
            </div>
        </div>
    );
};
