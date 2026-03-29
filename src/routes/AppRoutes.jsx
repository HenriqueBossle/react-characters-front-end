import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from '../App';
import CharactersCreate from '../pages/Characters/CharactersCreate';
import CharactersList from '../pages/Characters/CharactersList';
import CharactersEdit from '../pages/Characters/CharactersEdit';

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App/>} />
        <Route path="/new" element={<CharactersCreate/>} />
        <Route path="/list" element={<CharactersList/>}/>
        <Route path="/edit/:id" element={<CharactersEdit />}/>
      </Routes>
    </BrowserRouter>
  );
}