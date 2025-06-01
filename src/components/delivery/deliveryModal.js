import React from 'react';
import './deliveryModal.scss';

const DeliveryModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal__close" onClick={onClose}>×</button>
        <h2 className='modal__title'>Доставка и оплата</h2>
        <p className='modal__subtitle'>Условия доставки в Кемерово:</p>
        <p className='modal__descr'><span>Бесплатно</span> в удобное для вас время с 09:00 до 21:00. <br/>
          Доставка <span>в нерабочее время</span> (по согласованию).<br/>
          Доставка <span>в соседние города и посёлки</span> (от 20 руб/км, обсуждается индивидуально).</p>

        <p className='modal__subtitle'>Условия оплаты и внесения изменений:</p>
        <p className='modal__descr'><span>Предоплата обязательна</span> – заказ подтверждается только после её внесения и согласования всех деталей. <br/>
         <span> Изменения в дизайне</span> возможны не позднее, чем за 3 дня до даты выдачи (уточняйте заранее).<br/>
          <span>При отмене заказа менее чем за 3 дня</span> предоплата не возвращается.</p>
      </div>
    </div>
  );
};

export default DeliveryModal;