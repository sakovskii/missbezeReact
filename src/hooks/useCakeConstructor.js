import { useState, useEffect, useContext, createContext } from 'react';

// Класс CakeConstructor
class CakeConstructor {
    constructor() {
        this.defaultData = {
            tiers: 1,
            form: 'Круг',
            weight: 2.0,
            servings: 10,
            filling: { id: 1, name: '...', biscuit_color: '#FFFDD0', filling_color: '#FFFFFF', price: 0, comment: '' },
            coating: { id: 1, name: '...', color: '#FFFFFF', price: 0, comment: '' },
            decor: { items: [], photoPrint: false, printPhoto: null, fileObject: null, totalPrice: 0, comment: '' },
            reference: { id: 0, name: 'Без референса' },
            referenceImg: { path: '' },
            data: { 
                datetime: '', 
                address: '', 
                name: '', 
                email: '', 
                phone: '', 
                comment: '',
                attachedFile: null // Добавляем новое поле
            },
            totalPrice: 0
        };

        this.cakeData = this.loadFromLocalStorage() || { ...this.defaultData };
        // Нормализация id и price в decor.items после загрузки из localStorage
        if (this.cakeData.decor.items) {
            this.cakeData.decor.items = this.cakeData.decor.items.map(item => ({
                ...item,
                id: parseInt(item.id, 10),
                price: parseFloat(item.price) || 0
            }));
        }
        this.updateTotalPrice();
        this.logData();
    }

    loadFromLocalStorage() {
        try {
            const data = localStorage.getItem('cakeConstructorData');
            return data ? JSON.parse(data) : null;
        } catch (error) {
            console.error('Ошибка загрузки из localStorage:', error);
            return null;
        }
    }

    saveToLocalStorage() {
        try {
            localStorage.setItem('cakeConstructorData', JSON.stringify(this.cakeData));
        } catch (error) {
            console.error('Ошибка сохранения в localStorage:', error);
        }
    }

    updateStep1({ tiers, form, servings }) {
        this.cakeData.tiers = tiers || this.cakeData.tiers;
        this.cakeData.form = form || this.cakeData.form;
        this.cakeData.servings = servings || this.cakeData.servings;
        this.cakeData.weight = this.calculateWeight(this.cakeData.servings);
        this.updateTotalPrice();
        this.saveToLocalStorage();
        this.logData();
    }

    updateStep2({ filling, coating }) {
        if (filling) {
            this.cakeData.filling = { ...this.cakeData.filling, ...filling };
        }
        if (coating) {
            this.cakeData.coating = { ...this.cakeData.coating, ...coating };
        }
        this.updateTotalPrice();
        this.saveToLocalStorage();
        this.logData();
    }

    updateStep3({ decorItems, photoPrint, printPhoto, fileObject, comment, totalPrice }) {
        console.log('updateStep3 called with:', { decorItems, photoPrint, printPhoto, fileObject, comment, totalPrice });
        if (decorItems !== undefined) {
            this.cakeData.decor.items = decorItems.map(item => ({
                ...item,
                id: parseInt(item.id, 10),
                price: parseFloat(item.price) || 0
            }));
        }
        if (photoPrint !== undefined) {
            this.cakeData.decor.photoPrint = photoPrint;
        }
        if (printPhoto !== undefined) {
            this.cakeData.decor.printPhoto = printPhoto;
        }
        if (fileObject !== undefined) {
            this.cakeData.decor.fileObject = fileObject;
        }
        if (comment !== undefined) {
            this.cakeData.decor.comment = comment;
        }
        if (totalPrice !== undefined) {
            this.cakeData.decor.totalPrice = totalPrice;
        } else {
            this.cakeData.decor.totalPrice = this.calculateDecorPrice();
        }
        this.updateTotalPrice();
        this.saveToLocalStorage();
        this.logData();
    }

    updateStep4({ reference, referenceImg }) {
        if (reference) {
            this.cakeData.reference = reference;
        }
        if (referenceImg) {
            this.cakeData.referenceImg = referenceImg;
        }
        this.saveToLocalStorage();
        this.logData();
    }

    updateStep5({ datetime, address, name, email, phone, comment, attachedFile }) {
        this.cakeData.data = {
            datetime: datetime || this.cakeData.data.datetime,
            address: address || this.cakeData.data.address,
            name: name || this.cakeData.data.name,
            email: email || this.cakeData.data.email,
            phone: phone || this.cakeData.data.phone,
            comment: comment || this.cakeData.data.comment,
            attachedFile: attachedFile !== undefined ? attachedFile : this.cakeData.data.attachedFile // Обработка attachedFile
        };
        this.saveToLocalStorage();
        this.logData();
    }

    calculateWeight(servings) {
        const baseWeightPerServing = 0.2;
        return (servings * baseWeightPerServing).toFixed(1);
    }

    calculateDecorPrice() {
        const itemsPrice = this.cakeData.decor.items.reduce((sum, item) => sum + (item.price || 0), 0);
        console.log('calculateDecorPrice:', itemsPrice, 'items:', this.cakeData.decor.items);
        return itemsPrice;
    }

    updateTotalPrice() {
        this.cakeData.totalPrice = (
            (this.cakeData.filling.price || 0) +
            (this.cakeData.coating.price || 0) +
            this.cakeData.decor.totalPrice
        ).toFixed(2);
    }

    logData() {
        console.log('Текущие данные торта:', JSON.parse(JSON.stringify(this.cakeData)));
    }

    getCakeData() {
        return { ...this.cakeData };
    }

    reset() {
        this.cakeData = { ...this.defaultData };
        this.saveToLocalStorage();
        this.logData();
    }
}

const CakeConstructorContext = createContext();

export const CakeConstructorProvider = ({ children }) => {
    const [constructor] = useState(() => new CakeConstructor());
    const [cakeData, setCakeData] = useState(constructor.getCakeData());
    const [decorItems, setDecorItems] = useState([{ id: 0, name: 'Без декора', price: 0 }]);
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

    useEffect(() => {
        const fetchDecorItems = async () => {
            setIsLoading(prev => ({ ...prev, decor: true }));
            try {
                const response = await fetch('http://miss-beze.local/backend/api/get_decor_items.php');
                const data = await response.json();
                const normalizedData = data
                    .filter(item => item.visible === '1')
                    .map(item => ({
                        id: parseInt(item.id, 10),
                        name: item.name,
                        descr: item.descr,
                        price: parseFloat(item.price) || 0
                    }));
                console.log('Normalized decorItems:', normalizedData);
                setDecorItems(normalizedData.length > 0 ? normalizedData : [{ id: 0, name: 'Без декора', price: 0 }]);
                setError(prev => ({ ...prev, decor: null }));
            } catch (err) {
                console.error('Ошибка загрузки декора:', err);
                setError(prev => ({ ...prev, decor: err.message }));
                setDecorItems([{ id: 0, name: 'Без декора', price: 0 }]);
            } finally {
                setIsLoading(prev => ({ ...prev, decor: false }));
            }
        };

        const fetchFillings = async () => {
            setIsLoading(prev => ({ ...prev, fillings: true }));
            try {
                const response = await fetch('http://miss-beze.local/backend/api/get_fillings.php');
                const data = await response.json();
                const normalizedData = data.map(item => ({
                    id: parseInt(item.id, 10),
                    name: item.name,
                    biscuit_color: item.biscuit_color.startsWith('#') ? item.biscuit_color : `#${item.biscuit_color}`,
                    filling_color: item.filling_color.startsWith('#') ? item.filling_color : `#${item.filling_color}`,
                    price: parseFloat(item.price) || 0
                }));
                console.log('Normalized fillings:', normalizedData);
                setFillings(normalizedData);
                setError(prev => ({ ...prev, fillings: null }));
            } catch (err) {
                console.error('Ошибка загрузки начинок:', err);
                setError(prev => ({ ...prev, fillings: err.message }));
            } finally {
                setIsLoading(prev => ({ ...prev, fillings: false }));
            }
        };

        const fetchCoatings = async () => {
            setIsLoading(prev => ({ ...prev, coatings: true }));
            try {
                const response = await fetch('http://miss-beze.local/backend/api/get_coatings.php');
                const data = await response.json();
                const normalizedData = data.map(item => ({
                    id: parseInt(item.id, 10),
                    name: item.name,
                    color: item.color_code.startsWith('#') ? item.color_code : `#${item.color_code}`,
                    price: parseFloat(item.price) || 0
                }));
                console.log('Normalized coatings:', normalizedData);
                setCoatings(normalizedData);
                setError(prev => ({ ...prev, coatings: null }));
            } catch (err) {
                console.error('Ошибка загрузки покрытий:', err);
                setError(prev => ({ ...prev, coatings: err.message }));
            } finally {
                setIsLoading(prev => ({ ...prev, coatings: false }));
            }
        };

        fetchDecorItems();
        fetchFillings();
        fetchCoatings();
    }, []);

    const updateCakeData = (step, newData) => {
        console.log('updateCakeData called with step:', step, 'data:', newData);
        switch (step) {
            case 1:
                constructor.updateStep1(newData);
                break;
            case 2:
                constructor.updateStep2(newData);
                break;
            case 3:
                constructor.updateStep3(newData);
                break;
            case 4:
                constructor.updateStep4(newData);
                break;
            case 5:
                constructor.updateStep5(newData);
                break;
            default:
                console.warn('Unknown step:', step);
                break;
        }
        const newCakeData = constructor.getCakeData();
        console.log('Updating cakeData:', newCakeData);
        setCakeData(newCakeData);
    };

    const resetCakeData = () => {
        constructor.reset();
        const newCakeData = constructor.getCakeData();
        console.log('Resetting cakeData:', newCakeData);
        setCakeData(newCakeData);
        localStorage.removeItem('cakeConstructorData');
    };

    return (
        <CakeConstructorContext.Provider value={{
            cakeData,
            updateCakeData,
            resetCakeData,
            decorItems,
            fillings,
            coatings,
            isLoading,
            error
        }}>
            {children}
        </CakeConstructorContext.Provider>
    );
};

export const useCakeConstructor = () => {
    const context = useContext(CakeConstructorContext);
    if (!context) {
        console.error('useCakeConstructor must be used within a CakeConstructorProvider');
        throw new Error('useCakeConstructor must be used within a CakeConstructorProvider');
    }
    return context;
};