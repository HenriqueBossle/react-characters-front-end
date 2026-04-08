import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import Navbar from '../Characters/Navbar';
import { AuthContext } from '../../context/AuthContext';
import api from '../../api/api';


function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);
    

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('https://characters-api-laravel.onrender.com/api/login', {
                email,
                password,
                device_name: 'react_app'
            });

            login(response.data.token);
            alert("Logado com sucesso!");
            navigate('/list');
        } catch (error) {
            alert("Erro ao logar. Verifique suas credenciais.");
        }
    };

    return (
        <>
        <Navbar />
        
        <div className="login-container">
            <form className="login-card" onSubmit={handleLogin}>
                <h2 className="login-title">Login</h2>
                <input type="email" onChange={e => setEmail(e.target.value)} placeholder="Email" />
                <input type="password" onChange={e => setPassword(e.target.value)} placeholder="Senha" />
                <button type="submit">Entrar</button>
            </form>
        </div>
        </>
    );
}

export default Login;