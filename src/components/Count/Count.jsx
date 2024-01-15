import s from "./Count.module.css";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { addProduct, removeProduct } from "../../store/order/orderSlice";

export const Count = ({ count, id }) => {
  const dispatch = useDispatch();

  return (
    <div className={s.count}>
      <button
        className={s.count__minus}
        onClick={() => dispatch(removeProduct({ id }))}>
        -
      </button>
      <p className={s.count__amount}>{count}</p>
      <button
        className={s.count__plus}
        onClick={() => dispatch(addProduct({ id }))}>
        +
      </button>
    </div>
  );
};

Count.propTypes = {
  count: PropTypes.number,
  id: PropTypes.string,
};
