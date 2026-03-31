import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from '../App';
import CharactersCreate from '../pages/Characters/CharactersCreate';
import CharactersList from '../pages/Characters/CharactersList';
import CharactersEdit from '../pages/Characters/CharactersEdit';
import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';
import { AuthProvider } from '../context/AuthContext';
import ProtectedRoutes from './ProtectedRoutes';

export function AppRoutes() {
  return (
    <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App/>} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/list" element={<CharactersList/>}/>
        <Route element={<ProtectedRoutes />}>
            <Route path="/new" element={<CharactersCreate/>} />
            <Route path="/edit/:id" element={<CharactersEdit />}/>
        </Route>

      </Routes>
    </BrowserRouter>
    </AuthProvider>
  );
}