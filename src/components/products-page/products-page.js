import React, { useState, useEffect} from 'react';
import './products-page.scss';
import ProductModal from './product-modal';

const ProductsPage = ({products, addToCart }) => {
  const [activeTab, setActiveTab] = useState('cakes');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const productsPerPage = 8;

  const currentProducts = products[activeTab];
  const visibleProducts = currentProducts.filter(product => product.visible);
  const totalPages = Math.ceil(visibleProducts.length / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProductsPage = visibleProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  

  const openModal = (product) => {
    setSelectedProduct(product);
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };

  // Эффект для блокировки скролла страницы при открытом модальном окне
  useEffect(() => {
    if (selectedProduct) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [selectedProduct]);


  return (
    <div className="products-page">
      <section className="products-section">
        <div className="container">
          <h1 className="title title_mb35">Наша продукция</h1>
          
          {/* Вкладки */}
          <div className="products-tabs">
            <button
              className={`tab-btn ${activeTab === 'cakes' ? 'active' : ''}`}
              onClick={() => {
                setActiveTab('cakes');
                setCurrentPage(1);
              }}
            >
              Торты
            </button>
            <button
              className={`tab-btn ${activeTab === 'deserts' ? 'active' : ''}`}
              onClick={() => {
                setActiveTab('deserts');
                setCurrentPage(1);
              }}
            >
              Десерты
            </button>
          </div>
          
          {/* Список продуктов с вашими классами */}
          <div className="products-grid">
            {currentProductsPage.map(product => (
              <div 
                className="slider__item" 
                key={`${activeTab}-${product.id}`}
                onClick={() => openModal(product)}
              >
                <div className="slider__img-wrapper">
                  <img 
                    src={`http://miss-beze.local${product.imgPath}`}
                    alt={product.name} 
                    className="slider__img" 
                    onError={(e) => {
                      e.target.src = '/images/default-cake.jpg'; // Запасное изображение
                    }}
                  />
                </div>
                <div className="slider__info">
                  {product.price && (
                    <div className="slider__price">{product.price.toLocaleString()} ₽</div>
                  )}
                  <h3 className="slider__name">{product.name}</h3>
                  <p className="slider__descr">Подробнее</p>
                  <button
                    className="slider__cart-btn"
                    onClick={() => addToCart(product)}
                  >
                    В корзину
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          {/* Пагинация */}
          {totalPages > 1 && (
            <div className="pagination">
              <button 
                className="page-btn prev-next"
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                &lt;
              </button>
              
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  className={`page-btn ${currentPage === i + 1 ? 'active' : ''}`}
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
              
              <button 
                className="page-btn prev-next"
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                &gt;
              </button>
            </div>
          )}
        </div>
      </section>

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          productType={activeTab.slice(0, -1)} // 'cake' или 'desert'
          onClose={() => setSelectedProduct(null)}
          addToCart={addToCart}
        />
      )}
    </div>
  );
};

export default ProductsPage;