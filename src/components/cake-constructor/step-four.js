import React, { useState, useEffect, useRef } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './step-four.scss';
import clip from "../../assets/img/main/clip.svg";
import arrowLeft from "../../assets/img/main/arrow_left.svg";
import { useCakeConstructor } from '../../hooks/useCakeConstructor';

const StepFour = ({ products, nextStep, prevStep }) => {
    const { cakeData, updateCakeData } = useCakeConstructor();
    const [slidesToShow, setSlidesToShow] = useState(3);
    const formRef = useRef(null);
    const sliderRef = useRef(null);
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

    // Проверка для infinite: включаем только если достаточно элементов
    const sliderSettings = {
        dots: false,
        arrows: false,
        infinite: products.cakes.length > slidesToShow,
        speed: 500,
        slidesToShow,
        slidesToScroll: 1,
    };

    const handleFileUpload = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            const fileUrl = URL.createObjectURL(file);
            console.log('Uploading custom reference:', { fileUrl, file });
            updateCakeData(4, {
                reference: { id: 0, name: 'Пользовательский эскиз', type: 'custom' },
                referenceImg: { path: fileUrl, fileObject: file }
            });
        }
    };

    const handleExampleSelect = (cakeId) => {
        const selectedCake = products.cakes.find(c => c.id === cakeId);
        const isSelected = cakeData.reference?.type === 'example' && cakeData.reference.id === cakeId;
        console.log('Selecting example cake:', { cakeId, selectedCake, isSelected });

        if (isSelected) {
            updateCakeData(4, {
                reference: { id: 0, name: 'Без референса' },
                referenceImg: { path: '' }
            });
        } else {
            updateCakeData(4, {
                reference: {
                    id: cakeId,
                    name: selectedCake.name,
                    type: 'example'
                },
                referenceImg: { path: `http://miss-beze.local${selectedCake.imgPath}` }
            });
        }
    };

    const handleRemovePhoto = (e) => {
        e.stopPropagation();
        console.log('Removing custom reference');
        updateCakeData(4, {
            reference: { id: 0, name: 'Без референса' },
            referenceImg: { path: '' }
        });
        if (cakeData.referenceImg?.path) {
            URL.revokeObjectURL(cakeData.referenceImg.path);
        }
    };

    // Отладка текущего состояния
    console.log('StepFour - current cakeData:', cakeData);
    console.log('StepFour - products.cakes:', products.cakes);

    return (
        <div className="ref-slider" ref={formRef}>
            <div className="param__group">
                <label className="label__title">Выберите максимально подходящий дизайн торта</label>

                <div className="slider__btns">
                    <button className="slider__btn slider__btn_prev" onClick={prevSlide}>
                        <img src={arrowLeft} alt="Previous" />
                    </button>
                    <button className="slider__btn slider__btn_next" onClick={nextSlide}>
                        <img src={arrowLeft} alt="Next" style={{ transform: 'rotate(180deg)' }} />
                    </button>
                </div>

                {products.cakes.length > 0 ? (
                    <Slider {...sliderSettings} ref={sliderRef}>
                        {products.cakes.map(cake => {
                            const isChecked = cakeData.reference?.type === 'example' && cakeData.reference.id === cake.id;
                            return (
                                <div key={cake.id} style={{ padding: '0 5px' }}>
                                    <div
                                        className={`checkbox__param checkbox__param_constr ${isChecked ? 'selected' : ''}`}
                                    >
                                        <div className="ref-slider__img-wrapper">
                                            <img
                                                src={`http://miss-beze.local${cake.imgPath}`}
                                                alt={cake.name}
                                                className="ref-slider__img"
                                                onError={(e) => (e.target.src = '/images/default-cake.jpg')}
                                            />
                                        </div>
                                        <input
                                            type="checkbox"
                                            id={`cake-${cake.id}`}
                                            checked={isChecked}
                                            onChange={() => handleExampleSelect(cake.id)}
                                            className="visually-hidden"
                                        />
                                        <label
                                            htmlFor={`cake-${cake.id}`}
                                            className="checkbox__label"
                                        >
                                            {cake.name}
                                        </label>
                                    </div>
                                </div>
                            );
                        })}
                    </Slider>
                ) : (
                    <p>Нет доступных примеров дизайна</p>
                )}
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
                            {cakeData.reference?.type === 'custom' ? (
                                <>
                                    <span>Фото загружено</span>
                                    <button
                                        type="button"
                                        onClick={handleRemovePhoto}
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