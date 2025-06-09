import React, { useState, useEffect } from 'react';
import clip from "../../assets/img/main/clip.svg";
import { useCakeConstructor } from '../../hooks/useCakeConstructor';

const StepFive = ({ nextStep, prevStep }) => {
  const { cakeData, updateCakeData } = useCakeConstructor();
  const formData = cakeData?.data || {};
  const [attachedFile, setAttachedFile] = useState(formData.attachedFile || null);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log('Input change:', { name, value });
    updateCakeData(5, {
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log('File uploaded:', file);
      setAttachedFile(file);
      updateCakeData(5, {
        attachedFile: file
      });
    }
  };

  const removeFile = () => {
    console.log('Removing file');
    setAttachedFile(null);
    updateCakeData(5, {
      attachedFile: null
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.datetime) newErrors.datetime = 'Укажите дату и время';
    if (!formData.address) newErrors.address = 'Укажите адрес';
    if (!formData.name) newErrors.name = 'Укажите имя';
    if (!formData.phone) newErrors.phone = 'Укажите телефон';
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Некорректный email';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form validated, proceeding to next step');
      nextStep();
    } else {
      console.log('Form validation failed:', errors);
    }
  };

  // Отладка
  console.log('StepFive - current formData:', formData);

  return (
    <form className="form form_constr" onSubmit={handleSubmit}>
      <div className="param__group">
        <div className="label__title">Когда и куда привезти</div>
        <div className="form__wrapper">
          <label>
            <input
              type="datetime-local"
              name="datetime"
              required
              value={formData.datetime || ''}
              onChange={handleInputChange}
            />
            {errors.datetime && <span className="error">{errors.datetime}</span>}
          </label>

          <label>
            <input
              type="text"
              name="address"
              placeholder="Адрес доставки *"
              required
              value={formData.address || ''}
              onChange={handleInputChange}
            />
            {errors.address && <span className="error">{errors.address}</span>}
          </label>
        </div>
      </div>

      <div className="param__group">
        <div className="label__title">Для связи</div>
        <div className="form__wrapper">
          <label>
            <input
              type="text"
              name="name"
              placeholder="Ваше имя *"
              required
              value={formData.name || ''}
              onChange={handleInputChange}
            />
            {errors.name && <span className="error">{errors.name}</span>}
          </label>

          <label>
            <input
              type="email"
              name="email"
              placeholder="Ваш email"
              value={formData.email || ''}
              onChange={handleInputChange}
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </label>

          <label>
            <input
              type="tel"
              name="phone"
              placeholder="Ваш телефон *"
              required
              value={formData.phone || ''}
              onChange={handleInputChange}
            />
            {errors.phone && <span className="error">{errors.phone}</span>}
          </label>
        </div>

        <label className="form__textarea-wrapper">
          <textarea
            name="comment"
            placeholder="Комментарий к заказу"
            value={formData.comment || ''}
            onChange={handleInputChange}
          />
        </label>
      </div>

      
    </form>
  );
};

export default StepFive;