import React, { useState, useEffect, useRef } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import products from '../../data/items';
import './step-four.scss';
import arrowLeft from "../../assets/img/main/arrow_left.svg";
import clip from "../../assets/img/main/clip.svg";

const StepFour = ({ cakeData, updateCakeData }) => {
    const [reference, setReference] = useState(null);
    const [slidesToShow, setSlidesToShow] = useState(3);

    const formRef = useRef(null);       // для ширины
    const sliderRef = useRef(null);     // для управления слайдером

    const nextSlide = () => sliderRef.current?.slickNext();
    const prevSlide = () => sliderRef.current?.slickPrev();

    useEffect(() => {
        const updateSlidesToShow = () => {
            if (!formRef.current) return;
            const width = formRef.current.offsetWidth;
            setSlidesToShow(width < 576 ? 1 : width < 768 ? 3 : width < 992 ? 3 : 4);
        };

        updateSlidesToShow();
        window.addEventListener('resize', updateSlidesToShow);
        return () => window.removeEventListener('resize', updateSlidesToShow);
    }, []);

    const sliderSettings = {
        dots: false,
        arrows: false,
        infinite: true,
        speed: 500,
        slidesToShow,
        slidesToScroll: 1,
    };

    const handleFileUpload = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            const newRef = { type: 'custom', file };
            setReference(newRef);
            updateCakeData({ reference: newRef });
        }
    };

    const handleExampleSelect = (cakeId) => {
        const selected = reference?.type === 'example' && reference.id === cakeId
            ? null
            : { type: 'example', ...products.cakes.find(c => c.id === cakeId) };
        setReference(selected);
        updateCakeData({ reference: selected });
    };

    return (
        <div className="ref-slider" ref={formRef}>
            <div className="param__group">
                <label className="label__title">Выберите максимально подходящий дизайн торта</label>

                <div className="slider__btns">
                    <button className="slider__btn slider__btn_prev" onClick={prevSlide}>
                        <img src={arrowLeft} alt="Previous" />
                    </button>
                    <button className="slider__btn slider__btn_next" onClick={nextSlide}>
                        <img src={arrowLeft} alt="Next" />
                    </button>
                </div>

                <Slider {...sliderSettings} ref={sliderRef}>
                    {products.cakes.map(cake => (
                        <div key={cake.id} style={{ padding: '0 5px' }}>
                            <div
                                className={`checkbox__param checkbox__param_constr ${reference?.type === 'example' && reference.id === cake.id ? 'selected' : ''
                                    }`}
                            >
                                <div className="ref-slider__img-wrapper">
                                    <img
                                        src={cake.imgPath}
                                        alt={cake.name}
                                        className="ref-slider__img"
                                        onError={(e) => (e.target.src = '/images/default-cake.jpg')}
                                    />
                                </div>
                                <input
                                    type="checkbox"
                                    id={`cake-${cake.id}`}
                                    checked={reference?.type === 'example' && reference.id === cake.id}
                                    onChange={() => handleExampleSelect(cake.id)}
                                    onClick={(e) => e.stopPropagation()}
                                />
                                <label htmlFor={`cake-${cake.id}`} className="checkbox__label">
                                    {cake.name}
                                </label>
                            </div>
                        </div>
                    ))}
                </Slider>


            </div>

            <div className="param__group">
                <div className="custom-reference">
                    <label className="label__title">Прикрепите свой пример / эскиз</label>
                    <div className="photo-upload">
                        <img src={clip} alt="Прикрепить фото" />
                        <input
                            type="file"
                            id="custom-reference-upload"
                            accept="image/*"
                            onChange={handleFileUpload}
                            style={{ display: 'none' }}
                        />
                        <label htmlFor="custom-reference-upload" className="photo-upload__btn">
                            {reference?.type === 'custom' ? (
                                <>
                                    <span>Фото: {reference.file.name}</span>
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setReference(null);
                                            updateCakeData({ reference: null });
                                        }}
                                        className="photo-upload__remove"
                                    >
                                        ×
                                    </button>
                                </>
                            ) : (
                                "Прикрепить фото"
                            )}
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StepFour;
