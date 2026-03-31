import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoutes = () => {
    const { authenticated, loading } = useContext(AuthContext);

    // Evita redirecionar enquanto o app ainda está checando o localStorage
    if (loading) {
        return <div>Carregando...</div>; 
    }

    // Se não estiver autenticado, manda para o login
    // O "Outlet" é onde as rotas filhas serão renderizadas
    return authenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;