import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { commentService } from '@/services/persistence.service';
import { Comment } from '@/types';
import { Card, Button } from '@/components/ui';
import { X, Send, MessageSquare } from 'lucide-react';
import { toast } from 'sonner';

interface CommentSidebarProps {
    assetId: string;
    onClose: () => void;
}

export const CommentSidebar: React.FC<CommentSidebarProps> = ({ assetId, onClose }) => {
    const { user } = useAuth();
    const [comments, setComments] = useState<Comment[]>([]);
    const [newComment, setNewComment] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadComments();
    }, [assetId]);

    const loadComments = async () => {
        try {
            setLoading(true);
            const data = await commentService.getComments(assetId);
            setComments(data);
        } catch (error) {
            console.error('Failed to load comments:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newComment.trim()) return;

        try {
            const comment = await commentService.addComment(assetId, newComment);
            setComments([...comments, comment]);
            setNewComment('');
            toast.success('Comment added');
        } catch (error) {
            console.error('Failed to add comment:', error);
            toast.error('Failed to post comment');
        }
    };

    return (
        <div className="fixed inset-y-0 right-0 w-80 bg-card border-l border-border z-50 flex flex-col shadow-2xl animate-in slide-in-from-right duration-300">
            <div className="p-4 border-b border-border flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <MessageSquare size={18} className="text-primary" />
                    <h3 className="font-bold">Discussion</h3>
                </div>
                <button onClick={onClose} className="p-1 hover:bg-accent rounded-md transition-colors">
                    <X size={18} />
                </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {loading ? (
                    <div className="flex justify-center py-8">
                        <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                    </div>
                ) : comments.length === 0 ? (
                    <div className="text-center py-8 opacity-40">
                        <p className="text-xs">No comments yet.</p>
                        <p className="text-[10px]">Start the conversation!</p>
                    </div>
                ) : (
                    comments.map((comment) => (
                        <div key={comment.id} className="space-y-1">
                            <div className="flex items-center justify-between">
                                <span className="text-[10px] font-black uppercase text-primary tracking-widest leading-none">
                                    {comment.profile?.fullName || 'Teammate'}
                                </span>
                                <span className="text-[8px] text-muted-foreground uppercase tracking-tighter">
                                    {new Date(comment.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                            </div>
                            <div className="bg-accent/30 p-2 rounded-lg rounded-tl-none border border-border/50 text-xs">
                                {comment.content}
                            </div>
                        </div>
                    ))
                )}
            </div>

            <div className="p-4 border-t border-border bg-accent/10">
                <form onSubmit={handleSubmit} className="flex items-center gap-2">
                    <input
                        type="text"
                        placeholder="Type a message..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        className="flex-1 bg-background border border-border rounded-lg px-3 py-1.5 text-xs outline-none focus:border-primary transition-all"
                    />
                    <button
                        type="submit"
                        disabled={!newComment.trim()}
                        className="p-1.5 bg-primary text-primary-foreground rounded-lg disabled:opacity-50 hover:bg-primary/90 transition-all shadow-sm"
                    >
                        <Send size={14} />
                    </button>
                </form>
            </div>
        </div>
    );
};
