import React, { useState } from 'react';
import GameList from './components/GameList';
import './App.css';

const App = () => {
    const [category, setCategory] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [discountOnly, setDiscountOnly] = useState(false);

    return (
        <>
            <header className="header">
                <h1>GameStore</h1>
            </header>

            <main className="container">
                <div className="filter-bar">
                    <label>Category:</label>
                    <select onChange={(e) => setCategory(e.target.value)} value={category}>
                        <option value="">All</option>
                        <option value="action">Action</option>
                        <option value="puzzle">Puzzle</option>
                        <option value="platform">Platform</option>
                    </select>

                    <label>Max Price:</label>
                    <input type="number" onChange={(e) => setMaxPrice(e.target.value)} value={maxPrice} />

                    <label>Discount Only:</label>
                    <input type="checkbox" onChange={(e) => setDiscountOnly(e.target.checked)} checked={discountOnly} />

                    <button onClick={() => {
                        setCategory('');
                        setMaxPrice('');
                        setDiscountOnly(false);
                    }}>
                        Reset filtros
                    </button>
                </div>

                <GameList category={category} maxPrice={maxPrice} discountOnly={discountOnly} />
            </main>

            <footer className="footer">
                <p>© 2023 GameStore - Todos los derechos reservados.</p>
            </footer>
        </>
    );
};

export default App;
