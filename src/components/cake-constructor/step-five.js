import React, { useState, useEffect } from 'react';
import { cakeOptions } from './cakeOptions';
import clip from "../../assets/img/main/clip.svg";

const StepFive = ({ cakeData, updateCakeData }) => {
    const [attachedFile, setAttachedFile] = useState(null);

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (file) setAttachedFile(file);
    };

    const removeFile = () => setAttachedFile(null);

    return (
        <form className="form form_constr">
            <div className="param__group">
                <div className="label__title">Когда и куда привезти</div>

                <div className="form__wrapper">
                    <label>
                        <input type="datetime-local" name="date" required />
                    </label>

                    <label>
                        <input type="text" name="adres" placeholder="Адрес доставки *" required />
                    </label>
                </div>

            </div>

            <div className="param__group">
                <div className="label__title">Для связи</div>
                <div className="form__wrapper">

                    <label>
                        <input type="text" name="name" placeholder="Ваше имя *" required />
                    </label>

                    <label>
                        <input type="email" name="email" placeholder="Ваш email" required />
                    </label>

                    <label>
                        <input type="tel" name="phone" placeholder="Ваш телефон *" required />
                    </label>

                </div>

                <label className="form__textarea-wrapper">
                    <textarea name="message" placeholder="Комментарий к заказу" />
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
