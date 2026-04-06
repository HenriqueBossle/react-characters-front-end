import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoutes = () => {
    const { authenticated, loading } = useContext(AuthContext);

    if (loading) {
        return <div>Carregando...</div>; 
    }

    
    return authenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;