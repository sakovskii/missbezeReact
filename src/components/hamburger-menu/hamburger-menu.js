import './hamburger-menu.scss';

const HamburgerMenu = ({ isActive, onClick }) => {

    return <div className={`hamburger ${isActive ? 'hamburger__active' : ''}`}
    onClick={onClick}>
        <span></span>
        <span></span>
        <span></span>
    </div>
}

export default HamburgerMenu;