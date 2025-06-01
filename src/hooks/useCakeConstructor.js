// hooks/useCakeConstructor.js
import { useState, useEffect } from 'react';

const useCakeConstructor = () => {
  const [cakeData, setCakeData] = useState(() => {
    const savedData = localStorage.getItem('cakeConstructorData');
    return savedData ? JSON.parse(savedData) : getDefaultData();
  });

  // Сохраняем данные в localStorage при каждом изменении
  useEffect(() => {
    // Не сохраняем файлы в localStorage (они не сериализуются)
    const { reference, decorations, ...dataToSave } = cakeData;

    const dataForStorage = {
      ...dataToSave,
      reference: {
        ...reference,
        file: null // Не сохраняем файл
      },
      decorations: {
        ...decorations,
        printPhoto: null // Не сохраняем фото
      }
    };

    localStorage.setItem('cakeConstructorData', JSON.stringify(dataForStorage));
  }, [cakeData]);

  const updateCakeData = (newData) => {
    setCakeData(prev => ({
      ...prev,
      ...newData
    }));
  };

  const resetCakeData = () => {
    setCakeData(getDefaultData());
    localStorage.removeItem('cakeConstructorData');
  };

  return { cakeData, updateCakeData, resetCakeData };
};

// Вынесено в отдельную функцию для повторного использования
const getDefaultData = () => ({
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

export default useCakeConstructor;