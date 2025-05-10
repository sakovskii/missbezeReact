import React, { useState } from 'react';
import './questians-list.scss';
import arrowIcon from '../../assets/img/main/arrow.svg';

const qestions = [
  {
    question: 'Как правильно рассчитать вес торта?',
    answer: 'Порция для взрослого составляет 200 граммов на человека, для ребенка — 150 граммов на человека.'
  },
  {
    question: 'За сколько дней нужно оформить заказ?',
    answer: 'Рекомендую делать заказ за 3–5 дней, свадебные и сложные — за 7–10. Срочные заказы — 1–2 дня (по возможности).'
  },
  {
    question: 'Нужен ли поднос?',
    answer: 'Торты на подставке или подносе (подставку возвращать не нужно).'
  },
  {
    question: 'Из чего сделаны фигурки?',
    answer: 'Сахарная мастика, пластичный шоколад, укреплены шпажками — будьте осторожны.'
  },
  {
    question: 'Что такое мастика? Какая она на вкус?',
    answer: 'Пластичная масса со вкусом ванили. На фото-тортах — съедобная картинка из сахарной/вафельной бумаги.'
  },
  {
    question: 'Все ли элементы торта съедобны?',
    answer: 'Используем как съедобные, так и несъедобные элементы — обсуждается при заказе.'
  },
  {
    question: 'Как стоят ярусы друг на друге?',
    answer: 'Картонные подложки + палочки. Резать с верхнего яруса, потом убирать подложку.'
  },
  {
    question: 'Как хранить торт?',
    answer: 'В холодильнике при +2…+5 °C. Мастику нельзя во влажных помещениях — она тает.'
  },
  {
    question: 'Какой срок хранения у Ваших тортов?',
    answer: '3–5 суток в зависимости от крема, при температуре +2…+4 °C.'
  }
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleItem = (index) => {
    setActiveIndex(prev => (prev === index ? null : index));
  };

  return (
    <section className="faq">
      <div className="container">
      <h2 className="title">Часто задаваемые вопросы</h2>

        <ul className="faq__list">
          {qestions.map((item, index) => (
            <li
              key={index}
              className={`faq__item ${activeIndex === index ? 'active' : ''}`}
              onClick={() => toggleItem(index)}
            >
              <div className="faq__wrapper">
                <button className="faq__question">
                  <img src={arrowIcon} alt="" />
                  {item.question}
                </button>
              </div>
              <div className="faq__answer">{item.answer}</div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default FAQ;
