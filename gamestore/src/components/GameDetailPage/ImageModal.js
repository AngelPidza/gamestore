// ImageModal.js
import React from 'react';
import '../../style/GameDetailPage/ImageModal.css';

const ImageModal = ({ images, currentIndex, onClose, onNext, onPrev }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        
        <button 
          className="modal-nav modal-prev" 
          onClick={onPrev}
        >
          ‹
        </button>

        <img 
          src={images[currentIndex].image} 
          alt={`Screenshot ${currentIndex + 1}`}
          onClick={onClose}
          className="modal-image" 
        />

        <button 
          className="modal-nav modal-next" 
          onClick={onNext}
        >
          ›
        </button>

        <div className="modal-counter">
          {currentIndex + 1} / {images.length}
        </div>
      </div>
    </div>
  );
};

export default ImageModal;