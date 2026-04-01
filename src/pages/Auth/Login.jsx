import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import Navbar from '../Characters/Navbar';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/login', {
                email,
                password,
                device_name: 'react_app'
            });

            localStorage.setItem('token', response.data.token);
            alert("Logado com sucesso!");
            navigate('/new');
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