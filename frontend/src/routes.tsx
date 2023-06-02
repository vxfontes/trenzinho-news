import { Routes, Route } from 'react-router-dom';
import EventoPage from './pages/evento';
import Home from './pages/home/home';
import Cadastro from './pages/login/cadastro';
import LoginPage from './pages/login/loginPage';

function RoutesApp() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cadastro" element={<Cadastro />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/event/:id" element={<EventoPage />} />
        </Routes>
    );
}

export default RoutesApp;
