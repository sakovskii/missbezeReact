// hooks/useCakeConstructor.js
import { useState, useEffect } from 'react';

const useCakeConstructor = () => {
  const [cakeData, setCakeData] = useState(() => {
    // Пытаемся загрузить данные из localStorage при инициализации
    const savedData = localStorage.getItem('cakeConstructorData');
    return savedData ? JSON.parse(savedData) : {
      form: null,
      tiers: 1,
      weight: null,
      filling: {
        id: null,
        comment: ''
      },
      coating: {
        id: null,
        comment: ''
      },
      decorations: {
        items: [],
        photoPrint: false,
        printPhoto: null,
        comment: ''
      },
      reference: {
        type: null, // 'example' или 'custom'
        id: null, // для примеров
        file: null, // для кастомного фото
      },
      price: 0
    };
  });

  // Сохраняем данные в localStorage при каждом изменении
  useEffect(() => {
    localStorage.setItem('cakeConstructorData', JSON.stringify(cakeData));
  }, [cakeData]);

  const updateCakeData = (newData) => {
    setCakeData(prev => ({
      ...prev,
      ...newData
    }));
  };

  const resetCakeData = () => {
    setCakeData({
      form: null,
      tiers: 1,
      weight: null,
      filling: {
        id: null,
        comment: ''
      },
      coating: {
        id: null,
        comment: ''
      },
      decorations: {
        items: [],
        photoPrint: false,
        printPhoto: null,
        comment: ''
      },
      reference: {
        type: null,
        id: null,
        file: null,
      },
      price: 0
    });
    localStorage.removeItem('cakeConstructorData');
  };

  return { cakeData, updateCakeData, resetCakeData };
};

export default useCakeConstructor;