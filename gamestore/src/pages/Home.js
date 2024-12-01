// pages/Home.js (Nueva página que contiene tu lógica actual)
import React, { useState } from 'react';
import GameList from '../components/GameList';

const Home = () => {
    const [category, setCategory] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [discountOnly, setDiscountOnly] = useState(false);

    return (
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
    );
};

export default Home;