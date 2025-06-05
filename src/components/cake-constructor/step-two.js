import React from 'react';
import { cakeOptions } from '../../api/cakeOptions';
import useCakeConstructor from '../../hooks/useCakeConstructor';

const StepTwo = ({ nextStep, prevStep }) => {
  const {
    cakeData,
    updateCakeData,
    fillings,
    coatings,
    isLoading,
    error
  } = useCakeConstructor();
  console.log(fillings);

  const handleFillingChange = (e) => {
    // const selectedId = parseInt(e.target.value);
    // const selectedFilling = fillings.find(f => f.id === selectedId);
    const selectedId = e.target.value; // оставить строкой
    const selectedFilling = fillings.find(f => f.id === selectedId);

    updateCakeData({
      filling: {
        id: parseInt(selectedId),
        name: selectedFilling?.name || '',
        cakeColor: selectedFilling?.biscuit_color || '#E9C57C',
        creamColor: selectedFilling?.filling_color || '#FFFFFF',
        comment: cakeData.filling.comment
      }
    });
  };

  const handleCoatingChange = (e) => {
    const selectedId = e.target.value; // оставить строкой
    const selectedCoating = coatings.find(c => c.id === selectedId);

    updateCakeData({
      coating: {
        id: parseInt(selectedId), // сохранить как число, если нужно
        name: selectedCoating?.name || '',
        color: selectedCoating?.color_code || 'white',
        comment: cakeData.coating.comment
      }
    });
  };


  const handleCommentChange = (e) => {
    const { name, value } = e.target;
    if (name === 'fillingComment') {
      updateCakeData({
        filling: {
          ...cakeData.filling,
          comment: value
        }
      });
    } else {
      updateCakeData({
        coating: {
          ...cakeData.coating,
          comment: value
        }
      });
    }
  };

  if (isLoading.fillings || isLoading.coatings) {
    return <div className="loading-message">Загрузка данных...</div>;
  }

  if (error.fillings || error.coatings) {
    return (
      <div className="error-message">
        Ошибка загрузки данных: {error.fillings || error.coatings}
      </div>
    );
  }

  return (
    <div className="step-two">
      {/* Начинка */}
      <div className="param__group">
        <label htmlFor="fillings" className='label__title'>Начинка</label>
        <select
          id="fillings"
          name="fillings"
          value={cakeData.filling?.id || ''}
          onChange={handleFillingChange}
          required
        >
          <option value="" disabled>Выберите начинку</option>
          {fillings.map(filling => (
            <option key={filling.id} value={filling.id}>
              {filling.name}
            </option>
          ))}
        </select>
        <textarea
          name="fillingComment"
          placeholder="Опишите ваши пожелания по начинке"
          value={cakeData.filling?.comment || ''}
          onChange={handleCommentChange}
        />
      </div>

      {/* Покрытие */}
      <div className="param__group">
        <label htmlFor="coatings" className='label__title'>Покрытие</label>
        <select
          id="coatings"
          name="coatings"
          value={cakeData.coating?.id || ''}
          onChange={handleCoatingChange}
          required
        >
          <option value="" disabled>Выберите покрытие</option>
          {coatings.map(coating => (
            <option key={coating.id} value={coating.id}>
              {coating.name}
            </option>
          ))}
        </select>
        <textarea
          name="coatingComment"
          placeholder="Опишите ваши пожелания по покрытию"
          value={cakeData.coating?.comment || ''}
          onChange={handleCommentChange}
        />
      </div>
    </div>
  );
};

export default StepTwo;