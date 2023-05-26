import { Routes, Route } from 'react-router-dom';
import Home from './pages/home/home';
import LoginPage from './pages/login/loginPage';

function RoutesApp() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
        </Routes>
    );
}

export default RoutesApp;
