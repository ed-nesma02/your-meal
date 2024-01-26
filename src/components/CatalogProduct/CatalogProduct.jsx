import { useDispatch } from "react-redux";
import { API_URI } from "../../const/API";
import s from "./CatalogProduct.module.css";
import PropTypes from "prop-types";
import { addProduct } from "../../store/order/orderSlice";
import { openModalInfo } from "../../store/modalInfo/modalInfoSlice";

export const CatalogProduct = ({ title, id, price, weight, image }) => {
  const dispatch = useDispatch();

  const handleOpenInfo = () => {
    dispatch(openModalInfo({ id }));
  };

  return (
    <article className={s.product}>
      <img
        src={`${API_URI}/${image}`}
        alt={title}
        className={s.product__image}
      />
      <p className={s.product__price}>
        {price}
        <span className={s.currency}>&nbsp;₽</span>
      </p>
      <h3 className={s.product__title}>
        <button
          data-id={id}
          className={s.product__detail}
          onClick={handleOpenInfo}>
          {title}
        </button>
      </h3>
      <p className={s.product__weight}>{`${weight}г`}</p>
      <button
        className={s.product__add}
        type="button"
        onClick={() => {
          dispatch(addProduct({ id }));
        }}>
        Добавить
      </button>
    </article>
  );
};

CatalogProduct.propTypes = {
  title: PropTypes.string,
  id: PropTypes.string,
  price: PropTypes.number,
  weight: PropTypes.number,
  image: PropTypes.string,
};
