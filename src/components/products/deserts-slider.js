// import React, { useRef } from "react";
// import './cakes-slider.scss';
// import Slider from "react-slick";
// import products from "./items";

// import arrowLeft from "../../assets/img/main/arrow_left.svg";

// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

// const deserts = products.deserts;

// const DesertsSlider = () => {
//   const sliderRef = useRef(null);

//   const nextSlide = () => {
//     sliderRef.current.slickNext();
//   };

//   const prevSlide = () => {
//     sliderRef.current.slickPrev();
//   };

//   const settings = {
//     dots: false,
//     arrows: false, // отключаем дефолтные
//     infinite: true,
//     speed: 500,
//     slidesToShow: 4, // адаптируй под нужное количество
//     slidesToScroll: 1,
//     responsive: [
//       {
//         breakpoint: 992,
//         settings: {
//           slidesToShow: 3,
//         },
//       },
//       {
//         breakpoint: 768,
//         settings: {
//           slidesToShow: 2,
//         },
//       },
//       {
//         breakpoint: 576,
//         settings: {
//           slidesToShow: 1,
//         },
//       },
//     ],
//   };

//   return (
//     <section className="slider slider_deserts" id="deserts-slider">
//       <div className="container">
//         <div className="slider__header">
//           <div className="slider__btns">
//             <button className="slider__btn slider__btn_prev" onClick={prevSlide}>
//               <img src={arrowLeft} />
//             </button>
//             <button className="slider__btn slider__btn_next" onClick={nextSlide}>
//               <img src={arrowLeft}/>
//             </button>
//           </div>
//           <div className="slider__upper">
//             <div className="btn__link">Продукция</div>
//             <h2 className="title">Мои десерты</h2>
//           </div>
//         </div>

//         <Slider {...settings} ref={sliderRef} className="slider__slick">
//           {deserts.map((cake) => (
//             <div className="slider__item" key={cake.id}>
//               <div className="slider__img-wrapper">
//                 <img src={cake.imgPath} alt={cake.name} className="slider__img" />
//               </div>
//               <div className="slider__info">
//                 {cake.price && (
//                   <div className="slider__price">{cake.price.toLocaleString()} ₽</div>
//                 )}
//                 <h3 className="slider__name">{cake.name}</h3>
//                 <p className="slider__descr">Подробнее</p>
//                 <button className="slider__cart-btn">В корзину</button>
//               </div>
//             </div>
//           ))}
//         </Slider>

//       </div>
//     </section>
//   );
// };

// export default DesertsSlider;

import React from "react";
import products from "./items";
import ProductsSlider from "./productsSlider";

const DesertsSlider = () => (
  <ProductsSlider 
    products={products.deserts} 
    title="Мои десерты" 
    productType="desert" 
  />
);

export default DesertsSlider;