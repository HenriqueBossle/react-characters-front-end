import { useState, useEffect } from 'react'
import axios from 'axios';
import "./CharactersCreate.css";
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';

function CharactersCreate(){
    

    const navigate = useNavigate();
    const [saving, setSaving] = useState(false);


    const [formData, setFormData] = useState({
        name: "",
        franchise: "",
        description: "",
        image_url: ""
    });

    const handleChange = (e) => {
        if (e.target.type === "file") {
            setFormData({
                ...formData,
                image_url: e.target.files[0]
            });
        } else {
            setFormData({
                ...formData,
                [e.target.name]: e.target.value
            });
        }
    };

    const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    const data = new FormData();
    data.append("name", formData.name);
    data.append("franchise", formData.franchise);
    data.append("description", formData.description);
    data.append("image_url", formData.image_url);
    const token = localStorage.getItem('token');

        try{
            await axios.post("https://characters-api-laravel.onrender.com/api/characters", data, {
                headers: {
                'Authorization': `Bearer ${token}`, 
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data'
            }
            });
            alert("Character criado com sucesso!");
            navigate("/list")

        }catch (error) {
            console.error("Erro ao criar personagens:", error);
        } finally {
            setSaving(false)
        }
    
    }
    return(
        <>
        <Navbar/>
        <div className="container">
        <div className="card">
            <h2>Adicionar Personagem</h2>

            <form onSubmit={handleSubmit}>

                <div className="form-group">
                    <label>Nome:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label>Franquia:</label>
                    <input
                        type="text"
                        name="franchise"
                        value={formData.franchise}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label>Descrição:</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label>Imagem:</label>
                    <input
                        type="file"
                        name="image_url"
                        onChange={handleChange}
                    />
                </div>

            <button type="submit" disabled={saving}>{saving ? "Adicionando o personagem" : "Adicionar"}</button>
            </form>
        </div>
    </div>
        </>
    )    
}

export default CharactersCreate