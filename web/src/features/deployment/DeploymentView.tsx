import React, { useState, useEffect } from 'react';
import { ViewHeader } from '@/components/layout/ViewHeader';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Rocket,
  Instagram,
  Linkedin,
  Globe,
  Send,
  CheckCircle2,
  Clock,
  AlertCircle,
  Eye,
  Download,
  Calendar,
  User,
  Mail,
  Plus,
  Figma,
  Slack,
  Zap,
  ExternalLink,
  ShieldCheck,
  Smartphone,
  Layout,
  Layers,
  Sparkles,
  Command,
  ArrowRight,
  ChevronRight
} from 'lucide-react';
import { Button, Card } from '@/components/ui';
import { GeneratedAsset, BrandProfile, DeploymentRequest, DeploymentStatus } from '@/types';
import { generateId, downloadFile, copyToClipboard } from '@/utils';
import { toast } from 'sonner';
import { fadeIn, slideUp, staggerContainer, scaleIn, cardHover } from '@/utils/animations';
import { deploymentService, auditService } from '@/services/persistence.service';

interface DeploymentViewProps {
  brand: BrandProfile;
  assets: GeneratedAsset[];
}

interface DeploymentTarget {
  id: string;
  name: string;
  icon: React.ElementType;
  description: string;
  status: 'available' | 'configured' | 'connected';
  requiresApproval: boolean;
  type: 'social' | 'enterprise' | 'web';
  color: string;
}

// Use global types from @/types

export const DeploymentView = React.memo<DeploymentViewProps>(({ brand, assets }) => {
  const [selectedAssets, setSelectedAssets] = useState<string[]>([]);
  const [deploymentRequests, setDeploymentRequests] = useState<DeploymentRequest[]>([]);
  const [showNewRequest, setShowNewRequest] = useState(false);
  const [selectedTarget, setSelectedTarget] = useState<string>('');
  const [selectedAsset, setSelectedAsset] = useState<string>('');
  const [notes, setNotes] = useState('');
  const [loadingRequests, setLoadingRequests] = useState(true);

  // Load initial deployment requests
  useEffect(() => {
    const loadRequests = async () => {
      try {
        const requests = await deploymentService.getDeploymentRequests(brand.workspaceId);
        setDeploymentRequests(requests);
      } catch (error) {
        console.error('Failed to load deployment requests:', error);
      } finally {
        setLoadingRequests(false);
      }
    };
    loadRequests();
  }, [brand.workspaceId]);

  const deploymentTargets: DeploymentTarget[] = React.useMemo(() => [
    // ... (rest of the file remains similar but using service calls)
    {
      id: 'figma',
      name: 'Figma Sync',
      icon: Figma,
      description: 'Push palettes & assets to Figma Library',
      status: 'connected',
      requiresApproval: false,
      type: 'enterprise',
      color: 'text-purple-500'
    },
    {
      id: 'adobe',
      name: 'Adobe Creative Cloud',
      icon: Layers,
      description: 'Direct push to Photoshop/Illustrator',
      status: 'configured',
      requiresApproval: false,
      type: 'enterprise',
      color: 'text-rose-500'
    },
    {
      id: 'slack',
      name: 'Slack Alerts',
      icon: Slack,
      description: 'Auto-notify team on asset readiness',
      status: 'connected',
      requiresApproval: true,
      type: 'enterprise',
      color: 'text-emerald-500'
    },
    {
      id: 'zapier',
      name: 'Zapier / Make',
      icon: Zap,
      description: 'Trigger 1000+ custom automations',
      status: 'available',
      requiresApproval: true,
      type: 'enterprise',
      color: 'text-[#ff4a00]'
    },
    {
      id: 'instagram',
      name: 'Instagram',
      icon: Instagram,
      description: 'Publish to social feed or stories',
      status: 'configured',
      requiresApproval: true,
      type: 'social',
      color: 'text-pink-500'
    },
    {
      id: 'web',
      name: 'Website CMS',
      icon: Globe,
      description: 'Update live production assets',
      status: 'connected',
      requiresApproval: true,
      type: 'web',
      color: 'text-blue-500'
    }
  ], []);

  const handleAssetSelection = (assetId: string) => {
    setSelectedAssets(prev =>
      prev.includes(assetId)
        ? prev.filter(id => id !== assetId)
        : [...prev, assetId]
    );
  };

  const handleApprove = async (requestId: string) => {
    try {
      const updated = await deploymentService.updateDeploymentStatus(requestId, 'approved');
      setDeploymentRequests(prev => prev.map(req => req.id === requestId ? updated : req));
      toast.success('Request authorized for deployment');
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const handleReject = async (requestId: string) => {
    try {
      const updated = await deploymentService.updateDeploymentStatus(requestId, 'rejected');
      setDeploymentRequests(prev => prev.map(req => req.id === requestId ? updated : req));
      toast.error('Deployment request denied');
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const handleDeploy = async (requestId: string) => {
    try {
      const updated = await deploymentService.updateDeploymentStatus(requestId, 'deployed');
      setDeploymentRequests(prev => prev.map(req => req.id === requestId ? updated : req));
      toast.success('Payload successfully synchronized to target');
    } catch (error) {
      toast.error('Synchronisation failed');
    }
  };

  const createDeploymentRequest = async () => {
    if (!selectedAsset || !selectedTarget) {
      toast.error('Specify payload and destination');
      return;
    }

    try {
      const newRequest = await deploymentService.createDeploymentRequest({
        assetId: selectedAsset,
        targetId: selectedTarget,
        notes,
      }, brand.workspaceId);

      setDeploymentRequests(prev => [newRequest, ...prev]);
      setShowNewRequest(false);
      setSelectedAsset('');
      setSelectedTarget('');
      setNotes('');
      toast.success('Synchronization initialized');
    } catch (error) {
      toast.error('Failed to initialize sync');
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
      className="space-y-0 w-full relative antialiased"
    >
      <ViewHeader
        icon={Rocket}
        title={brand.name}
        subtitle="Vault"
        badge="Deployment Registry"
        rightContent={
          <>
            <div className="text-right hidden md:block">
              <p className="text-[8px] font-mono uppercase tracking-[0.4em] opacity-40 mb-1">Current Protocol</p>
              <p className="text-xs font-mono font-black tracking-widest text-primary">v9.2.0-STABLE</p>
            </div>
            <div className="w-[1px] h-10 bg-border/20 hidden md:block" />
            <div className="text-right">
              <p className="text-[8px] font-mono uppercase tracking-[0.4em] opacity-40 mb-1">Platform Status</p>
              <div className="flex items-center justify-end gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <p className="text-xs font-mono font-black tracking-widest text-emerald-500">ALL SYSTEMS ACTIVE</p>
              </div>
            </div>
          </>
        }
      />

      <div className="w-full px-8 py-12 space-y-12 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Asset Vault Selection */}
          <motion.div variants={slideUp} className="lg:col-span-4 space-y-6">
            <Card className="p-0 bg-card/40 border-border/60 flex flex-col h-[calc(100vh-350px)] rounded-none overflow-hidden backdrop-blur-sm">
              <div className="p-5 border-b border-border/40 flex items-center justify-between bg-muted/5">
                <h2 className="text-[10px] font-mono font-black text-foreground/80 flex items-center gap-3 uppercase tracking-[0.2em]">
                  <Layers size={14} className="text-primary" /> Payload Selection
                </h2>
                <span className="text-[9px] font-mono font-black text-primary px-2.5 py-1 bg-primary/10 border border-primary/20 uppercase tracking-wider">
                  {selectedAssets.length} Staged
                </span>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar">
                {assets.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center opacity-40 text-center p-8 border-2 border-dashed border-border rounded-sm">
                    <Eye size={32} className="mb-3 text-muted-foreground" />
                    <p className="text-xs font-semibold text-muted-foreground">Vault Empty</p>
                  </div>
                ) : assets.map(asset => (
                  <motion.div
                    key={asset.id}
                    onClick={() => handleAssetSelection(asset.id)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`group relative p-3 rounded-none border transition-all cursor-pointer ${selectedAssets.includes(asset.id)
                      ? 'bg-primary/10 border-primary shadow-[inset_0_0_10px_rgba(var(--primary-rgb),0.2)]'
                      : 'bg-card border-border/40 hover:border-primary/40 hover:bg-primary/[0.02]'
                      }`}
                  >
                    <div className="flex gap-4 items-center">
                      <div className="relative w-14 h-14 shrink-0 rounded-none overflow-hidden border border-border/40 bg-muted/20">
                        <img src={asset.url} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="Asset" />
                        {selectedAssets.includes(asset.id) && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="absolute inset-0 bg-primary/20 flex items-center justify-center backdrop-blur-[1px]"
                          >
                            <CheckCircle2 size={20} className="text-white drop-shadow-lg" />
                          </motion.div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0 space-y-1.5">
                        <div className="flex justify-between items-start">
                          <p className="text-[11px] font-mono font-black text-foreground/80 truncate uppercase tracking-wider">
                            {asset.subject || 'Payload Alpha'}
                          </p>
                          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={(e) => { e.stopPropagation(); copyToClipboard(asset.url); toast.success('URL replicated to clipboard'); }}
                              className="p-1 hover:text-primary transition-colors"
                              title="Copy URL"
                            >
                              <ExternalLink size={12} />
                            </button>
                            <button
                              onClick={(e) => { e.stopPropagation(); downloadFile(asset.url, `brand-asset-${asset.id}.png`); toast.success('Payload downloaded'); }}
                              className="p-1 hover:text-primary transition-colors"
                              title="Download Asset"
                            >
                              <Download size={12} />
                            </button>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className={`text-[8px] font-mono font-black px-2 py-0.5 border ${asset.complianceScore >= 90 ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' :
                            'bg-amber-500/10 text-amber-500 border-amber-500/20'
                            }`}>
                            {asset.complianceScore}% DNA
                          </span>
                          <span className="text-[8px] font-mono font-black text-muted-foreground/40 uppercase tracking-[0.2em]">
                            {asset.assetType}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Right Column: Integration Grid */}
          <div className="lg:col-span-8 space-y-8">
            <motion.div variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {deploymentTargets.map(target => (
                <motion.div
                  key={target.id}
                  variants={slideUp}
                  whileHover="hover"
                >
                  <Card
                    className={`h-full bg-card/40 border transition-all relative overflow-hidden group rounded-none hover:shadow-2xl ${target.status === 'connected' ? 'border-primary/40 bg-primary/[0.03]' :
                      target.status === 'configured' ? 'border-border/60' : 'border-border/20 opacity-60'
                      }`}
                  >
                    {/* Technical Background Details */}
                    <div className="absolute top-0 right-0 p-4 opacity-[0.03] pointer-events-none group-hover:opacity-[0.08] transition-opacity">
                      <target.icon size={80} strokeWidth={0.5} />
                    </div>

                    <div className="p-6 flex flex-col h-full relative z-10">
                      <div className="flex items-start justify-between mb-8">
                        <div className={`p-3 rounded-none bg-card border border-border/40 group-hover:border-primary/40 transition-colors shadow-sm ${target.color}`}>
                          <target.icon size={22} strokeWidth={1.5} />
                        </div>
                        <span className={`text-[8px] font-mono font-black uppercase tracking-[0.2em] px-2.5 py-1 border ${target.status === 'connected' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' :
                          target.status === 'configured' ? 'bg-blue-500/10 text-blue-500 border-blue-500/20' :
                            'bg-muted/10 text-muted-foreground border-transparent'
                          }`}>
                          {target.status}
                        </span>
                      </div>

                      <div className="space-y-2 flex-1">
                        <h3 className="text-sm font-mono font-black uppercase tracking-widest text-foreground group-hover:text-primary transition-colors">
                          {target.name}
                        </h3>
                        <p className="text-[11px] font-medium text-muted-foreground leading-relaxed">
                          {target.description}
                        </p>
                      </div>

                      <div className="mt-8 pt-6 border-t border-border/10 space-y-4">
                        {/* Technical HUD Metadata */}
                        <div className="flex justify-between items-center text-[7px] font-mono font-black uppercase tracking-[0.3em] opacity-40">
                          <span>Platform ID: 0x{target.id.toUpperCase()}</span>
                          <span>Latency: 24ms</span>
                        </div>

                        {target.status !== 'available' && (
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm" className="h-8 text-[9px] font-mono font-black uppercase tracking-widest border border-border/40 group-hover:border-primary/40 hover:bg-primary hover:text-white flex-1 rounded-none transition-all">
                              Configure
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => { setSelectedTarget(target.id); setShowNewRequest(true); }} className="h-8 text-[9px] font-mono font-black uppercase tracking-widest border border-primary/40 bg-primary/5 hover:bg-primary hover:text-white flex-1 rounded-none transition-all">
                              Initialize
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>

            {/* Approval Queue */}
            <motion.div variants={slideUp}>
              <Card className="rounded-none border-border/60 bg-card/40 backdrop-blur-sm overflow-hidden shadow-xl">
                <div className="p-6 border-b border-border/40 flex items-center justify-between bg-muted/5">
                  <h2 className="text-[10px] font-mono font-black text-foreground/80 flex items-center gap-3 uppercase tracking-[0.2em]">
                    <ShieldCheck size={14} className="text-primary" /> Authorization Queue
                  </h2>
                  <span className="text-[9px] font-mono font-black text-muted-foreground bg-muted/20 px-2.5 py-1 border border-border/20 uppercase">
                    {deploymentRequests.length} Active Payloads
                  </span>
                </div>

                <div className="divide-y divide-border">
                  {deploymentRequests.length === 0 ? (
                    <div className="py-16 text-center opacity-40">
                      <Command size={40} className="mx-auto mb-3 text-muted-foreground" />
                      <p className="text-xs font-medium text-muted-foreground">No synchronization tasks pending</p>
                    </div>
                  ) : (
                    deploymentRequests.map(request => {
                      const asset = assets.find(a => a.id === request.assetId);
                      const target = deploymentTargets.find(t => t.id === request.targetId);

                      return (
                        <motion.div
                          key={request.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="p-4 hover:bg-muted/5 transition-colors group"
                        >
                          <div className="flex flex-col md:flex-row items-center gap-4">
                            <div className="relative w-12 h-12 shrink-0">
                              <img src={asset?.url} className="w-full h-full object-cover rounded-sm border border-border" alt="Payload" />
                              <div className="absolute -bottom-1 -right-1 p-0.5 bg-card rounded-sm border border-border shadow-sm">
                                {target && <target.icon size={10} className={target.color} />}
                              </div>
                            </div>

                            <div className="flex-1 min-w-0 space-y-2">
                              <div className="flex items-center gap-3">
                                <span className={`text-[8px] font-mono font-black uppercase px-2 py-0.5 border ${request.status === 'pending' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' :
                                  request.status === 'approved' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' :
                                    request.status === 'deployed' ? 'bg-blue-500/10 text-blue-500 border-blue-500/20' :
                                      'bg-destructive/10 text-destructive border-destructive/20'
                                  }`}>
                                  {request.status}
                                </span>
                                <h3 className="text-xs font-mono font-black uppercase tracking-widest text-foreground truncate">
                                  Sync to {target?.name}
                                </h3>
                              </div>
                              <div className="flex flex-wrap gap-6 text-[9px] font-mono font-bold text-muted-foreground/60 uppercase tracking-widest">
                                <span className="flex items-center gap-2 border-r border-border/20 pr-4"><User size={10} className="text-primary/40" /> {request.requestedBy}</span>
                                <span className="flex items-center gap-2"><Calendar size={10} className="text-primary/40" /> {new Date(request.requestedAt).toLocaleDateString()}</span>
                              </div>
                            </div>

                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              {request.status === 'pending' && (
                                <>
                                  <Button
                                    size="sm"
                                    onClick={() => handleApprove(request.id)}
                                    className="rounded-none h-9 px-5 text-[9px] font-mono font-black uppercase tracking-widest hover:scale-105 transition-transform"
                                  >
                                    Authorize
                                  </Button>
                                  <Button
                                    variant="secondary"
                                    size="sm"
                                    onClick={() => handleReject(request.id)}
                                    className="rounded-none h-9 px-5 text-[9px] font-mono font-black uppercase tracking-widest border border-border/40 hover:bg-destructive/10 hover:text-destructive hover:border-destructive/20 hover:scale-105 transition-transform"
                                  >
                                    Deny
                                  </Button>
                                </>
                              )}
                              {(request.status === 'approved' || request.status === 'deployed') && (
                                <div className="flex gap-2">
                                  <Button
                                    size="sm"
                                    onClick={async () => {
                                      const asset = assets.find(a => a.id === request.assetId);
                                      if (asset) {
                                        await copyToClipboard(asset.url);
                                        await auditService.logAction({
                                          workspaceId: brand.workspaceId,
                                          action: 'ASSET_COPIED',
                                          entityType: 'asset',
                                          entityId: asset.id,
                                          metadata: { requestId: request.id }
                                        });
                                        toast.success('Asset URL replicated');
                                      }
                                    }}
                                    className="h-9 px-3 border border-border/40 text-[9px] font-mono font-black tracking-widest uppercase hover:bg-primary hover:text-white transition-all rounded-none"
                                  >
                                    Copy
                                  </Button>
                                  <Button
                                    size="sm"
                                    onClick={async () => {
                                      const asset = assets.find(a => a.id === request.assetId);
                                      if (asset) {
                                        downloadFile(asset.url, `deployment-${request.id}.png`);
                                        await auditService.logAction({
                                          workspaceId: brand.workspaceId,
                                          action: 'ASSET_DOWNLOADED',
                                          entityType: 'asset',
                                          entityId: asset.id,
                                          metadata: { requestId: request.id }
                                        });
                                        toast.success('Asset payload downloaded');
                                      }
                                    }}
                                    className="h-9 px-3 border border-border/40 text-[9px] font-mono font-black tracking-widest uppercase hover:bg-primary hover:text-white transition-all rounded-none"
                                  >
                                    DL
                                  </Button>
                                </div>
                              )}
                              {request.status === 'approved' && (
                                <Button
                                  size="sm"
                                  onClick={() => handleDeploy(request.id)}
                                  className="rounded-none h-9 px-5 text-[9px] font-mono font-black uppercase tracking-widest bg-blue-600 hover:bg-blue-500 text-white shadow-xl hover:scale-105 transition-transform"
                                >
                                  Commit to Production <ArrowRight size={12} className="ml-2" />
                                </Button>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      );
                    })
                  )}
                </div>
              </Card>
            </motion.div>
          </div>
        </div>

        {/* Sync Initialization Modal */}
        <AnimatePresence>
          {showNewRequest && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-background/80 backdrop-blur-sm">
              <motion.div
                variants={scaleIn}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="w-full max-w-lg"
              >
                <Card className="p-0 shadow-2xl bg-card border border-primary/20 rounded-none overflow-hidden backdrop-blur-xl">
                  <div className="p-6 border-b border-border/40 bg-muted/5 flex items-center justify-between relative overflow-hidden">
                    {/* Modal Scan Line */}
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-primary/20 animate-scan pointer-events-none" />

                    <h2 className="text-xl font-display font-black tracking-tighter uppercase">Initialize Sync</h2>
                    <Button variant="ghost" size="icon" onClick={() => setShowNewRequest(false)} className="rounded-none w-10 h-10 hover:rotate-90 transition-transform">
                      <Plus size={20} className="rotate-45" />
                    </Button>
                  </div>

                  <div className="p-10 space-y-8">
                    <div className="space-y-3">
                      <label className="text-[10px] font-mono font-black text-primary/60 uppercase tracking-[0.3em]">Select Payload</label>
                      <div className="relative">
                        <select
                          value={selectedAsset}
                          onChange={(e) => setSelectedAsset(e.target.value)}
                          className="w-full h-12 px-4 rounded-none bg-card border border-border/60 text-[11px] font-mono font-black uppercase tracking-widest focus:border-primary transition-all outline-none appearance-none cursor-pointer"
                        >
                          <option value="" className="bg-card">Select from Vault...</option>
                          {assets.filter(asset => selectedAssets.includes(asset.id)).map(asset => (
                            <option key={asset.id} value={asset.id} className="bg-card">
                              {asset.subject || 'ID: ' + asset.id.slice(0, 8)}
                            </option>
                          ))}
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none opacity-40">
                          <ChevronRight size={14} className="rotate-90" />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="text-[10px] font-mono font-black text-primary/60 uppercase tracking-[0.3em]">Destination Platform</label>
                      <div className="grid grid-cols-3 gap-4">
                        {deploymentTargets.map(t => (
                          <motion.button
                            key={t.id}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setSelectedTarget(t.id)}
                            className={`p-4 rounded-none border flex flex-col items-center gap-3 transition-all ${selectedTarget === t.id
                              ? 'bg-primary/10 border-primary text-primary shadow-[inset_0_0_10px_rgba(var(--primary-rgb),0.2)]'
                              : 'bg-card border-border/60 text-muted-foreground/60 hover:border-primary/40 hover:bg-primary/[0.02]'
                              }`}
                          >
                            <t.icon size={22} strokeWidth={1.5} />
                            <span className="text-[9px] font-mono font-black uppercase tracking-widest">{t.name.split(' ')[0]}</span>
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="text-[10px] font-mono font-black text-primary/60 uppercase tracking-[0.3em]">Transfer Protocol Notes</label>
                      <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="ENTER DEPLOYMENT PROTOCOL NOTES..."
                        className="w-full h-24 p-4 rounded-none bg-card border border-border/60 text-[11px] font-mono font-black uppercase tracking-widest focus:border-primary transition-all outline-none resize-none placeholder:opacity-20"
                      />
                    </div>

                    <Button
                      onClick={createDeploymentRequest}
                      className="w-full rounded-none h-14 text-xs font-mono font-black uppercase tracking-[0.3em] shadow-2xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                      disabled={!selectedAsset || !selectedTarget}
                    >
                      Authorize Transfer
                    </Button>
                  </div>
                </Card>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
});

export default DeploymentView;
