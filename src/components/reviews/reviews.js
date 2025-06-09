import React, { useRef, useEffect } from "react";
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

    useEffect(() => {
        console.log('Slider ref:', sliderRef.current);
        console.log('reviewsItems:', reviewsItems);
    }, []);

    const nextSlide = () => {
        sliderRef.current?.slickNext();
    };

    const prevSlide = () => {
        sliderRef.current?.slickPrev();
    };

    const settings = {
        dots: false,
        arrows: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1, // Подстраивает высоту под содержимое
        adaptiveHeight: true,
    };

    return (
        <section className="reviews" id="reviews-slider">
            <div className="reviews__img"></div>
            <div className="container">
                <div className="reviews__wrapper">
                    <div className="reviews__inner">
                        <p className="title">Отзывы</p>
                        <div className="reviews__slider_wrapper">
                            <Slider {...settings} ref={sliderRef} className="slider__slick">
                                {reviewsItems.map((review) => (
                                    <div className="reviews__item-wrapper">
                                        <div className="reviews__slider_item" key={review.id}>
                                        <div className="reviews__person">
                                            <p className="reviews__name">{`${review.lastname} ${review.name}`}</p>
                                            <p className="reviews__descr">{review.descr.slice(0, 200)}</p>
                                        </div>
                                        <ul className="reviews__stars">
                                            {Array.from({ length: 5 }, (_, i) => (
                                                <li className="reviews__star" key={i}>
                                                    <img src={i < review.stars ? starOn : starOff} alt="" />
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    </div>
                                ))}
                            </Slider>
                        </div>
                        <div className="reviews__btn">
                            <div className="slider__btns">
                                <button className="slider__btn slider__btn_prev" onClick={prevSlide}>
                                    <img src={arrowLeft} alt="Previous" />
                                </button>
                                <button className="slider__btn slider__btn_next" onClick={nextSlide}>
                                    <img src={arrowLeft} alt="Next" />
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