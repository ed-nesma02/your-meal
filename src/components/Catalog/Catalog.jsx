import { useDispatch, useSelector } from "react-redux";
import { CatalogProduct } from "../CatalogProduct/CatalogProduct";
import { Container } from "../Container/Container";
import { Order } from "../Order/Order";
import s from "./Catalog.module.css";
import { useEffect } from "react";
import { productsRequestAsync } from "../../store/product/productSlice";

export const Catalog = () => {
  const { products } = useSelector((state) => state.products);
  const { activeCategory, category } = useSelector((state) => state.category);
  const dispatch = useDispatch();

  useEffect(() => {
    if (category.length) {
      dispatch(productsRequestAsync(category[activeCategory]?.title));
    }
  }, [activeCategory, category]);

  return (
    <section className={s.catalog}>
      <Container className={s.catalog__container}>
        <Order />
        <div className={s.catalog__wrapper}>
          <h2 className={s.catalog__title}>{category[activeCategory]?.rus}</h2>
          <div className={s.catalog__wrap_list}>
            {products.length ? (
              <ul className={s.catalog__list}>
                {products?.map((item) => (
                  <li key={item.id} className={s.catalog__item}>
                    <CatalogProduct {...item} />
                  </li>
                ))}
              </ul>
            ) : (
              <p>К сожалению товаров данной категории нет</p>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
};
