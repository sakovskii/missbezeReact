import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './about-us.scss';

import Cert1 from "../../assets/img/certificates/1b.png";
import Cert2 from "../../assets/img/certificates/2b.png";
import Cert3 from "../../assets/img/certificates/3b.png";
import Cert4 from "../../assets/img/certificates/4b.png";
import Cert5 from "../../assets/img/certificates/5b.png";

const AboutPage = () => {
    const certificates = [
        { id: 1, img: Cert1, alt: 'Сертификат кондитера' },
        { id: 2, img: Cert2, alt: 'Диплом кулинарной школы' },
        { id: 3, img: Cert3, alt: 'Сертификат мастер-класса' },
        { id: 4, img: Cert4, alt: 'Диплом кулинарной школы' },
        { id: 5, img: Cert5, alt: 'Сертификат мастер-класса' }
    ];

    const openFullscreen = (imgSrc) => {
        const fullscreenImg = document.createElement('div');
        fullscreenImg.style.position = 'fixed';
        fullscreenImg.style.top = '0';
        fullscreenImg.style.left = '0';
        fullscreenImg.style.width = '100vw';
        fullscreenImg.style.height = '100vh';
        fullscreenImg.style.backgroundColor = 'rgba(0,0,0,0.9)';
        fullscreenImg.style.display = 'flex';
        fullscreenImg.style.justifyContent = 'center';
        fullscreenImg.style.alignItems = 'center';
        fullscreenImg.style.zIndex = '1000';
        fullscreenImg.style.cursor = 'pointer';

        const img = document.createElement('img');
        img.src = imgSrc;
        img.style.maxWidth = '90%';
        img.style.maxHeight = '90%';
        img.style.objectFit = 'contain';

        fullscreenImg.appendChild(img);
        fullscreenImg.onclick = () => document.body.removeChild(fullscreenImg);

        document.body.appendChild(fullscreenImg);
    };

    return (
        <div className="about">
            <section className="about__section">
                <div className="container">
                    <h1 className="title title_mb35">О нас</h1>


                    <p className="about__text">
                        Привет! Меня зовут Мария, и я — кондитер с душой.
                        <br /> <br />
                        Мои торты и десерты — это не просто сладости, а маленькие произведения искусства,
                        созданные с любовью и вниманием к каждой детали. Я верю, что вкусный торт может стать
                        главным украшением праздника и оставить тёплые воспоминания на долгие годы.
                    </p>

                    <h2 className="about__subtitle">Почему мне можно доверять?</h2>

                    <ul className="about__list">
                        <li className="about__list-item">
                            <p><span>Профессиональное образование</span> — я постоянно учусь и совершенствую свои навыки,
                                чтобы радовать вас идеальными десертами.
                            </p>
                        </li>
                        <li className="about__list-item">
                            <p><span>Только качественные ингредиенты</span> — никаких заменителей, только натуральные
                                продукты от проверенных поставщиков.</p>
                        </li>
                        <li className="about__list-item">
                            <p><span>Индивидуальный подход </span> — каждый торт создаётся по вашим пожеланиям,
                                чтобы он был по-настоящему уникальным.</p>
                        </li>
                    </ul>
                </div>
            </section >

            <section className="certificates">
                <div className="container">
                    <h2 className="title title_mb35">Мои сертификаты</h2>

                    <div className="certificates__slider">
                        <Swiper
                            modules={[Navigation, Pagination]}
                            spaceBetween={30}
                            slidesPerView={3}
                            navigation
                            pagination={{ clickable: true }}
                            breakpoints={{
                                320: {
                                    slidesPerView: 1,
                                },
                                768: {
                                    slidesPerView: 2,
                                },
                                992: {
                                    slidesPerView: 3,
                                }
                            }}
                        >
                            {certificates.map(cert => (
                                <SwiperSlide key={cert.id}>
                                    <div
                                        className="certificates__card"
                                        onClick={() => openFullscreen(cert.img)}
                                    >
                                        <img
                                            src={cert.img}
                                            alt={cert.alt}
                                            className="certificates__image"
                                        />
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
            </section>
        </div >
    );
};

export default AboutPage;