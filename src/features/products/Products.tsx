import React, { useCallback, useEffect } from "react";
import { getProducts } from "../../app/api";
import { useAppDispatch, useAppSelector } from "../../store/hooks/hooks";
import { addToCart } from "../../store/reducers/CartSlice";
import {
  ProductsState,
  receivedProduct,
} from "../../store/reducers/ProductSlice";
import styles from "./Products.module.css";

export function Products() {
  const { products } = useAppSelector(ProductsState);
  const ProductsArray = Object.values(products);
  const dispatch = useAppDispatch();

  const handleAddToCart = useCallback(
    (product) => {
      dispatch(addToCart(product.id));
    },
    [dispatch],
  );

  useEffect(() => {
    getProducts().then((products) => {
      dispatch(receivedProduct(products));
    });
  }, [dispatch]);

  return (
    <main className="page">
      <ul className={styles.products}>
        {ProductsArray.map((product) => (
          <li key={product.id}>
            <article className={styles.product}>
              <figure>
                <img src={product.imageURL} alt={product.imageAlt} />
                <figcaption className={styles.caption}>
                  {product.imageCredit}
                </figcaption>
              </figure>
              <div>
                <h1>{product.name}</h1>
                <p>{product.description}</p>
                <p>${product.price}</p>
              </div>
            </article>
            <div className="d-flex justify-content-end">
              <button className="btn" onClick={() => handleAddToCart(product)}>
                Add to Cart 🛒
              </button>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
