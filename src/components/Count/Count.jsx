import { useState } from "react";
import s from "./Count.module.css";
import PropTypes from "prop-types";

export const Count = ({ count }) => {
  const [countItem, setCountItem] = useState(count);

  const addCount = () => {
    setCountItem(countItem + 1);
  };
  const removeCount = () => {
    if (countItem > 1) {
      setCountItem(countItem - 1);
    }
  };

  return (
    <div className={s.count}>
      <button
        className={s.count__minus}
        onClick={removeCount}
        disabled={countItem === 1}>
        -
      </button>
      <p className={s.count__amount}>{countItem}</p>
      <button className={s.count__plus} onClick={addCount}>
        +
      </button>
    </div>
  );
};

Count.propTypes = {
  count: PropTypes.number,
};
