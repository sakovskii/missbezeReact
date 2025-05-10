import React, { useRef } from "react";
import './reviews.scss';
import arrowLeft from "../../assets/img/main/arrow_left.svg";
import Slider from "react-slick";
import reviewsList from "./review";

import starOn from '../../assets/img/main/star_on.svg';
import starOff from '../../assets/img/main/star_off.svg';


import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const reviewsItems = reviewsList;

const Reviews = () => {
    const sliderRef = useRef(null);

    const nextSlide = () => {
        sliderRef.current.slickNext();
    };

    const prevSlide = () => {
        sliderRef.current.slickPrev();
    };

    const settings = {
        dots: false,
        arrows: false, // отключаем дефолтные
        infinite: true,
        speed: 500,
        slidesToShow: 1, // адаптируй под нужное количество
        slidesToScroll: 1
    };
    return (
        <section className="reviews" id="reviews-slider">
            <div className="reviews__img"></div>
            <div className="container">
                <div className="reviews__wrapper">
                    <div className="reviews__inner">
                        <p className="title">Отзывы</p>
                        <div className="reviews__slider_wrapper">
                            <div className="reviews__slider_inner">

                                <Slider {...settings} ref={sliderRef} className="slider__slick">
                                    {reviewsItems.map((review) => (
                                        <div className="reviews__slider_item">
                                            <div className="reviews__person">
                                                <p className="reviews__name">{`${review.lastname} ${review.name}`}</p>
                                                <p className="reviews__descr">{review.descr}</p>
                                            </div>
                                            <ul className="reviews__stars">
                                                {Array.from({ length: 5 }, (_, i) => (
                                                    <li className="reviews__star" key={i}>
                                                        <img src={i < review.stars ? starOn : starOff} alt="" />
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </Slider>

                            </div>
                        </div>
                        <div className="reviews__btn">
                            <div className="slider__btns">
                                <button className="slider__btn slider__btn_prev" onClick={prevSlide}>
                                    <img src={arrowLeft} />
                                </button>
                                <button className="slider__btn slider__btn_next" onClick={nextSlide}>
                                    <img src={arrowLeft} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );

};

export default Reviews;