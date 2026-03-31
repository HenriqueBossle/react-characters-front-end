import { useEffect, useState } from "react"
import axios from "axios"
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

function CharactersEdit(){
    const { id } = useParams();
    const navigate = useNavigate();
    const token = localStorage.getItem('token');


    const [formData, setFormData] = useState({
        name: "",
        franchise: "",
        description: "",
        image_url: ""
    });

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/characters/${id}`,{
            headers: { 'Authorization': `Bearer ${token}` } // Adicione isso se a rota for privada
        }).then(response => {
            setFormData(response.data.data);
        })
        .catch(error => {
            console.error("Erro ao carregar personagem:", error);
        })
    }, [id])

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

    const data = new FormData();
    data.append("_method", "PUT"); // method spoofing para o Laravel
    data.append("name", formData.name);
    data.append("franchise", formData.franchise);
    data.append("description", formData.description);


    // Só adiciona imagem se o usuário selecionou um arquivo novo
    if (formData.image_url instanceof File) {
        data.append("image_url", formData.image_url);
    }

    try {
        await axios.post(`http://127.0.0.1:8000/api/characters/${id}`, data, {
            headers: { "Content-Type": "multipart/form-data", 
                    'Authorization': `Bearer ${token}`, 
                    'Accept': 'application/json',
            }
    
            
        });
        alert("Personagem atualizado com sucesso!");
        navigate("/list");
    } catch (error) {
        console.error("Erro ao atualizar personagem:", error);
    }
};
    
    return(
        <>
        
        <Navbar />
    <div className="container">
        <div className="card">
            <h1>EDIT CHARACTER</h1>

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label>Franchise:</label>
                    <input
                        type="text"
                        name="franchise"
                        value={formData.franchise}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label>Description:</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label>Image:</label>
                    <input
                        type="file"
                        name="image_url"
                        onChange={handleChange}
                    />
                </div>

                <button type="submit">Atualizar</button>
            </form>
        </div>
    </div>
    </>
)
}

export default CharactersEdit
