import { createContext, useContext, useEffect, useState } from "react";
import type { Session, User } from "@supabase/supabase-js";
import supabase from "../supabase";

type AuthContextType = {
    user: User | null;
    session: Session | null;
    loading: boolean;
    username: string | null;
    avatar: string | null;
    logout: () => Promise<void>;
    refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    session: null,
    loading: true,
    username: null,
    avatar: null,
    logout: async () => { },
    refreshProfile: async () => { },
})

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null)
    const [session, setSession] = useState<Session | null>(null);
    const [loading, setLoading] = useState(true);
    const [username, setUsername] = useState<string | null>(null);
    const [avatar, setAvatar] = useState<string | null>(null);

    // handle auth state changes
    useEffect(() => {
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            setUser(session?.user ?? null);
            if (!session) setLoading(false);
        });

        return () => subscription.unsubscribe();
    }, []);

    // fetch username and avatar whenever user changes
    useEffect(() => {
        const fetchUserData = async () => {
            if (!user) {
                setUsername(null);
                setAvatar(null);
                return;
            }

            const { data: userData, error } = await supabase
                .from('users')
                .select('username, avatar')
                .eq('id', user.id)
                .maybeSingle();

            if (!userData) {
                // profile not inserted yet, retry once after delay
                setTimeout(async () => {
                    const { data: retryData } = await supabase
                        .from('users')
                        .select('username, avatar')
                        .eq('id', user.id)
                        .maybeSingle();
                    setUsername(retryData?.username ?? null);
                    setAvatar(retryData?.avatar ?? null);
                    setLoading(false);
                }, 1500);
                return;
            }

            if (error) console.error(error);

            setUsername(userData?.username ?? null);
            setAvatar(userData?.avatar ?? null);
            setLoading(false);
        }

        fetchUserData();
    }, [user]);

    const logout = async () => {
        await supabase.auth.signOut();
    }

    const refreshProfile = async () => {
        if (!user) return;

        const { data: userData } = await supabase
            .from('users')
            .select('username, avatar')
            .eq('id', user.id)
            .maybeSingle()

        setUsername(userData?.username ?? null);
        setAvatar(userData?.avatar ?? null);
    }

    return (
        <AuthContext.Provider value={{ user, session, loading, username, avatar, logout, refreshProfile }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)