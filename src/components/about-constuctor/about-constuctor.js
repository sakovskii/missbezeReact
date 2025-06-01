import "./about-constuctor.scss";
import ButtonBig from "../button-big/button-big";
import Subtitle from "../subtitle/subtitle";
import Title from "../title/title";
import cakeImage from '../../assets/img/main/about-constructor_cake.png';
import { useNavigate } from 'react-router-dom';

const textForButton = "Создать";
const subtitleText = "Преимущества:";

const AboutConstructor = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/constructor');
    };

    return (
        <section className="constructor">
            <div className="container">
                <div className="constructor__wrapper">
                    <div className="constructor__info">
                        <div className="btn__link">Конструктор тортов</div>
                        <h2 className="title">Создайте торт <br/> своей мечты!</h2>
                        <div className="constructor__descr">Хотите что-то особенное? <br/><br />
                            С нашим конструктором тортов вы сами выбираете вкус, начинку, оформление и даже размер!
                        </div>
                        <div className="constructor__advantages">
                            <Subtitle textSubtitle={subtitleText} />
                            <ul className="constructor__list">
                                <li className="constructor__item">
                                    <div className="constructor__text">Уникальный дизайн</div>
                                </li>
                                <li className="constructor__item">
                                    <div className="constructor__text">Профессиональное исполнение</div>
                                </li>
                                <li className="constructor__item">
                                    <div className="constructor__text">Для любого повода</div>
                                </li>
                                <li className="constructor__item">
                                    <div className="constructor__text">Быстро и удобно</div>
                                </li>
                            </ul>
                        </div>
                        <ButtonBig btnText={textForButton} onClick={handleClick} />
                    </div>
                    <div className="constructor__cake">
                        <div className="constructor__bg"></div>
                        <img src={cakeImage} alt="cake" className="constructor_img" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutConstructor;
