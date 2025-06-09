import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductsSlider from "../products/productsSlider";
import Header from "../header/header";
import Promo from "../promo/promo";
import AboutConstructor from "../about-constuctor/about-constuctor";
import FAQ from "../questians-list/questians-list";
import Footer from "../footer/footer";
import Reviews from "../reviews/reviews";
import CakeConstructor from "../cake-constructor/cake-constructor";
import DeliveryModal from "../delivery/deliveryModal";
import AboutPage from "../about-us/about-us";
import ProductsPage from "../products-page/products-page";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./app.scss";
import { CakeConstructorProvider } from '../../hooks/useCakeConstructor.js';

function App() {
    const [products, setProducts] = useState({ cakes: [], deserts: [] });
    const [loading, setLoading] = useState(true);

    const [cartItems, setCartItems] = useState(() => {
        const savedCart = localStorage.getItem("cart");
        return savedCart ? JSON.parse(savedCart) : [];
    });

    const [deliveryOpen, setDeliveryOpen] = useState(false);
    const openDeliveryModal = () => setDeliveryOpen(true);
    const closeDeliveryModal = () => setDeliveryOpen(false);

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cartItems));
    }, [cartItems]);

    // Загружаем продукты
    useEffect(() => {
        fetch("http://miss-beze.local/backend/api/get-products.php")
            .then((res) => res.json())
            .then((data) => {
                const normalizedData = data.map(product => ({
                    id: product.id,
                    name: product.name,
                    descr: product.descr,
                    price: product.price,
                    category: product.category,
                    imgPath: product.img_path, // Явно преобразуем snake_case в camelCase
                    visible: product.visible
                }));

                const cakes = normalizedData.filter(p => p.category === "cakes");
                const deserts = normalizedData.filter(p => p.category === "deserts");
                setProducts({ cakes, deserts });
                setLoading(false);
            })
            .catch((error) => {
                console.error("Ошибка загрузки продуктов:", error);
                setLoading(false);
            });
    }, []);


    const addToCart = (product, productType) => {
        setCartItems((prevItems) => {
            const existingItem = prevItems.find(
                (item) => item.productId === product.id && item.productType === productType
            );

            if (existingItem) {
                return prevItems.map((item) =>
                    item.productId === product.id && item.productType === productType
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                return [
                    ...prevItems,
                    {
                        id: Date.now(),
                        productType,
                        productId: product.id,
                        name: product.name,
                        price: product.price,
                        quantity: 1,
                        image: product.imgPath || product.img_path,
                    },
                ];
            }
        });
    };

    const updateCartItemQuantity = (id, newQuantity) => {
        if (newQuantity < 1) {
            removeFromCart(id);
            return;
        }

        setCartItems((prevItems) =>
            prevItems.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item))
        );
    };

    const removeFromCart = (id) => {
        setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
    };

    const clearCart = () => {
        setCartItems([]);
    };

    if (loading) return <div className="loading">Загрузка...</div>;

    return (
        <Router>
            <div className="app">
                <Header
                    cartItems={cartItems}
                    updateCartItemQuantity={updateCartItemQuantity}
                    removeFromCart={removeFromCart}
                    clearCart={clearCart}
                    openDeliveryModal={openDeliveryModal}
                />

                <Routes>
                    <Route
                        path="/"
                        element={
                            <>
                                <Promo cartItems={cartItems} />
                                <AboutConstructor />
                                <ProductsSlider
                                    products={products.cakes}
                                    title="Мои торты"
                                    productType="cake"
                                    addToCart={addToCart}
                                />
                                <ProductsSlider
                                    products={products.deserts}
                                    title="Мои десерты"
                                    productType="desert"
                                    addToCart={addToCart}
                                />
                                <Reviews />
                                <FAQ />
                                <Footer cartItems={cartItems} />
                            </>
                        }
                    />
                    <Route path="/products" element={<ProductsPage products={products} addToCart={addToCart} />} />
                    {/* <Route path="/constructor" element={<CakeConstructor products={products}/>} /> */}
                    <Route
                        path="/constructor"
                        element={
                            <CakeConstructorProvider>
                                <CakeConstructor products={products} />
                            </CakeConstructorProvider>
                        }
                    />
                    <Route path="/about" element={<AboutPage />} />
                </Routes>
                <DeliveryModal isOpen={deliveryOpen} onClose={closeDeliveryModal} />
            </div>
        </Router>
    );
}

export default App;
