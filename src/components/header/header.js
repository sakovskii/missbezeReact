import React, { useState } from "react";
import './header.scss';
import NavMenu from '../nav-menu/nav-menu';
import HamburgerMenu from '../hamburger-menu/hamburger-menu';
import logo from '../../assets/img/main/missbese_logo.svg';
import cartSVG from '../../assets/img/main/cart.svg';
import Cart from '../cart/cart';

const Header = ({ 
    cartItems, 
    updateCartItemQuantity, 
    removeFromCart, 
    clearCart 
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(prev => !prev);
  const closeMenu = () => setMenuOpen(false);
  const toggleCart = () => setCartOpen(prev => !prev);

  return (
    <>
      <header className="header">
        <HamburgerMenu isActive={menuOpen} onClick={toggleMenu} />

        <div className="header__wrapper">
          <div className="header__logo">
            <a href="#" className="header__img"><img src={logo} alt="Логотип Мисс Безе" /></a>
          </div>

          <div className="container">
            <NavMenu isOpen={menuOpen} closeMenu={closeMenu} />
          </div>

          <div className="header__inner">
            <button className='header__cartbtn' onClick={toggleCart}>
              <img src={cartSVG} alt="Корзина" />
              {cartItems.length > 0 && (
                <span className="header__cart-counter">{cartItems.length}</span>
              )}
            </button>
            <div className="header__contacts">
              <a href="tel:+79069798901" className="header__phone">+7 (906) 979-89-01</a>
              <a href="mailto:marina@missbese.ru" className="header__email">marina@missbese.ru</a>
            </div>
          </div>
        </div>
      </header>

      <Cart
        isOpen={cartOpen}
        cartItems={cartItems}
        onClose={toggleCart}
        updateQuantity={updateCartItemQuantity}
        removeItem={removeFromCart}
        clearCart={clearCart}
      />
    </>
  );
};

export default Header;