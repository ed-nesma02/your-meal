import { API_URI } from "../../const/API";
import { Count } from "../Count/Count";
import s from "./OrderGoods.module.css";
import PropTypes from "prop-types";

export const OrderGoods = ({ data }) => {
  return (
    <li className={s.order__item}>
      <img
        className={s.order__image}
        src={`${API_URI}/${data.image}`}
        alt={data.title}
      />
      <div className={s.goods}>
        <h3 className={s.goods__title}>{data.title}</h3>
        <p className={s.goods__weight}>{data.weight}г</p>
        <p className={s.goods__price}>
          {data.price}
          <span className={s.currency}>₽</span>
        </p>
      </div>
      <Count count={data.count} id={data.id} />
    </li>
  );
};

OrderGoods.propTypes = {
  data: PropTypes.object,
};
