import "./footer.scss";
import "./warning.scss";
import vkLogo from "../../assets/img/main/vk_logo.svg";
import whatsApp from "../../assets/img/main/whatsup_logo.svg";
import clip from "../../assets/img/main/clip.svg";

const Footer = ({ cartItems }) => {
  const totalPrice = cartItems?.length
    ? cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
    : 0;

  return (
    <footer className="order" id="footer">
      <div className="container">
        <div className="title title_right">Оставить заявку</div>
        <div className="order__wrapper">
          <div className="order__contacts">
            <div className="order__subtitle">Контакты</div>
            <a href="tel:89069798901" className="order__contact">+7 (906) 979-89-01</a>
            <br />
            <a href="mailto:marina@missbese.ru" className="order__contact">marina@missbese.ru</a>
            <div className="order__media">
              <a href="" className="order__social"><img src={vkLogo} alt="" /></a>
              <a href="" className="order__social"><img src={whatsApp} alt="" /></a>
            </div>
          </div>

          <form className="form">
            <div className="order__subtitle">Заполните форму</div>
            <div className="form__wrapper">
              <label><input type="datetime-local" name="date" required /></label>
              <label><input type="text" name="adres" placeholder="Адрес доставки *" required /></label>
              <label><input type="text" name="name" placeholder="Ваше имя *" required /></label>
              <label><input type="email" name="email" placeholder="Ваш email" required /></label>
              <label><input type="tel" name="phone" placeholder="Ваш телефон *" required /></label>
            </div>

            <textarea name="message" placeholder="Комментарий к заказу" />

            <div className="form__bottom">
              <div className="form__left">
                <div className="price">
                  {totalPrice > 0 ? (
                    <>Цена — <span>{totalPrice.toLocaleString('ru-RU')}</span> ₽</>
                  ) : (
                    <>Добавьте товары в корзину.</>
                  )}
                </div>
                <p className="warning warning_11px">
                  <span className="warning_red">Важно!</span> Обязательно предупреждайте об аллергических реакциях на любые компоненты начинок или декора для исключения их из состава.
                </p>
              </div>
              <div className="form__right">
                <button type="submit" className="btn btn_form">Отправить</button>
                <p>Отправляя форму, я даю согласие на обработку <span>персональных данных</span>.</p>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="footer__line"></div>
    </footer>
  );
};

export default Footer;
