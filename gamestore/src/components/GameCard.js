import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/GameCard.css';

const GameCard = ({ game }) => {
  const navigate = useNavigate();

  return (
    <div 
      className="game-card-alt"
      onClick={() => navigate(`/game/${game.id}`)}
    >
      <img 
        src={game.imageUrl} 
        alt={game.name} 
      />
//me gusta el pene mucho porfavor dame mucho pene porfavor
      <div className="game-card-alt-content">
        <h3 className="game-card-alt-title">{game.name}</h3>

        <div className="game-card-alt-genres">
          {game.genres?.slice(0, 2).map((genre, index) => (
            <span key={index} className="game-card-alt-genre">{genre}</span>
          ))}
          {game.genres?.length > 2 && (
            <span className="game-card-alt-genre">+{game.genres.length - 2} more</span>
          )}
        </div>

        {/* Descripción añadida aquí */}
        <p className="game-card-alt-description">{game.description}</p>

        <div className="game-card-alt-rating">
          <span>★</span>
          <span>{game.rating?.toFixed(1)}</span>
        </div>

        <div className="game-card-alt-price">
          {game.discount ? (
            <>
              <span className="game-card-alt-original-price">${game.price}</span>
              <span className="game-card-alt-final-price">
                ${(game.price * (1 - game.discount / 100)).toFixed(2)}
              </span>
            </>
          ) : (
            <span className="game-card-alt-final-price">${game.price}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default GameCard;
