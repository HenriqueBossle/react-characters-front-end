import { useState, useEffect } from 'react'
import axios from 'axios';
import "./CharactersCreate.css";

function CharactersCreate(){
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

    const data = new FormData();
    data.append("name", formData.name);
    data.append("franchise", formData.franchise);
    data.append("description", formData.description);
    data.append("image_url", formData.image_url);

        try{
            await axios.post("http://127.0.0.1:8000/api/characters", data);
            alert("Character criado com sucesso!");
            navigate("/list")

        }catch (error) {
            console.error("Erro ao criar personagens:", error);
        }
    
    }
    return(
        <>
             <div className="container">
        <div className="card">
            <h2>Create Character</h2>

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

                <button type="submit">Create</button>
            </form>
        </div>
    </div>
        </>
    )    
}

export default CharactersCreate