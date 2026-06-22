import { Navigate } from "react-router-dom";
import { useAuth } from "../context/Authcontext";
import { Loading } from "./Loading";

export const ProtectedRoute = ({ children }: {children: React.ReactNode}) => {
    const {user, loading} = useAuth();
    
    if (loading) return (
        <Loading loading={loading} />
    );

    if (!user) return <Navigate to="/Login" replace />;

    return <>{children}</>
}