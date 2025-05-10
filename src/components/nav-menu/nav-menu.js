import './nav-menu.scss';


const NavMenu = ({ isOpen, closeMenu }) => {
  return (
    <nav className={`nav ${isOpen ? 'nav__active' : ''}`}>
          <ul className="nav__list">
          <li className="nav__item"><a href="#" className="nav__link">Главная</a></li>
            <li className="nav__item"><a href="#" className="nav__link">Продукция</a></li>
            <li className="nav__item"><a href="#" className="nav__link">Конструктор тортов</a></li>
            <li className="nav__item"><a href="#" className="nav__link">О нас</a></li>
            <li className="nav__item"><a href="#" className="nav__link">Доставка и оплата</a></li>
            <li className="nav__item"><a href="#" className="nav__link">Контакты</a></li>
          </ul>
        </nav>
  );
}; 

export default NavMenu;