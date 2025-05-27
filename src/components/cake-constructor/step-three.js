import React, { useState, useEffect } from 'react';
import { cakeOptions } from './cakeOptions';
import clip from "../../assets/img/main/clip.svg";

const StepThree = ({ cakeData, updateCakeData }) => {
  // Находим вариант "Без декора" и "Фотопечать" по имени
  const noDecorOption = cakeOptions.decorations.options.find(opt => opt.name === "Без декора");
  const photoPrintOption = cakeOptions.decorations.options.find(opt => opt.name === "Фотопечать");

  const [selectedDecor, setSelectedDecor] = useState([noDecorOption?.id]);
  const [photoFile, setPhotoFile] = useState(null);

  useEffect(() => {
    // Инициализируем с "Без декора", если он есть в опциях
    const initialDecor = noDecorOption ? [noDecorOption.id] : [];
    setSelectedDecor(initialDecor);
    updateCakeData({ decorations: initialDecor });
  }, [noDecorOption]);

  const handleDecorChange = (id) => {
    const isNoDecor = id === noDecorOption?.id;
    const isPhotoPrint = id === photoPrintOption?.id;

    let newSelection;

    if (isNoDecor) {
      // При выборе "Без декора" сбрасываем все остальное
      newSelection = [id];
      setPhotoFile(null);
    } else {
      if (selectedDecor.includes(id)) {
        // Удаляем элемент из выбранных
        newSelection = selectedDecor.filter(item => item !== id);
        if (isPhotoPrint) setPhotoFile(null);

        // Если ничего не выбрано и есть "Без декора", выбираем его
        if (newSelection.length === 0 && noDecorOption) {
          newSelection = [noDecorOption.id];
        }
      } else {
        // Добавляем элемент, убираем "Без декора" если он был выбран
        newSelection = [
          ...selectedDecor.filter(item => item !== noDecorOption?.id),
          id
        ];
      }
    }

    setSelectedDecor(newSelection);
    updateCakeData({
      decorations: newSelection,
      decorationPhoto: newSelection.includes(photoPrintOption?.id) ? photoFile : null
    });
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhotoFile(file);
      updateCakeData({ decorationPhoto: file });
    }
  };

  return (
    <div className="step-three">
      <div className="param__group">
        <label className='label__title'>Декор</label>
        <div className="checkbox">
          {cakeOptions.decorations.options.map(option => (
            <div key={option.id} className="checkbox__param">
              <input
                type="checkbox"
                id={`decor-${option.id}`}
                checked={selectedDecor.includes(option.id)}
                onChange={() => handleDecorChange(option.id)}
                disabled={option.name === "Без декора" && selectedDecor.length === 1 && selectedDecor.includes(option.id)}
              />
              <label htmlFor={`decor-${option.id}`} className='checkbox__label'>
                {option.name} <span className='checkbox__extra'>{option.price && `+${option.price} ₽`}</span>
              </label>
            </div>
          ))}
        </div>

        {/* Блок для загрузки фото (только если выбрана фотопечать) */}
        {photoPrintOption && selectedDecor.includes(photoPrintOption.id) && (
          <div className="photo-upload">
            <img src={clip} alt="Прикрепить фото" />
            <input
              type="file"
              id="decoration-photo"
              accept="image/*"
              onChange={handlePhotoUpload}
              style={{ display: 'none' }}
            />
            <label htmlFor="decoration-photo" className="photo-upload__btn" alt='Заменить фото'>
              {photoFile ? (
                <>
                  <span>Фото выбрано: {photoFile.name}</span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setPhotoFile(null);
                      updateCakeData({ decorationPhoto: null });
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
        )}

        <label className="textarea">
          <textarea className="textarea__input"
            name="decor_msg"
            placeholder="Опишите ваши пожелания по декору"
            value={cakeData.decor_msg || ''}
            onChange={(e) => updateCakeData({ decor_msg: e.target.value })}
          />
          <button type="button" className="textarea__button">
            <img src={clip} alt="" />
            Прикрепить фото
          </button>
        </label>


      </div>
    </div>
  );
};

export default StepThree;