import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import api from "../../api/api";
import "./Navbar.css";

function Navbar() {
    const { authenticated, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await api.post("/logout");
        } catch (e) {
            console.log("Token expirado ou inválido");
        }
        logout(); // Limpa o estado global e o localStorage
        navigate("/login");
    };

    return (
        <div className="nav">
    <div className="nav-left">
        <Link to="/">Home</Link>
        <Link to="/list">Ver todos</Link>
    </div>

    <div className="nav-right">
        {authenticated && (
            <>
                <Link to="/new">Adicionar novo</Link>
                <button onClick={handleLogout}>Logout</button>
            </>
        )}

        {!authenticated && (
            <>
                <Link className="btn-login" to="/login">Entrar</Link>
                <Link className="btn-register" to="/register">Criar conta</Link>
            </>
        )}
            </div>
        </div>
    );
}

export default Navbar;