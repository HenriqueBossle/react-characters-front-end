import { Link } from 'react-router-dom'
import './App.css'

function App() {
  return (
    <div className="hero">
        <div className="overlay">
            <h1>CHARACTERS DATABASE</h1>
            <p>Adicione e Explore personagens de diversas histórias e universos.</p>
            <Link className='button' to={"/list"}>VER PERSONAGENS</Link>
        </div>
    </div>
  )
}

export default App