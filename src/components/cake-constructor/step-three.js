import React, { useEffect, useRef } from 'react';
import clip from "../../assets/img/main/clip.svg";
import { useCakeConstructor } from '../../hooks/useCakeConstructor';

const StepThree = ({ nextStep, prevStep }) => {
    const { cakeData, updateCakeData, decorItems, isLoading, error } = useCakeConstructor();
    const noDecorOption = decorItems.find(opt => opt.name === "Без декора");
    const photoPrintOption = decorItems.find(opt => opt.name === "Фотопечать");
    const initialized = useRef(false);

    // Отладка
    console.log('StepThree - decorItems:', decorItems);
    console.log('StepThree - current cakeData:', cakeData);
    console.log('StepThree - noDecorOption:', noDecorOption);
    console.log('StepThree - photoPrintOption:', photoPrintOption);

    // Инициализация состояния
    useEffect(() => {
        if (initialized.current) return;
        initialized.current = true;

        // Если ничего не выбрано — ставим "Без декора"
        if (!cakeData.decor?.items?.length && noDecorOption) {
            console.log('Initializing with noDecorOption:', noDecorOption);
            updateCakeData(3, {
                decorItems: [{ id: parseInt(noDecorOption.id, 10), name: noDecorOption.name, price: parseFloat(noDecorOption.price) || 0 }],
                totalPrice: 0
            });
        }

        // Инициализация загруженного фото
        if (cakeData.decor?.fileObject instanceof File && !cakeData.decor?.printPhoto) {
            console.log('Initializing photo URL');
            const url = URL.createObjectURL(cakeData.decor.fileObject);
            updateCakeData(3, {
                printPhoto: url
            });
        }

        // Очистка URL при размонтировании
        return () => {
            if (cakeData.decor?.printPhoto) {
                console.log('Revoking photo URL');
                URL.revokeObjectURL(cakeData.decor.printPhoto);
            }
        };
    }, [noDecorOption, updateCakeData, cakeData.decor]);

    const calculateDecorPrice = (items) => {
        const price = items.reduce((sum, item) => sum + (parseFloat(item.price) || 0), 0);
        console.log('Calculated decor price:', price, 'for items:', items);
        return price;
    };

    const handleDecorChange = (id) => {
        const parsedId = parseInt(id, 10);
        const isNoDecor = parsedId === noDecorOption?.id;
        const isPhotoPrint = parsedId === photoPrintOption?.id;
        const selectedDecor = decorItems.find(opt => opt.id === parsedId);
        console.log('handleDecorChange - ID:', parsedId, 'Selected decor:', selectedDecor);

        if (!selectedDecor) {
            console.warn('No decor found for ID:', parsedId);
            return;
        }

        let newItems;

        if (isNoDecor) {
            // Выбор "Без декора" сбрасывает все декоры и фотопечать
            newItems = [{ id: parsedId, name: noDecorOption.name, price: parseFloat(noDecorOption.price) || 0 }];
            console.log('Selecting noDecor, newItems:', newItems);
            updateCakeData(3, {
                decorItems: newItems,
                photoPrint: false,
                printPhoto: null,
                fileObject: null,
                totalPrice: 0
            });
        } else {
            if (cakeData.decor.items.some(item => parseInt(item.id, 10) === parsedId)) {
                // Удаление декора
                newItems = cakeData.decor.items.filter(item => parseInt(item.id, 10) !== parsedId);
                console.log('Removing decor, newItems:', newItems);
                if (isPhotoPrint) {
                    updateCakeData(3, {
                        decorItems: newItems,
                        photoPrint: false,
                        printPhoto: null,
                        fileObject: null,
                        totalPrice: calculateDecorPrice(newItems)
                    });
                } else {
                    updateCakeData(3, {
                        decorItems: newItems,
                        totalPrice: calculateDecorPrice(newItems)
                    });
                }

                // Если ничего не выбрано, ставим "Без декора"
                if (!newItems.length && noDecorOption) {
                    newItems = [{ id: noDecorOption.id, name: noDecorOption.name, price: parseFloat(noDecorOption.price) || 0 }];
                    console.log('No items left, setting noDecor, newItems:', newItems);
                    updateCakeData(3, {
                        decorItems: newItems,
                        photoPrint: false,
                        printPhoto: null,
                        fileObject: null,
                        totalPrice: 0
                    });
                }
            } else {
                // Добавление декора, исключаем "Без декора"
                newItems = [
                    ...cakeData.decor.items.filter(item => parseInt(item.id, 10) !== noDecorOption?.id),
                    { id: parsedId, name: selectedDecor.name, price: parseFloat(selectedDecor.price) || 0 }
                ];
                console.log('Adding decor, newItems:', newItems);
                updateCakeData(3, {
                    decorItems: newItems,
                    photoPrint: isPhotoPrint ? true : cakeData.decor.photoPrint,
                    fileObject: cakeData.decor.fileObject,
                    printPhoto: cakeData.decor.printPhoto,
                    totalPrice: calculateDecorPrice(newItems)
                });
            }
        }
    };

    const handlePhotoUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const photoUrl = URL.createObjectURL(file);
            const newItems = [
                ...cakeData.decor.items.filter(item => parseInt(item.id, 10) !== noDecorOption?.id),
                { id: photoPrintOption.id, name: photoPrintOption.name, price: parseFloat(photoPrintOption.price) || 0 }
            ];
            console.log('Uploading photo, newItems:', newItems, 'photoUrl:', photoUrl);
            updateCakeData(3, {
                decorItems: newItems,
                photoPrint: true,
                printPhoto: photoUrl,
                fileObject: file,
                totalPrice: calculateDecorPrice(newItems)
            });
        }
    };

    const handleRemovePhoto = (e) => {
        e.stopPropagation();
        const newItems = cakeData.decor.items.filter(item => parseInt(item.id, 10) !== photoPrintOption?.id);
        console.log('Removing photo, newItems:', newItems);
        updateCakeData(3, {
            decorItems: newItems.length === 0 && noDecorOption
                ? [{ id: noDecorOption.id, name: noDecorOption.name, price: parseFloat(noDecorOption.price) || 0 }]
                : newItems,
            photoPrint: false,
            printPhoto: null,
            fileObject: null,
            totalPrice: calculateDecorPrice(newItems.length === 0 && noDecorOption
                ? [{ id: noDecorOption.id, name: noDecorOption.name, price: parseFloat(noDecorOption.price) || 0 }]
                : newItems)
        });
    };

    return (
        <div className="step-three">
            <div className="param__group">
                <label className="label__title">Декор</label>
                {isLoading.decor ? (
                    <p>Загрузка...</p>
                ) : error.decor ? (
                    <p>Ошибка: {error.decor}</p>
                ) : (
                    <div className="checkbox">
                        {decorItems.map(option => (
                            <div key={option.id} className="checkbox__param">
                                <input
                                    type="checkbox"
                                    id={`decor-${option.id}`}
                                    checked={cakeData.decor.items.some(item => parseInt(item.id, 10) === option.id)}
                                    onChange={() => handleDecorChange(option.id)}
                                    disabled={option.name === "Без декора" && cakeData.decor.items.length === 1 && cakeData.decor.items.some(item => parseInt(item.id, 10) === option.id)}
                                />
                                <label htmlFor={`decor-${option.id}`} className="checkbox__label">
                                    {option.name} <span className="checkbox__extra">{option.price > 0 && `+${option.price} ₽`}</span>
                                </label>
                            </div>
                        ))}
                    </div>
                )}

                {cakeData.decor?.photoPrint && (
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
                            {cakeData.decor?.printPhoto ? (
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
                        value={cakeData.decor?.comment || ''}
                        onChange={(e) => {
                            console.log('Updating comment:', e.target.value);
                            updateCakeData(3, {
                                comment: e.target.value
                            });
                        }}
                    />
                </div>
            </div>

        </div>
    );
};

export default StepThree;