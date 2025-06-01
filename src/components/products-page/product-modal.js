import React, { useEffect } from 'react';
import './product-modal.scss';

const ProductModal = ({ product, productType, onClose, addToCart }) => {
  // Блокируем скролл страницы при открытии
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  // Закрытие по ESC
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!product) return null;

  return (
    <div className="product-modal" onClick={onClose}>
      <div className="product-modal__overlay"></div>
      <div className="product-modal__content" onClick={(e) => e.stopPropagation()}>
        <button className="product-modal__close" onClick={onClose}>
          &times;
        </button>
        
        <div className="product-modal__image-container">
          <img 
            src={product.imgPath} 
            alt={product.name}
            className="product-modal__image"
            onError={(e) => {
              e.target.src = '/images/default-cake.jpg';
            }}
          />
        </div>
        
        <div className="product-modal__info">
          <h2 className="product-modal__name">{product.name}</h2>
          <p className="product-modal__price">{product.price.toLocaleString()} ₽</p>
          
          <div className="product-modal__description">
            <h3>Описание</h3>
            <p>{product.descr}</p>
            {product.dopText && (
              <p className="product-modal__additional">{product.dopText}</p>
            )}
          </div>
          
          <button 
            className="product-modal__add-to-cart"
            onClick={() => {
              addToCart(product, productType);
              onClose();
            }}
          >
            Добавить в корзину
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;