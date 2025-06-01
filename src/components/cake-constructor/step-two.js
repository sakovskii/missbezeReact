import React from 'react';
import { cakeOptions } from '../../api/cakeOptions';
import useCakeConstructor from '../../hooks/useCakeConstructor';

const StepTwo = ({ nextStep, prevStep }) => {
  const { cakeData, updateCakeData } = useCakeConstructor();

  const handleFillingChange = (e) => {
    updateCakeData({
      filling: {
        ...cakeData.filling,
        id: e.target.value,
      }
    });
  };

  const handleCoatingChange = (e) => {
    updateCakeData({
      coating: {
        ...cakeData.coating,
        id: e.target.value,
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
          <option value="" disabled>Выберите</option>
          {cakeOptions.fillings.options.map(option => (
            <option key={option.id} value={option.id}>
              {option.name} {option.price && `(+${option.price} ₽)`}
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
          <option value="" disabled>Выберите</option>
          {cakeOptions.coatings.options.map(option => (
            <option key={option.id} value={option.id}>
              {option.name} {option.price && `(+${option.price} ₽)`}
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