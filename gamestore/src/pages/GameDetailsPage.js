import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchGameDetails } from '../services/api';
import ImageModal from '../components/GameDetailPage/ImageModal.js';
import '../style/GameDetailPage/GameDetailsPage.css';

const GameDetailsPage = () => {
    const { id } = useParams();
    const [selectedImageIndex, setSelectedImageIndex] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [game, setGame] = useState(null);
    const [loading, setLoading] = useState(true);

    const handleNextImage = () => {
        if (selectedImageIndex < game.screenshots.length - 1) {
            setSelectedImageIndex(selectedImageIndex + 1);
        }else{
            setSelectedImageIndex(0);
        }
    };

    const handlePrevImage = () => {
        if (selectedImageIndex > 0) {
            setSelectedImageIndex(selectedImageIndex - 1);
        }else{
            setSelectedImageIndex(game.screenshots.length - 1);
        }
    };

    // Manejador de teclas para navegación
    useEffect(() => {
        const handleKeyPress = (e) => {
            if (selectedImageIndex !== null) {
                switch (e.key) {
                    case 'ArrowRight':
                        handleNextImage();
                        break;
                    case 'ArrowLeft':
                        handlePrevImage();
                        break;
                    case 'Escape':
                        setSelectedImageIndex(null);
                        break;
                    default:
                        break;
                }
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [selectedImageIndex]);

    // Función para obtener los detalles de un juego
    useEffect(() => {
        const getGameDetails = async () => {
            try {
                const data = await fetchGameDetails(id);
                setGame(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching game details:', error);
                setLoading(false);
            }
        };
        getGameDetails();
    }, [id]);

    if (loading) return <div className="loading-spinner"></div>;
    if (!game) return <div className="not-found">Game not found</div>;

    return (
        <div className="game-details">
            <div className="hero-section">
                <img src={game.backgroundImage} alt={game.name} className="hero-image"/>
                <div className="hero-overlay">
                    <div className="hero-content">
                        <h1>{game.name}</h1>
                        <div className="hero-stats">
                            {game.metacritic && (
                                <span className={`metacritic-score score-${game.metacritic >= 80 ? 'high' : game.metacritic >= 60 ? 'medium' : 'low'}`}>
                                    Metacritic: {game.metacritic}
                                </span>
                            )}
                            <span className="rating">★ {game.rating}/5</span>
                        </div>
                        {game.price && (
                            <div className="price-section">
                                {game.discount ? (
                                    <>
                                        <span className="original-price">${game.price}</span>
                                        <span className="discounted-price">
                                            ${(game.price * (1 - game.discount/100))}
                                        </span>
                                        <span className="discount-badge">-{game.discount}%</span>
                                    </>
                                ) : (
                                    <span className="price">${game.price}</span>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="content-wrapper">
                <div className="main-content">
                    <div className="about-section">
                        <h2>About</h2>
                        <p dangerouslySetInnerHTML={{ __html: game.description }}></p>
                    </div>

                    {console.log('Screenshots:', game.screenshots)} {/* Aquí está el console.log */}
                    {(game.screenshots && game.screenshots.length > 0) && (
                        <div className="screenshots-section">
                            <h2>Screenshots</h2>
                            <div className="screenshots-grid">
                                {game.screenshots.map((screenshot, index) => (
                                    <img 
                                        key={screenshot.id}
                                        src={screenshot.image}
                                        alt={`Screenshot ${screenshot.id}`}
                                        onClick={() => setSelectedImageIndex(index)}
                                        className="screenshot-thumbnail"
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {selectedImageIndex !== null && (
                        <ImageModal 
                            images={game.screenshots}
                            currentIndex={selectedImageIndex}
                            onClose={() => setSelectedImageIndex(null)}
                            onNext={handleNextImage}
                            onPrev={handlePrevImage}
                        />
                    )}

                </div>

                <div className="sidebar">
                    <div className="info-card">
                        <div className="info-item">
                            <h3>Release Date</h3>
                            <p>{new Date(game.released).toLocaleDateString()}</p>
                        </div>

                        <div className="info-item">
                            <h3>Developers</h3>
                            <div className="tags-container">
                                {game.developers?.map(dev => (
                                    <span key={dev.id} className="tag">{dev.name}</span>
                                ))}
                            </div>
                        </div>

                        <div className="info-item">
                            <h3>Publishers</h3>
                            <div className="tags-container">
                                {game.publishers?.map(pub => (
                                    <span key={pub.id} className="tag">{pub.name}</span>
                                ))}
                            </div>
                        </div>

                        <div className="info-item">
                            <h3>Genres</h3>
                            <div className="tags-container">
                                {game.genres?.map(genre => (
                                    <span key={genre.id} className="tag">{genre.name}</span>
                                ))}
                            </div>
                        </div>

                        <div className="info-item">
                            <h3>Platforms</h3>
                            <div className="tags-container">
                                {game.platforms?.map((platform, index) => (
                                    <span key={index} className="tag">{platform.platform}</span>
                                ))}
                            </div>
                        </div>

                        {game.website && game.website !== 'No website available' && (
                            <a href={game.website} target="_blank" rel="noopener noreferrer" className="website-button">
                                Visit Website
                            </a>
                        )}
                    </div>

                    {game.tags && game.tags.length > 0 && (
                        <div className="tags-section">
                            <h3>Tags</h3>
                            <div className="tags-container">
                                {game.tags.map(tag => (
                                    <span key={tag.id} className="tag">{tag.name}</span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Nuevas secciones basadas en los datos adicionales */}
                    {game.metacriticPlatforms.length !== 0 && (
                        <div className="metacritic-platforms-section">
                            <h3>Metacritic por Plataforma</h3>
                            {game.metacriticPlatforms.map((platform, index) => (
                                <div key={index} className="metacritic-platform-item">
                                    <span>{platform.platform}: </span>
                                    <span className={`score score-${platform.metascore >= 80 ? 'high' : platform.metascore >= 60 ? 'medium' : 'low'}`}>
                                        {platform.metascore}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}

                    {game.stores && (
                        <div className="stores-section">
                            <h3>Available On</h3>
                            <div className="stores-container">
                                {game.stores.map((store, index) => (
                                    <span key={index} className="store-tag">
                                        {store.store}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default GameDetailsPage;