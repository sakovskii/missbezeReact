import React from 'react';
// import { cakeOptions } from '../../api/cakeOptions';
import { useCakeConstructor } from '../../hooks/useCakeConstructor';

const cakeOptions = {
    tiers: {
        options: [
            { id: 1, value: 1, name: '1 ярус' },
            { id: 2, value: 2, name: '2 яруса' },
            { id: 3, value: 3, name: '3 яруса' }
        ]
    },
    shapes: {
        options: [
            { id: 1, name: 'Круг' },
            { id: 2, name: 'Квадрат' },
            { id: 3, name: 'Прямоугольник' }
        ]
    }
};

const StepOne = ({ nextStep }) => {
    const { cakeData, updateCakeData } = useCakeConstructor();

    const handleChange = (e) => {
        const { name, value } = e.target;
        updateCakeData(1, {
            [name]: name === 'servings' ? parseInt(value, 10) : value
        });
    };

    return (
        <div className="step-one">
            {/* Количество ярусов */}
            <div className="param__group">
                <label htmlFor="tiers" className='label__title'>Количество ярусов</label>
                <select
                    id="tiers"
                    name="tiers"
                    value={cakeData.tiers || ''}
                    onChange={handleChange}
                    required
                >
                    <option value="" disabled>Выберите</option>
                    {cakeOptions.tiers.options.map(option => (
                        <option key={option.id} value={option.value}>
                            {option.name}
                        </option>
                    ))}
                </select>
            </div>

            {/* Форма торта */}
            <div className="param__group">
                <label htmlFor="form" className='label__title'>Форма торта</label>
                <select
                    id="form"
                    name="form"
                    value={cakeData.form || ''}
                    onChange={handleChange}
                    required
                >
                    <option value="" disabled>Выберите</option>
                    {cakeOptions.shapes.options.map(option => (
                        <option key={option.id} value={option.name}>
                            {option.name}
                        </option>
                    ))}
                </select>
            </div>

            {/* Количество порций */}
            <div className="param__group param__counter">
                <label className='label__title'>Количество порций</label>
                <div className="param__counter-wrapper">
                    <div className="param__counter-inner">
                        <button
                            className="param__operator param__operator_minus"
                            onClick={() => {
                                const newValue = Math.max(10, (cakeData.servings || 10) - 2);
                                console.log('Decreasing servings:', { newValue});
                                updateCakeData(1, { servings: newValue || 1 });
                            }}
                            disabled={(cakeData.servings || 10) <= 10}
                            aria-label="Уменьшить количество порций"
                        >
                            -
                        </button>

                        <div className="param__counter-value">
                            {cakeData.servings || 10}
                        </div>

                        <button
                            className="param__operator param__operator_plus"
                            onClick={() => {
                                const newValue = Math.min(50, (cakeData.servings || 10) + 2);
                                console.log('Increasing servings:', { newValue});
                                updateCakeData(1,{ servings: newValue || 1 });
                            }}
                            disabled={(cakeData.servings || 10) >= 50}
                            aria-label="Увеличить количество порций"
                        >
                            +
                        </button>
                    </div>

                    <div className="param__counter-info">
                        <p>Вес торта ~ <span>{cakeData.weight ? `${cakeData.weight} кг` : 'не рассчитан'}</span> из расчёта 200 гр на человека</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StepOne;