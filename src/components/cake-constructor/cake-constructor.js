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
import useCakeConstructor from '../../hooks/useCakeConstructor';

const CakeConstructor = () => {
    const [step, setStep] = useState(1);
    const { cakeData, updateCakeData, resetCakeData } = useCakeConstructor();

    const nextStep = () => setStep(prev => prev + 1);
    const prevStep = () => setStep(prev => prev - 1);

    const handleComplete = () => {
        // Здесь можно добавить логику завершения заказа
        console.log('Заказ завершен:', cakeData);
        resetCakeData();
        setStep(1);
    };

    const renderStepContent = () => {
        switch (step) {
            case 1:
                return <StepOne nextStep={nextStep} />;
            case 2:
                return <StepTwo nextStep={nextStep} prevStep={prevStep} />;
            case 3:
                return <StepThree nextStep={nextStep} prevStep={prevStep} />;
            case 4:
                return <StepFour nextStep={nextStep} prevStep={prevStep} />;
            case 5:
            return (
                <StepFive
                    prevStep={prevStep}
                    onComplete={handleComplete}
                    cakeData={cakeData}
                    updateCakeData={updateCakeData}
                />
            );
            default:
                return <StepOne nextStep={nextStep} />;
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
                            <div className="configurator__form">
                                {renderStepContent()}
                            </div>
                        </div>
                    </div>
                    
                    <div className="configurator__right">
                        <div className="configurator__preview">
                            <Preview cakeData={cakeData} />
                        </div>
                    </div>
                </div>
                
                <div className="configurator__footer">
                    <p className="warning">
                        <span className='warning_red'>Важно! </span>
                        Обязательно предупреждайте об аллергических реакциях на любые компоненты начинок или декора для исключения их из состава.
                    </p>
                    <div className="nav-buttons">
                        {step > 1 && (
                            <button className="nav-button nav-button_prev" onClick={prevStep}>
                                <img src={arrowBack} alt="Вернуться назад" />
                            </button>
                        )}
                        <button 
                            className="nav-button nav-button_next" 
                            onClick={step === 5 ? handleComplete : nextStep}
                        >
                            {step < 5 ? 'Далее' : 'Завершить'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CakeConstructor;