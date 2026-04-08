import { useState, useEffect, useContext } from 'react';
import { useParams, Link, useNavigate } from "react-router-dom";
import api from "../../api/api";
import Navbar from "./Navbar";
import './CharactersShow.css';
import { AuthContext } from "../../context/AuthContext";

function CharactersShow() {
    const { id } = useParams();
    const [character, setCharacter] = useState(null);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem('token');
    const { authenticated, logout } = useContext(AuthContext);
    const [saving, setSaving] = useState(false);
    const navigate = useNavigate()
    

    useEffect(() => {
        const requestAPI = async () => {
            try {
                const response = await api.get(`/characters/${id}`);
                setCharacter(response.data.data || response.data);
            } catch (error) {
                console.error("Erro ao carregar:", error);
            } finally {
                setLoading(false);
            }
        };
        requestAPI();
    }, [id]);

    if (loading) return <><Navbar /><h2 id="loading">Carregando os dados do personagem...</h2></>;
    if (!character) return <><Navbar /><p>Character not found!</p></>;

    const imageUrl = character.image_url?.startsWith('http')
        ? character.image_url
        : `https://res.cloudinary.com/dd7vsxg0m/image/upload/${character.image_url?.trim()}`;

        const handleDelete = async(id) => {
        setSaving(true)
        if(confirm("Tem certeza de deseja excluir o personagem?")){
            try{
                await api.delete(`https://characters-api-laravel.onrender.com/api/characters/${id}`, {
                headers: {
                'Authorization': `Bearer ${token}`, 
                'Accept': 'application/json',
                }
            })
            alert("Personagens excluido com sucesso!")
            navigate("/list")
            } catch (error) {
                console.error("Erro ao deletar personagens:", error);
            } finally {
                setSaving(false)
            }
            
        }
    }

    return (
        <div className="main-bg">
            <Navbar />
            <div className="show-wrapper">
                <div className="character-card-show">
                    
                    <div className="image-section">
                        <img src={imageUrl} alt={character.name} />
                    </div>

                    <div className="info-section">

                        <h1>{character.name}</h1>
                        <div>
                            <h3>{character.franchise}</h3>
                        </div>
                        
                        <div className="description-box">
                          
                            <p>{character.description}</p>
                        </div>
                        {authenticated && (
                            <>
                                <Link to={`/edit/${character.id}`} className="btn-edit">
                                    Editar
                                </Link>
                                <button className="btn-delete" onClick={() => handleDelete(character.id)} disabled={saving}>
                                    {saving ? "Excluindo" : "Excluir"}
                                </button>
                            </>
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
}

export default CharactersShow;