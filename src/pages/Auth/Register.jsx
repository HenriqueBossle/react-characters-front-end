import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Characters/Navbar';
import './Register.css';


function Register() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: '' // O Laravel espera este nome para validar 'confirmed'
    });
    
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        // Validação básica de senha no front antes de enviar
        if (formData.password !== formData.password_confirmation) {
            alert("As senhas não coincidem!");
            return;
        }

        try {
            const response = await axios.post('https://characters-api-laravel.onrender.com/api/register', formData);
            
            // Opcional: Já logar o usuário automaticamente após o registro
            // localStorage.setItem('token', response.data.token);
            
            alert("Conta criada com sucesso! Agora faça login.");
            navigate('/login');
        } catch (error) {
            if (error.response && error.response.status === 422) {
                console.error("Erro de validação:", error.response.data.errors);
                alert("Erro: " + Object.values(error.response.data.errors).flat().join(", "));
            } else {
                console.error("Erro ao registrar:", error);
            }
        }
    };

    return (
        <>
        <Navbar />
        <div className="container">
            <div className="card">
                <h2>Create Account</h2>
                <form onSubmit={handleRegister}>
                    <div className="form-group">
                        <label>Full Name:</label>
                        <input type="text" name="name" required onChange={handleChange} />
                    </div>

                    <div className="form-group">
                        <label>Email:</label>
                        <input type="email" name="email" required onChange={handleChange} />
                    </div>

                    <div className="form-group">
                        <label>Password:</label>
                        <input type="password" name="password" required onChange={handleChange} />
                    </div>

                    <div className="form-group">
                        <label>Confirm Password:</label>
                        <input type="password" name="password_confirmation" required onChange={handleChange} />
                    </div>

                    <button type="submit">Register</button>
                </form>
                <p style={{marginTop: '10px'}}>
                    Already have an account? <span onClick={() => navigate('/login')} style={{color: 'red', cursor: 'pointer'}}>Login here</span>
                </p>
            </div>
        </div>
        </>
    );
}

export default Register;