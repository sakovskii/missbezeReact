import { NavLink, Link } from 'react-router-dom';
import './nav-menu.scss';

const NavMenu = ({ isOpen, closeMenu, openDeliveryModal }) => {
  const handleContactsClick = (e) => {
    e.preventDefault();
    closeMenu();
    document.getElementById('footer').scrollIntoView({ behavior: 'smooth' });
  };

  const handleDeliveryClick = (e) => {
    e.preventDefault();
    closeMenu();
    openDeliveryModal();
  };

  return (
    <nav className={`nav ${isOpen ? 'nav__active' : ''}`}>
      <ul className="nav__list">
        <li className="nav__item">
          <NavLink 
            to="/" 
            end 
            className="nav__link" 
            onClick={closeMenu}
          >
            Главная
          </NavLink>
        </li>
        <li className="nav__item">
          <NavLink 
            to="/products" 
            className="nav__link" 
            onClick={closeMenu}
          >
            Продукция
          </NavLink>
        </li>
        <li className="nav__item">
          <NavLink 
            to="/constructor" 
            className="nav__link" 
            onClick={closeMenu}
          >
            Конструктор тортов
          </NavLink>
        </li>
        <li className="nav__item">
          <NavLink 
            to="/about" 
            className="nav__link" 
            onClick={closeMenu}
          >
            О нас
          </NavLink>
        </li>
        <li className="nav__item">
          <a 
            href="#delivery" 
            className="nav__link" 
            onClick={handleDeliveryClick}
          >
            Доставка и оплата
          </a>
        </li>
        <li className="nav__item">
          <a 
            href="#footer" 
            className="nav__link" 
            onClick={handleContactsClick}
          >
            Контакты
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default NavMenu;