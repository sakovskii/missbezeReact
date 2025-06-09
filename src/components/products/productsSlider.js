import React, { useRef } from "react";
import Slider from "react-slick";
import arrowLeft from "../../assets/img/main/arrow_left.svg";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./cakes-slider.scss";

const ProductsSlider = ({ products, title, productType, addToCart }) => {
  const sliderRef = useRef(null);

  const nextSlide = () => sliderRef.current.slickNext();
  const prevSlide = () => sliderRef.current.slickPrev();

  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 992, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 576, settings: { slidesToShow: 1, centerMode: false} },
    ],
  };

  console.log("Products в слайдере:", products);
   const visibleProducts = products.filter(product => product.visible === "1");

  return (
    <section className={`slider slider_${productType}`} id={`${productType}-slider`}>
      <div className="container">
        <div className="slider__header">
          <div className="slider__btns">
            <button className="slider__btn slider__btn_prev" onClick={prevSlide}>
              <img src={arrowLeft} alt="Previous" />
            </button>
            <button className="slider__btn slider__btn_next" onClick={nextSlide}>
              <img src={arrowLeft} alt="Next" />
            </button>
          </div>
          <div className="slider__upper">
            <div className="btn__link">Продукция</div>
            <h2 className="title">{title}</h2>
          </div>
        </div>

        <Slider {...settings} ref={sliderRef} className="slider__slick">
          {visibleProducts.map((product) => (
            <div className="slider__item" key={product.id}>
              <div className="slider__img-wrapper">
                <img src={`http://miss-beze.local${product.imgPath}`} alt={product.name} className="slider__img" />
              </div>
              <div className="slider__info">
                {product.price && <div className="slider__price">{product.price.toLocaleString()} ₽</div>}
                <h3 className="slider__name">{product.name}</h3>
                <p className="slider__descr">Подробнее</p>
                <button
                  className="slider__cart-btn"
                  onClick={() => addToCart(product, productType)}
                >
                  В корзину
                </button>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default ProductsSlider;
