// hooks/useCakeConstructor.js
import { useState, useEffect } from 'react';

const useCakeConstructor = () => {
  const [cakeData, setCakeData] = useState(() => {
    const savedData = localStorage.getItem('cakeConstructorData');
    return savedData ? JSON.parse(savedData) : getDefaultData();
  });

  const [decorItems, setDecorItems] = useState([]);
  const [fillings, setFillings] = useState([]);
  const [coatings, setCoatings] = useState([]);
  const [isLoading, setIsLoading] = useState({
    decor: false,
    fillings: false,
    coatings: false
  });
  const [error, setError] = useState({
    decor: null,
    fillings: null,
    coatings: null
  });

  // Fetch decor items
  useEffect(() => {
    const fetchDecorItems = async () => {
      setIsLoading(prev => ({ ...prev, decor: true }));
      try {
        const response = await fetch('http://localhost/путь_до_php/get_decor_items.php');
        const data = await response.json();
        setDecorItems(data);
        setError(prev => ({ ...prev, decor: null }));
      } catch (err) {
        setError(prev => ({ ...prev, decor: err.message }));
      } finally {
        setIsLoading(prev => ({ ...prev, decor: false }));
      }
    };

    fetchDecorItems();
  }, []);

  // Fetch fillings
  useEffect(() => {
    const fetchFillings = async () => {
      setIsLoading(prev => ({ ...prev, fillings: true }));
      try {
        const response = await fetch('http://miss-beze.local/backend/api/get_fillings.php');
        const data = await response.json();
        setFillings(data);
        setError(prev => ({ ...prev, fillings: null }));
      } catch (err) {
        setError(prev => ({ ...prev, fillings: err.message }));
      } finally {
        setIsLoading(prev => ({ ...prev, fillings: false }));
      }
    };

    fetchFillings();
  }, []);

  // Fetch coatings
  useEffect(() => {
    const fetchCoatings = async () => {
      setIsLoading(prev => ({ ...prev, coatings: true }));
      try {
        const response = await fetch('http://miss-beze.local/backend/api/get_coatings.php');
        const data = await response.json();
        setCoatings(data);
        setError(prev => ({ ...prev, coatings: null }));
      } catch (err) {
        setError(prev => ({ ...prev, coatings: err.message }));
      } finally {
        setIsLoading(prev => ({ ...prev, coatings: false }));
      }
    };

    fetchCoatings();
  }, []);

  // Сохраняем данные в localStorage при каждом изменении
  useEffect(() => {
    const dataForStorage = {
      ...cakeData,
      reference: {
        ...cakeData.reference,
        file: null // Не сохраняем файл
      },
      decorations: {
        ...cakeData.decorations,
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

  return { 
    cakeData, 
    updateCakeData, 
    resetCakeData,
    decorItems,
    fillings,
    coatings,
    isLoading,
    error
  };
};

const getDefaultData = () => ({
  form: 1,
  tiers: 1,
  weight: null,
  filling: {
    id: null,
    name: '',
    cakeColor: '#E9C57C',
    creamColor: '#FFFFFF',
    comment: ''
  },
  coating: {
    id: null,
    name: '',
    color: '#FFFFFF',
    comment: ''
  },
  decorations: {
    items: [],
    photoPrint: false,
    printPhoto: null,
    comment: ''
  },
  reference: {
    id: null,
    file: null,
  },
  price: 0
});

export default useCakeConstructor;