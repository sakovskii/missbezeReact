import React from 'react';
import { cakeOptions } from '../../api/cakeOptions';
import { useCakeConstructor } from '../../hooks/useCakeConstructor';

const StepTwo = ({ nextStep, prevStep }) => {
    const { cakeData, updateCakeData, fillings, coatings, isLoading, error } = useCakeConstructor();

    // Отладка
    console.log('StepTwo - fillings:', fillings);
    console.log('StepTwo - coatings:', coatings);
    console.log('StepTwo - current cakeData:', cakeData);

    const handleFillingChange = (e) => {
        const fillingId = e.target.value; // Не преобразуем в число, так как id - строка
        const selectedFilling = fillings.find(f => f.id.toString() === fillingId);
        console.log('Selected filling ID:', fillingId, 'Selected filling:', selectedFilling);

        if (!selectedFilling) {
            console.warn('No filling found for ID:', fillingId);
            return;
        }

        updateCakeData(2, {
            filling: {
                id: parseInt(selectedFilling.id, 10), // Преобразуем id в число для cakeData
                name: selectedFilling.name,
                biscuit_color: selectedFilling.biscuit_color || '#FFFDD0',
                filling_color: selectedFilling.filling_color || '#FFFFFF',
                price: selectedFilling.price || 0,
                comment: cakeData.filling.comment || ''
            }
        });
    };

    const handleCoatingChange = (e) => {
        const coatingId = e.target.value; // Не преобразуем в число, так как id - строка
        const selectedCoating = coatings.find(c => c.id.toString() === coatingId);
        console.log('Selected coating ID:', coatingId, 'Selected coating:', selectedCoating);

        if (!selectedCoating) {
            console.warn('No coating found for ID:', coatingId);
            return;
        }

        updateCakeData(2, {
            coating: {
                id: parseInt(selectedCoating.id, 10), // Преобразуем id в число для cakeData
                name: selectedCoating.name,
                color: selectedCoating.color || '#FFFFFF',
                price: selectedCoating.price || 0,
                comment: cakeData.coating.comment || ''
            }
        });
    };

    const handleCommentChange = (e, type) => {
        console.log(`Updating ${type} comment:`, e.target.value);
        updateCakeData(2, {
            [type]: {
                ...cakeData[type],
                comment: e.target.value
            }
        });
    };

    return (
        <div className="step-two">
            <div className="param__group">
                <label htmlFor="filling" className='label__title'>Начинка</label>
                {isLoading.fillings ? (
                    <p>Загрузка...</p>
                ) : error.fillings ? (
                    <p>Ошибка: {error.fillings}</p>
                ) : fillings.length === 0 ? (
                    <p>Нет доступных начинок</p>
                ) : (
                    <select
                        id="filling"
                        value={cakeData.filling?.id?.toString() || ''} // Приводим id к строке
                        onChange={handleFillingChange}
                        required
                    >
                        <option value="" disabled>Выберите начинку</option>
                        {fillings.map(filling => (
                            <option key={filling.id} value={filling.id}>
                                {filling.name} ({filling.price} руб.)
                            </option>
                        ))}
                    </select>
                )}
                <textarea
                    placeholder="Комментарий к начинке"
                    value={cakeData.filling.comment || ''}
                    onChange={(e) => handleCommentChange(e, 'filling')}
                />
            </div>

            <div className="param__group">
                <label htmlFor="coating" className='label__title'>Покрытие</label>
                {isLoading.coatings ? (
                    <p>Загрузка...</p>
                ) : error.coatings ? (
                    <p>Ошибка: {error.coatings}</p>
                ) : coatings.length === 0 ? (
                    <p>Нет доступных покрытий</p>
                ) : (
                    <select
                        id="coating"
                        value={cakeData.coating?.id?.toString() || ''} // Приводим id к строке
                        onChange={handleCoatingChange}
                        required
                    >
                        <option value="" disabled>Выберите покрытие</option>
                        {coatings.map(coating => (
                            <option key={coating.id} value={coating.id}>
                                {coating.name} ({coating.price} руб.)
                            </option>
                        ))}
                    </select>
                )}
                <textarea
                    placeholder="Комментарий к покрытию"
                    value={cakeData.coating.comment || ''}
                    onChange={(e) => handleCommentChange(e, 'coating')}
                />
            </div>

        </div>
    );
};

export default StepTwo;