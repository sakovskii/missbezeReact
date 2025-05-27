import React, { useState } from 'react';
import './cake-constructor.scss';
import StepOne from './step-one';
import StepTwo from './step-two';
import "../footer/warning.scss";
import Preview from './preview';
import arrowBack from '../../assets/img/main/arrow_back.svg';
import StepThree from './step-three';
import StepFour from './step-four';
import StepFive from './step-five';

const CakeConstructor = () => {
    const [step, setStep] = useState(1);
    const [cakeData, setCakeData] = useState({
        tiers: '',
        shape: '',
        servings: 10,
        filling: null,
        decor: null,
        cream: null,
        details: ''
    });

    const nextStep = () => setStep(prev => prev + 1);
    const prevStep = () => setStep(prev => prev - 1);

    const updateCakeData = (newData) => {
        setCakeData(prev => ({ ...prev, ...newData }));
    };

    const renderStepContent = () => {
        switch (step) {
            case 1:
                return <StepOne cakeData={cakeData} updateCakeData={updateCakeData} />;
            case 2:
                return <StepTwo cakeData={cakeData} updateCakeData={updateCakeData} />;
            case 3:
                return <StepThree cakeData={cakeData} updateCakeData={updateCakeData} />
            case 4:
                return <StepFour cakeData={cakeData} updateCakeData={updateCakeData} />
            case 5:
                return <StepFive cakeData={cakeData} updateCakeData={updateCakeData} />
            default:
                return <StepOne cakeData={cakeData} updateCakeData={updateCakeData} />;
        }
    };

    return (
        <div className="configurator">
            <div className="container">
                <h1 className="title">Конструктор тортов</h1>
                <div className="configurator__wrapper">
                    <div className="configurator__inner">
                        <div className="configurator__progress">
                            <div className="progress-line">
                                <div
                                    className="progress-line-active"
                                    style={{ width: `${(step - 1) * 25}%` }}
                                />
                            </div>
                            {[1, 2, 3, 4, 5].map((num) => (
                                <div
                                    key={num}
                                    className={`progress-step ${step >= num ? 'active' : ''}`}
                                    style={{ animationDelay: `${num * 0.1}s` }}
                                >
                                    {num}
                                </div>
                            ))}
                        </div>

                        <div className="configurator__main">
                            {/* Левая часть - меняющийся контент */}
                            <div className="configurator__form">


                                {renderStepContent()}


                            </div>
                        </div>


                    </div>
                    {/* Правая часть - неизменный блок характеристик */}
                    <div className="configurator__right">
                        <div className="configurator__preview">
                            <Preview cakeData={cakeData} />
                        </div>
                    </div>
                </div>
                <div className="configurator__footer">
                    <p className="warning"><span className='warning_red'>Важно! </span>Обязательно предупреждайте об аллергических реакциях на любые компоненты начинок или декора для исключения их из состава.</p>
                    <div className="nav-buttons">
                        {step > 1 && (
                            <button className="nav-button nav-button_prev" onClick={prevStep}>
                                <img src={arrowBack} alt="Вернуться назад" />
                            </button>
                        )}
                        <button className="nav-button nav-button_next" onClick={nextStep}>
                            {step < 5 ? 'Далее' : 'Завершить'}
                        </button>
                    </div>
                </div>
            </div>


        </div>
    );
};

export default CakeConstructor;