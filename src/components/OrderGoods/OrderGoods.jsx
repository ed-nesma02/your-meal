import { Count } from "../Count/Count";
import s from "./OrderGoods.module.css";
import PropTypes from "prop-types";

export const OrderGoods = ({ title }) => {
  return (
    <li className={s.order__item}>
      <img
        className={s.order__image}
        src="../../assets/img/burger_1.jpg"
        alt="Картошка фри"
      />
      <div className={s.goods}>
        <h3 className={s.goods__title}>{title}</h3>
        <p className={s.goods__weight}>180г</p>
        <p className={s.goods__price}>
          245
          <span className={s.currency}>₽</span>
        </p>
      </div>
      <Count count={1} />
    </li>
  );
};

OrderGoods.propTypes = {
  title: PropTypes.string,
};
