export const cakeOptions = {
    tiers: {
        title: "Количество ярусов",
        type: "dropdown",
        options: [
            { id: 1, name: "1 ярус", value: 1 },
            { id: 2, name: "2 яруса", value: 2 },
            { id: 3, name: "3 яруса", value: 3 }
        ]
    },

    shapes: {
        title: "Форма торта",
        type: "dropdown",
        options: [
            { id: 1, name: "Круг"},
            { id: 2, name: "Квадрат"},
            { id: 3, name: "Прямоугольник"}
        ]
    },

    fillings: {
        title: "Начинка",
        type: "dropdown",
        options: [
            { id: 1, name: "Клубничная",  descr: "lorem", visible: true},
            { id: 2, name: "Шоколадная", descr: "lorem", visible: true},
            { id: 3, name: "Птичье молоко",  descr: "lorem", visible: true},
            { id: 4, name: "Фисташка", descr: "lorem", visible: true},
            { id: 5, name: "Клубничная",  descr: "lorem", visible: true},
            { id: 6, name: "Шоколадная", descr: "lorem", visible: true}
        ]
    },

    coatings: {
        title: "Покрытие",
        type: "dropdown",
        options: [
            { id: 1, name: "Шоколадное",  descr: "lorem", price: 50, visible: true},
            { id: 2, name: "Мастика", descr: "lorem", price: 50, visible: true},
            { id: 3, name: "Мастика2",  descr: "lorem", price: 50, visible: true},
            { id: 4, name: "Мастика3", descr: "lorem", price: 50, visible: true},
            { id: 5, name: "Мастика4",  descr: "lorem", price: 50, visible: true},
            { id: 6, name: "Мастика5", descr: "lorem", price: 50, visible: true} 
        ]
    },

    decorations: {
        title: "Декор",
        type: "checkbox",
        options: [
            { id: 1, name: "Без декора", price: 100, visible: true },
            { id: 2, name: "Свежие ягоды", price: 200, visible: true },
            { id: 3, name: "Кремовая надпись", price: 300, visible: true },
            { id: 4, name: "Безе/леденцы", price: 100, visible: true },
            { id: 5, name: "Живые цветы", price: 200, visible: true },
            { id: 6, name: "Фигурка из мастики", price: 300, visible: true },
            { id: 7, name: "Фотопечать", price: 400, visible: true },
        ]
    }
};