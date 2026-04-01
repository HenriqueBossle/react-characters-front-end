import { useState, useEffect } from 'react'
import api from '../../api/api'
import CharactersEdit from './CharactersEdit'
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import './CharactersList.css'
import Navbar from './Navbar';

function CharactersList(){
    const [characters, setCharacters] = useState([])
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    

    useEffect(() => {
        const requestAPI = async () => {
        try{
            const response = await api.get('/characters/');
            setCharacters(response.data.data)
        } catch(error){
            console.error("Erro em trazer personagens:", error.response.data);
        }
    }
        requestAPI()
    },[])

    const handleDelete = async(id) => {
        if(confirm("Tem certeza de deseja excluir o personagem?")){
            await axios.delete(`http://127.0.0.1:8000/api/characters/${id}`, {
                headers: {
                'Authorization': `Bearer ${token}`, 
                'Accept': 'application/json',
                }
            })
            alert("Personagens excluido com sucesso!")
            setCharacters(prev => prev.filter(c => c.id !== id));
        }
    }
    

    return(
         <>
        
        <Navbar />
        <div className="container">
                        


            <ul>
    {characters.map(character => {
        const imageUrl = character.image_url?.startsWith('http')
            ? character.image_url
            : `https://res.cloudinary.com/dd7vsxg0m/image/upload/${character.image_url.trim()}`;

        return (
            
            <li key={character.id}>
                <img src={imageUrl} alt={character.name} width="400"/>
                <strong>{character.name}</strong>
                <p>{character.franchise}</p>
                <p>{character.description}</p>

                <Link to={`/edit/${character.id}`}>Editar</Link>
                <button onClick={() => handleDelete(character.id)}>
                    Excluir
                </button>
            </li>
            )
        })}
    </ul>
        </div>
       </>)
}

export default CharactersList