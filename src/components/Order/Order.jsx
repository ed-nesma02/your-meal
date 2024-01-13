import s from "./Order.module.css";
import cn from "classnames";
import { OrderGoods } from "../OrderGoods/OrderGoods";

const orderList = ["Супер сырный", "Картошка фри", "Жгучий хот-дог"];

export const Order = () => {
  return (
    <div className={cn(s.catalog__order, s.order)}>
      <section className={s.order__wrapper}>
        <div className={s.order__header} tabIndex="0" role="button">
          <h2 className={s.order__title}>Корзина</h2>

          <span className={s.order__count}>4</span>
        </div>

        <div className={s.order__wrap_list}>
          <ul className={s.order__list}>
            {orderList.map((item, i) => (
              <OrderGoods key={i} title={item} />
            ))}
          </ul>

          <div className={s.order__total}>
            <p>Итого</p>
            <p>
              <span className={s.order__amount}>1279</span>
              <span className={s.currency}>₽</span>
            </p>
          </div>

          <button className={s.order__submit}>Оформить заказ</button>

          <div className={s.order__apeal}>
            <p className={s.order__text}>Бесплатная доставка</p>
            <button className={s.order__close}>Свернуть</button>
          </div>
        </div>
      </section>
    </div>
  );
};
