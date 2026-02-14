import React, { createContext, useContext, useEffect, useState, ReactNode, useMemo, useCallback } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase, getCurrentUser, signInWithGoogle, signInWithEmail, signOut } from '../services/supabase.service';
import { toast } from 'sonner';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: () => Promise<void>;
  signInEmail: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  isAuthInitialized: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthInitialized, setIsAuthInitialized] = useState(false);

  // Check initial auth state
  useEffect(() => {
    const initAuth = async () => {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
        if (!currentUser) {
          setLoading(false);
          setIsAuthInitialized(true);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        setLoading(false);
        setIsAuthInitialized(true);
      }
    };
    initAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        const currentUser = session?.user ?? null;
        setUser(currentUser);

        if (event === 'SIGNED_OUT' || !currentUser) {
          setLoading(false);
          setIsAuthInitialized(true);
        } else if (event === 'SIGNED_IN' || event === 'INITIAL_SESSION' || event === 'TOKEN_REFRESHED') {
          // Data loading is handled by DataProvider reacting to user changes or explicit calls
          setLoading(false);
          setIsAuthInitialized(true);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const signIn = useCallback(async () => {
    try {
      setLoading(true);
      await signInWithGoogle();
    } catch (error) {
      toast.error('Failed to sign in');
      setLoading(false);
    }
  }, []);

  const signInEmail = useCallback(async (email: string, password: string) => {
    try {
      setLoading(true);
      await signInWithEmail(email, password);
    } catch (error) {
      toast.error('Failed to sign in');
      setLoading(false);
    }
  }, []);

  const signOutUser = useCallback(async () => {
    try {
      await signOut();
      toast.success('Signed out');
    } catch (error) {
      toast.error('Failed to sign out');
    }
  }, []);

  const value: AuthContextType = useMemo(() => ({
    user,
    loading,
    signIn,
    signInEmail,
    signOut: signOutUser,
    isAuthInitialized,
  }), [
    user,
    loading,
    signIn,
    signInEmail,
    signOutUser,
    isAuthInitialized,
  ]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
