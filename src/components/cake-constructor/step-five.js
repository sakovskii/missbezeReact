import React, { useState, useEffect } from 'react';
import clip from "../../assets/img/main/clip.svg";

const StepFive = ({ cakeData, updateCakeData }) => {
  const formData = cakeData?.formData || {};
  const [attachedFile, setAttachedFile] = useState(formData.attachedFile || null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    updateCakeData({
      ...cakeData,
      formData: {
        ...formData,
        [name]: value
      }
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setAttachedFile(file);
      updateCakeData({
        ...cakeData,
        formData: {
          ...formData,
          attachedFile: file
        }
      });
    }
  };

  const removeFile = () => {
    setAttachedFile(null);
    updateCakeData({
      ...cakeData,
      formData: {
        ...formData,
        attachedFile: null
      }
    });
  };

  return (
    <form className="form form_constr">
      <div className="param__group">
        <div className="label__title">Когда и куда привезти</div>

        <div className="form__wrapper">
          <label>
            <input
              type="datetime-local"
              name="date"
              required
              value={formData.date || ''}
              onChange={handleInputChange}
            />
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
          </label>

          <label>
            <input
              type="email"
              name="email"
              placeholder="Ваш email"
              required
              value={formData.email || ''}
              onChange={handleInputChange}
            />
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
          </label>
        </div>

        <label className="form__textarea-wrapper">
          <textarea
            name="message"
            placeholder="Комментарий к заказу"
            value={formData.message || ''}
            onChange={handleInputChange}
          />
          <input
            type="file"
            id="fileUpload"
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
          <label htmlFor="fileUpload" className="attach-button">
            <img src={clip} alt="скрепка" />
            {attachedFile ? (
              <>
                <span>{attachedFile.name}</span>
                <button type="button" className="remove-btn" onClick={removeFile}>
                  ×
                </button>
              </>
            ) : (
              "Прикрепить фото"
            )}
          </label>
        </label>
      </div>
    </form>
  );
};

export default StepFive;
