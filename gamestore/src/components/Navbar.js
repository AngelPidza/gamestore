// components/Navbar.js (Nuevo componente)
import React from 'react';
import { Link } from 'react-router-dom';
import '../style/Navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar">
            <Link to="/" className="navbar-brand">
                <h1>GameStore</h1>
            </Link>
            <div className="nav-links">
                <Link to="/" className="nav-link">Home</Link>
                {/* Aquí puedes agregar más enlaces de navegación */}
            </div>
        </nav>
    );
};

export default Navbar;