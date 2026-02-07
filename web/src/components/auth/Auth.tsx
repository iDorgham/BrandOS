import React from 'react';
import { User, Loader2, Shield, LogIn, LogOut, RotateCcw, Database } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Button, Card } from '@/components/ui';

export const AuthGuard: React.FC = () => {
  const { user, loading, signIn, signInEmail, signOut, migrateData } = useAuth();
  const [showEmailLogin, setShowEmailLogin] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleEmailLogin = (e: React.FormEvent) => {
    e.preventDefault();
    signInEmail(email, password);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-12 text-center">
        <Loader2 className="animate-spin mb-6 text-primary" size={48} />
        <h2 className="text-xl font-medium mb-1 tracking-tight">Initializing Protocol</h2>
        <p className="text-xs text-muted-foreground uppercase tracking-widest opacity-60">System Handshake in Progress</p>
      </div>
    );
  }

  if (user) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-12 text-center">
        <div className="max-w-md w-full p-8 border border-border bg-card shadow-sm space-y-8">
          <div className="flex items-center justify-center w-16 h-16 bg-primary text-primary-foreground mx-auto">
            <User size={32} />
          </div>

          <div className="space-y-1">
            <h2 className="text-2xl font-light tracking-tight">Welcome Back</h2>
            <p className="text-sm text-muted-foreground font-mono">{user.email}</p>
          </div>

          <div className="space-y-3">
            <Button onClick={signOut} variant="secondary" className="w-full gap-2 rounded-none h-12 uppercase tracking-wide text-xs font-bold border-border hover:bg-muted">
              <LogOut size={16} /> Termination Sequence
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-md w-full space-y-12">
        <div className="flex flex-col items-center gap-6">
          <div className="w-16 h-16 bg-primary text-primary-foreground flex items-center justify-center">
            <Shield size={32} strokeWidth={1} />
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl font-light tracking-tight text-foreground">Brand OS <span className="font-bold">Enterprise</span></h1>
            <p className="text-sm text-muted-foreground max-w-xs mx-auto leading-relaxed">
              Secure identity orchestration platform. <br />Authorized personnel only.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {!showEmailLogin ? (
            <div className="space-y-4">
              <Button
                onClick={signIn}
                size="lg"
                className="w-full rounded-none h-14 gap-3 bg-primary text-primary-foreground hover:bg-primary/90 transition-all font-bold uppercase tracking-wide text-xs shadow-none border border-transparent"
              >
                <LogIn size={20} />
                Continue with Google
              </Button>
              <button
                onClick={() => setShowEmailLogin(true)}
                className="text-xs text-muted-foreground hover:text-primary transition-colors hover:underline underline-offset-4 font-medium"
              >
                Authenticate via Email credentials
              </button>
            </div>
          ) : (
            <form onSubmit={handleEmailLogin} className="space-y-6 text-left animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="grid gap-6">
                <div className="space-y-1 group">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground group-focus-within:text-primary transition-colors">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full bg-muted/30 border-b border-border px-4 py-4 text-sm focus:border-primary focus:bg-muted/50 outline-none transition-all placeholder:text-muted-foreground/30 font-medium"
                    placeholder="user@enterprise.com"
                  />
                </div>
                <div className="space-y-1 group">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground group-focus-within:text-primary transition-colors">Security Key</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full bg-muted/30 border-b border-border px-4 py-4 text-sm focus:border-primary focus:bg-muted/50 outline-none transition-all placeholder:text-muted-foreground/30 font-medium"
                    placeholder="••••••••••••"
                  />
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <Button type="submit" size="lg" className="w-full rounded-none h-14 gap-3 font-bold uppercase tracking-wide text-xs">
                  <LogIn size={20} /> Authenticate
                </Button>
                <button
                  type="button"
                  onClick={() => setShowEmailLogin(false)}
                  className="w-full text-center text-xs text-muted-foreground hover:text-primary transition-colors hover:underline underline-offset-4"
                >
                  Return to SSO Provider
                </button>
              </div>
            </form>
          )}

          <div className="border border-border p-4 bg-muted/5 flex gap-4 items-start">
            <Database className="text-primary mt-0.5 shrink-0" size={16} />
            <div className="space-y-1 text-left">
              <p className="text-xs font-bold text-foreground">Local Data Persistence</p>
              <p className="text-[10px] text-muted-foreground leading-relaxed">
                Existing workspace data transmits securely upon authentication.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const AuthStatus: React.FC = () => {
  const { user, loading, signIn, signOut, migrateData } = useAuth();

  if (loading) return null;

  if (!user) {
    return (
      <Button onClick={signIn} variant="outline" size="sm" className="gap-2">
        <LogIn size={14} /> Sign In
      </Button>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <div className="text-xs text-muted-foreground truncate max-w-32">
        {user.email}
      </div>
      <Button
        onClick={migrateData}
        variant="ghost"
        size="sm"
        className="gap-1 text-xs"
        title="Sync local data"
      >
        <RotateCcw size={12} />
      </Button>
      <Button
        onClick={signOut}
        variant="ghost"
        size="sm"
        className="gap-1 text-xs"
        title="Sign out"
      >
        <LogOut size={12} />
      </Button>
    </div>
  );
};
