import React, { useEffect } from "react";
import { getProducts } from "../../app/api";
import { useAppDispatch, useAppSelector } from "../../store/hooks/hooks";
import { addToCart } from "../../store/reducers/CartSlice";
import {
  ProductsState,
  recievedProduct,
} from "../../store/reducers/ProductSlice";
import styles from "./Products.module.css";

export function Products() {
  // const products = useAppSelector(state => state.products.products)
  const { products } = useAppSelector(ProductsState);
  const ProductsArray = Object.values(products);
  const disaptch = useAppDispatch();

  useEffect(() => {
    getProducts().then((products) => {
      disaptch(recievedProduct(products));
    });
  }, []);

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
              <button
                className="btn"
                onClick={() => disaptch(addToCart(product.id))}
              >
                Add to Cart 🛒
              </button>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
