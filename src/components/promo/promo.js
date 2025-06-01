import './promo.scss';
import ButtonBig from '../button-big/button-big';
import { useNavigate } from 'react-router-dom';

const textForButton = "Заказать";

const Promo = ({ cartItems }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (!cartItems || cartItems.length === 0) {
      navigate('/products');
    } else {
      const footer = document.getElementById('footer');
      if (footer) {
        footer.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section className="promo">
      <div className="promo__bg"></div>
      <div className="container">
        <div className="promo__inner">
          <h1 className="promo__title">Для самых<br /> особенных <br />моментов</h1>
          <p className="promo__subtitle">Торты и десерты на заказ, которые запоминаются.</p>
          <ButtonBig btnText={textForButton} onClick={handleClick} />
        </div>
      </div>
    </section>
  );
};

export default Promo;
