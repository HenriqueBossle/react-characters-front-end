import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import api from "../../api/api";
import "./Navbar.css";

function Navbar() {
    const { authenticated, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    const handleLogout = async () => {
        try {
            await api.post("/logout");
        } catch (e) {
            console.log("Token expirado ou inválido");
        }
        logout();
        navigate("/login");
    };

    return (
        <div className="nav">

            {/* BOTÃO HAMBURGUER */}
            <div 
                className={`hamburger ${menuOpen ? "active" : ""}`} 
                onClick={() => setMenuOpen(!menuOpen)}
            >
                <span></span>
                <span></span>
                <span></span>
            </div>

            {/* ESQUERDA */}
            <div className={`nav-left ${menuOpen ? "open" : ""}`}>
                <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
                <Link to="/list" onClick={() => setMenuOpen(false)}>Ver todos</Link>
            </div>

            {/* DIREITA */}
            <div className={`nav-right ${menuOpen ? "open" : ""}`}>
                {authenticated && (
                    <>
                        <Link to="/new" onClick={() => setMenuOpen(false)}>Adicionar novo</Link>
                        <button onClick={handleLogout}>Logout</button>
                    </>
                )}

                {!authenticated && (
                    <Link className="btn-login" to="/login" onClick={() => setMenuOpen(false)}>
                        Entrar
                    </Link>
                )}
            </div>

        </div>
    );
}

export default Navbar;