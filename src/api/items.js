const products = {
    cakes: [],
    deserts: []
};

fetch('http://miss-beze.local/backend/api/get-products.php')
    .then(response => response.json())
    .then(data => {
        data.forEach(product => {
            const item = {
                id: product.id,
                name: product.name,
                dopText: product.dopText,
                descr: product.descr,
                imgPath: product.imgPath,
                price: product.price,
                visible: Boolean(product.visible)
            };

            if (product.category === 'cakes') {
                products.cakes.push(item);
            } else if (product.category === 'deserts') {
                products.deserts.push(item);
            }
        });

        console.log(products); // Проверка
    })
    .catch(error => {
        //console.error('Ошибка при получении продуктов:', error);
    });

export default products; 


