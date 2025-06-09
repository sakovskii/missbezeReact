import { cakeOptions } from './preview.scss';
import Plate from "../../assets/img/visualisation/plate.svg";
import { useCakeConstructor } from '../../hooks/useCakeConstructor';
import { useEffect } from 'react';
import { ReactComponent as Coating } from "../../assets/img/visualisation/coating.svg"
import { ReactComponent as Strawberry } from "../../assets/img/visualisation/strawberry.svg"

const Preview = () => {
    const { cakeData } = useCakeConstructor();

    useEffect(() => {
        console.log('Preview:', cakeData);
    }, [cakeData]);

    const { tiers = 1, filling, coating, form, servings, weight, decor, totalPrice } = cakeData;
    const spongeColor = filling?.biscuit_color || '#FFFDD0';
    const fillingColor = filling?.filling_color || '#FFFFFF';
    const coatingColor = coating?.color || '#FFFFFF';
    const hasDecor = !decor?.items?.some(item => item.id === 1); // Проверка наличия декора

    // Конфигурация ярусов от нижнего к верхнему
    const tierConfig = [
        { tierClass: 'tier_one', spongeClass: '', coatingClass: '', zIndex: 9 },
        { tierClass: 'tier_two', spongeClass: 'preview__sponge_center', coatingClass: 'preview__coating_center', zIndex: 8 },
        { tierClass: 'tier_three', spongeClass: 'preview__sponge_upper', coatingClass: 'preview__coating_upper', zIndex: 7 },
    ];

    return (
        <div className="preview">
            <div className="preview__visualisation">
                <div className="tier tier_plate">
                    <img src={Plate} alt="" className="preview__plate" />
                </div>
                {hasDecor && (
                    <Strawberry className="preview__strawberry" />
                )}
                {Array.from({ length: tiers }).map((_, index) => {
                    const config = tierConfig[index];
                    return (
                        <div className={`tier ${config.tierClass}`} key={index}>
                            <div
                                className={`preview__sponge ${config.spongeClass}`}
                                style={{ backgroundColor: spongeColor, zIndex: config.zIndex }}
                            >
                                <Coating
                                    style={{ color: coatingColor }}
                                    className={`preview__coating ${config.coatingClass}`}
                                />
                                <div className="preview__filling-inner">
                                    <div
                                        className="preview__filling"
                                        style={{ backgroundColor: fillingColor }}
                                    />
                                    <div
                                        className="preview__filling"
                                        style={{ backgroundColor: fillingColor }}
                                    />
                                </div>
                            </div>
                        </div>
                    );
                })}
                
            </div>

            <div className="preview__characteristics">
                <p className="preview__title">Характеристики:</p>
                <p className='preview__subtitle'>Форма: <span className='preview__descr'> {form || 'Не выбрано'}</span></p>
                <p className='preview__subtitle'>Ярусы: <span className='preview__descr'>{tiers}</span></p>
                <p className='preview__subtitle'>Порции: <span className='preview__descr'>{servings || 'Не выбрано'}</span> </p>
                <p className='preview__subtitle'>Вес: <span className='preview__descr'>{weight ? `${weight} кг` : 'Не рассчитан'}</span> </p>
                <p className='preview__subtitle'>Начинка: <span className='preview__descr'>{filling?.name || 'Не выбрано'}</span> </p>
                <p className='preview__subtitle'>Покрытие: <span className='preview__descr'>{coating?.name || 'Не выбрано'}</span> </p>
                <p className='preview__subtitle'>Декор: <span className='preview__descr'>{hasDecor ? decor.items.map(item => item.name).join(', ') : 'Без декора'}</span></p>
                <div className='preview__total-price'>Общая стоимость: <span className='preview__value-price'>≈ {totalPrice ? `${totalPrice} ₽` : 'Не рассчитана'}</span></div>
            </div>
        </div>
    );
};

export default Preview;
