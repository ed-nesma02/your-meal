import s from "./Order.module.css";
import cn from "classnames";
import { OrderGoods } from "../OrderGoods/OrderGoods";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { orderRequestAsync } from "../../store/order/orderSlice";
import { openModal } from "../../store/modalDelivery/modalDeliverySlice";

export const Order = () => {
  const dispatch = useDispatch();
  const { orderList, orderGoods, totalCount, totalPrice } = useSelector(
    (state) => state.order,
  );
  const [orderOpen, setOrderOpen] = useState(false);

  useEffect(() => {
    dispatch(orderRequestAsync());
  }, [dispatch, orderList.length]);

  return (
    <div className={cn(s.catalog__order, s.order, orderOpen && s.order_open)}>
      <section className={s.order__wrapper}>
        <div
          className={s.order__header}
          onClick={() => {
            setOrderOpen(true);
          }}
          tabIndex="0"
          role="button">
          <h2 className={s.order__title}>Корзина</h2>
          <span className={s.order__count}>{totalCount}</span>
        </div>

        {orderGoods.length ? (
          <div className={s.order__wrap_list}>
            <ul className={s.order__list}>
              {orderGoods?.map((item) => (
                <OrderGoods key={item.id} data={item} />
              ))}
            </ul>
            <div className={s.order__total}>
              <p>Итого</p>
              <p>
                <span className={s.order__amount}>
                  {totalPrice.toLocaleString()}
                </span>
                <span className={s.currency}>&nbsp;₽</span>
              </p>
            </div>

            <button
              className={s.order__submit}
              disabled={!orderGoods.length}
              onClick={() => {
                dispatch(openModal());
              }}>
              Оформить заказ
            </button>
            <div className={s.order__apeal}>
              <p className={s.order__text}>Бесплатная доставка</p>
              <button
                className={s.order__close}
                onClick={() => {
                  setOrderOpen(false);
                }}>
                Свернуть
              </button>
            </div>
          </div>
        ) : (
          <div>Тут пока пусто :(</div>
        )}
      </section>
    </div>
  );
};
