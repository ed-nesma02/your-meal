import { useDispatch, useSelector } from "react-redux";
import { Container } from "../Container/Container";
import s from "./Navigation.module.css";
import cn from "classnames";
import {
  categoryRequestAsync,
  changeCategory,
} from "../../store/category/categorySlice";
import { useEffect } from "react";

export const Navigation = () => {
  const { category, activeCategory } = useSelector((state) => state.category);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(categoryRequestAsync());
  }, [dispatch]);

  return (
    <nav className={s.navigation}>
      <Container className={s.container}>
        <ul className={s.list}>
          {category?.map((item, i) => {
            return (
              <li key={item.title} className={s.item}>
                <button
                  className={
                    i === activeCategory
                      ? cn(s.button, s.button_burger, s.button_active)
                      : cn(s.button, s.button_burger)
                  }
                  style={{
                    backgroundImage: `url(${item.image})`,
                  }}
                  onClick={() => {
                    dispatch(changeCategory({ indexCategory: i }));
                  }}>
                  {item.rus}
                </button>
              </li>
            );
          })}
        </ul>
      </Container>
    </nav>
  );
};
