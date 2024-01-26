import { useDispatch, useSelector } from "react-redux";
import s from "./ModalInfo.module.css";
import ReactDOM from "react-dom";
import {
  addProductModule,
  closeModalInfo,
  delProductModule,
} from "../../store/modalInfo/modalInfoSlice";
import { useEffect } from "react";
import { productRequestAsync } from "../../store/product/productSlice";
import { API_URI } from "../../const/API";
import { addProduct } from "../../store/order/orderSlice";

export const ModalInfo = () => {
  const { isOpen, id, count } = useSelector((state) => state.modalInfo);
  const { product } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(productRequestAsync({ id }));
  }, [dispatch, id]);

  return (
    isOpen &&
    ReactDOM.createPortal(
      <div
        className={s.modal}
        onClick={({ target, currentTarget }) => {
          if (target === currentTarget) {
            dispatch(closeModalInfo());
          }
        }}>
        <div className={s.mproduct}>
          <div className={s.mproduct__container}>
            <h2 className={s.mproduct__title}>{product.title}</h2>

            <div className={s.mproduct__content}>
              <img
                src={`${API_URI}/${product.image}`}
                alt={product.title}
                className={s.mproduct__image}
              />
              <p className={s.mproduct__description}>{product.description}</p>
              <div className={s.mproduct__ingredients}>
                <h3 className={s.ingredients__title}>Состав:</h3>
                <ul className={s.ingredients__list}>
                  {product.ingredients?.map((ingredient, id) => (
                    <li key={`1${id}`} className={s.ingredients__item}>
                      {ingredient}
                    </li>
                  ))}
                </ul>

                <p
                  className={
                    s.ingredients__calories
                  }>{`${product.weight}г, ккал ${product.calories}`}</p>
              </div>
            </div>
            <div className={s.mproduct__footer}>
              <div className={s.mproduct__add}>
                <button
                  className={s.mproduct__btn}
                  onClick={() => {
                    dispatch(addProduct({ id, count }));
                    dispatch(closeModalInfo());
                  }}>
                  Добавить
                </button>

                <div className={s.count}>
                  <button
                    className={s.count__minus}
                    onClick={() => dispatch(delProductModule())}>
                    -
                  </button>
                  <p className={s.count__amount}>{count}</p>
                  <button
                    className={s.count__plus}
                    onClick={() => dispatch(addProductModule())}>
                    +
                  </button>
                </div>
              </div>

              <p className={s.mproduct__price}>
                {product.price}&nbsp;
                <span className={s.currency}>₽</span>
              </p>
            </div>
          </div>

          <button
            className={s.modal__close}
            onClick={() => {
              dispatch(closeModalInfo());
            }}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg">
              <rect
                x="5.07422"
                y="5.28247"
                width="1"
                height="20"
                transform="rotate(-45 5.07422 5.28247)"
              />
              <rect
                x="5.78125"
                y="19.4246"
                width="1"
                height="20"
                transform="rotate(-135 5.78125 19.4246)"
              />
            </svg>
          </button>
        </div>
      </div>,
      document.getElementById("modal-info"),
    )
  );
};
