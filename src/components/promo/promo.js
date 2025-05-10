import './promo.scss';
import ButtonBig from '../button-big/button-big';

const textForButton = "Заказать";

const Promo = () => {
  return (
      <section
        className="promo">
          <div className="promo__bg"></div>
        <div className="container">
          <div className="promo__inner">
            
            <h1 className="promo__title">Для самых<br /> особенных <br />моментов</h1>
            <p className="promo__subtitle">Торты и десерты на заказ, которые запоминаются.</p>
            <ButtonBig btnText={textForButton}/>
          </div>
        </div>
      </section>
  );
};

export default Promo;