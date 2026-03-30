import { Link } from "react-router-dom"
import "./Navbar.css"

function Navbar(){
    return(
        <div className="nav">
            <Link to={"/"}>Home</Link>
            <Link to={"/new"}>Adicionar novo</Link>
            <Link to={"/list"}>Ver todos</Link>
        </div>
    )
}

export default Navbar