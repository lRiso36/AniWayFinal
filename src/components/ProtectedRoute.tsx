import { Navigate } from "react-router-dom";
import { useAuth } from "../context/Authcontext";

export const ProtectedRoute = ({ children }: {children: React.ReactNode}) => {
    const {user, loading} = useAuth();
    
    if (loading) return (
        <div className="min-h-screen bg-[#0a0a14] flex items-center justify-center">
            <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
        </div>
    );

    if (!user) return <Navigate to="/Login" replace />;

    return <>{children}</>
}