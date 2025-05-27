import React from 'react';
import { cakeOptions } from './cakeOptions';

const StepTwo = ({ cakeData, updateCakeData }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    updateCakeData({ [name]: name === 'servings' ? parseInt(value, 10) : value });
  };

  return (
    <div className="step-two">
      {/* Количество ярусов */}
      <div className="param__group">
        <label htmlFor="fillings" className='label__title'>Начинка</label>
        <select
          id="fillings"
          name="fillings"
          value={cakeData.fillings || ''}
          onChange={handleChange}
          required
        >
          <option value="" disabled>Выберите</option>
          {cakeOptions.fillings.options.map(option => (
            <option key={option.id} value={option.value}>
              {option.name}
            </option>
          ))}
        </select>
        <textarea name="fillings_msg" placeholder="Опишите ваши пожелания по начинке" />

      </div>


      {/* Форма торта */}
      <div className="param__group">
        <label htmlFor="coatings" className='label__title'>Покрытие</label>
        <select
          id="coatings"
          name="coatings"
          value={cakeData.coatings || ''}
          onChange={handleChange}
          required
        >
          <option value="" disabled>Выберите</option>
          {cakeOptions.coatings.options.map(option => (
            <option key={option.id} value={option.name}>
              {option.name}
            </option>
          ))}
        </select>

        <textarea name="fillings_msg" placeholder="Опишите ваши пожелания по покрытию" />

      </div>

    </div>
  );
};

export default StepTwo;
