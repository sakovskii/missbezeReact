import React from "react";
import "./cart.scss";

const Cart = ({ isOpen, cartItems, onClose, updateQuantity, removeItem, clearCart }) => {
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <>
      <div className={`cart-overlay ${isOpen ? "active" : ""}`} onClick={onClose}></div>
      <aside className={`cart ${isOpen ? "cart_open" : ""}`}>
        <div className="cart__header">
          <h3>Корзина</h3>
          <button className="cart__clear" onClick={clearCart}>Очистить</button>
        </div>

        <div className="cart__items">
          {cartItems.length > 0 ? (
            cartItems.map(item => (
              <div className="cart__item" key={item.id}>
                <img src={`http://miss-beze.local${item.image}`} alt={item.name} className="cart__item-img" />
                <div className="cart__item-info">
                  <p className="cart__item-name">{item.name}</p>
                  <p className="cart__item-price">{(item.price * item.quantity).toLocaleString('ru-RU')} ₽</p>
                  <div className="cart__item-wrapper">
                    <div className="cart__item-quantity">
                      <button 
                        className="cart__item-qbtn" 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        -
                      </button>
                      <p className="cart__item-qty">{item.quantity}</p>
                      <button 
                        className="cart__item-qbtn" 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                    <button 
                      className="cart__item-remove" 
                      onClick={() => removeItem(item.id)}
                    >
                      Убрать
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="cart__empty">Корзина пуста</p>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="cart__footer">
            <div className="cart__total">Итого: {total.toLocaleString('ru-RU')} ₽</div>
            <button className="cart__checkout">К оформлению</button>
          </div>
        )}
      </aside>
    </>
  );
};

export default Cart;