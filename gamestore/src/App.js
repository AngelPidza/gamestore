import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import GameDetailsPage from './pages/GameDetailsPage';
import './App.css';

const App = () => {
    return (
        <div className="App">
            <header className="header">
                <Navbar />
            </header>

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/game/:id" element={<GameDetailsPage />} />
            </Routes>

            <footer className="footer">
                <p>© 2023 GameStore - Todos los derechos reservados.</p>
            </footer>
        </div>
    );
};

export default App;