import React, { useEffect } from 'react';
import { cakeOptions } from '../../api/cakeOptions';
import clip from "../../assets/img/main/clip.svg";
import useCakeConstructor from '../../hooks/useCakeConstructor';

const StepThree = ({ nextStep, prevStep }) => {
  const { cakeData, updateCakeData } = useCakeConstructor();
  const noDecorOption = cakeOptions.decorations.options.find(opt => opt.name === "Без декора");
  const photoPrintOption = cakeOptions.decorations.options.find(opt => opt.name === "Фотопечать");

  // Инициализация состояния из cakeData
  useEffect(() => {
  // Если ничего не выбрано — ставим "без декора"
  if (cakeData.decorations?.items?.length === 0 && noDecorOption) {
    updateCakeData(prev => ({
      ...prev,
      decorations: {
        ...prev.decorations,
        items: [noDecorOption.id]
      }
    }));
  }

  if (
  cakeData.decorations?.fileObject instanceof File &&
  !cakeData.decorations?.printPhoto
) {
  const url = URL.createObjectURL(cakeData.decorations.fileObject);
  updateCakeData(prev => ({
    ...prev,
    decorations: {
      ...prev.decorations,
      printPhoto: url
    }
  }));
}
}, []);

  const handleDecorChange = (id) => {
    const isNoDecor = id === noDecorOption?.id;
    const isPhotoPrint = id === photoPrintOption?.id;

    let newSelection;

    if (isNoDecor) {
      newSelection = [id];
      updateCakeData({
        decorations: {
          items: newSelection,
          photoPrint: false,
          printPhoto: null,
          fileObject: null
        }
      });
    } else {
      if (cakeData.decorations.items.includes(id)) {
        newSelection = cakeData.decorations.items.filter(item => item !== id);
        if (isPhotoPrint) {
          updateCakeData({
            decorations: {
              ...cakeData.decorations,
              items: newSelection,
              photoPrint: false,
              printPhoto: null,
              fileObject: null
            }
          });
        } else {
          updateCakeData({
            decorations: {
              ...cakeData.decorations,
              items: newSelection
            }
          });
        }

        if (newSelection.length === 0 && noDecorOption) {
          newSelection = [noDecorOption.id];
          updateCakeData({
            decorations: {
              items: newSelection,
              photoPrint: false,
              printPhoto: null,
              fileObject: null
            }
          });
        }
      } else {
        newSelection = [
          ...cakeData.decorations.items.filter(item => item !== noDecorOption?.id),
          id
        ];
        updateCakeData({
          decorations: {
            ...cakeData.decorations,
            items: newSelection,
            photoPrint: isPhotoPrint ? true : cakeData.decorations.photoPrint,
            fileObject: cakeData.decorations.fileObject,
            printPhoto: cakeData.decorations.printPhoto
          }
        });
      }
    }
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const photoUrl = URL.createObjectURL(file);
      updateCakeData({
        decorations: {
          ...cakeData.decorations,
          printPhoto: photoUrl,
          fileObject: file,
          photoPrint: true
        }
      });
    }
  };

  const handleRemovePhoto = (e) => {
    e.stopPropagation();
    updateCakeData({
      decorations: {
        ...cakeData.decorations,
        printPhoto: null,
        fileObject: null,
        photoPrint: false
      }
    });

    // Также убираем выбор опции фотопечати, если была выбрана
    if (cakeData.decorations.items.includes(photoPrintOption?.id)) {
      handleDecorChange(photoPrintOption.id);
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
                checked={cakeData.decorations.items.includes(option.id)}
                onChange={() => handleDecorChange(option.id)}
                disabled={option.name === "Без декора" && cakeData.decorations.items.length === 1 && cakeData.decorations.items.includes(option.id)}
              />
              <label htmlFor={`decor-${option.id}`} className='checkbox__label'>
                {option.name} <span className='checkbox__extra'>{option.price && `+${option.price} ₽`}</span>
              </label>
            </div>
          ))}
        </div>

        {cakeData.decorations.photoPrint && (
          <div className="photo-upload">
            <img src={clip} alt="Прикрепить фото" />
            <input
              type="file"
              id="decoration-photo"
              accept="image/*"
              onChange={handlePhotoUpload}
              style={{ display: 'none' }}
            />
            <label htmlFor="decoration-photo" className="photo-upload__btn">
              {cakeData.decorations.printPhoto ? (
                <>
                  <span>Фото выбрано</span>
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
        )}

        <div className="textarea">
          <textarea
            className="textarea__input"
            placeholder="Опишите ваши пожелания по декору"
            value={cakeData.decorations.comment || ''}
            onChange={(e) => updateCakeData({
              decorations: {
                ...cakeData.decorations,
                comment: e.target.value
              }
            })}
          />
        </div>
      </div>


    </div>
  );
};

export default StepThree;