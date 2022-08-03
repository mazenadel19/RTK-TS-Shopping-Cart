import React from "react";
// import classNames from "classnames";
import { useAppDispatch, useAppSelector } from "../../store/hooks/hooks";
import {
  cartState,
  getTotalPrice,
  removeFromCart,
  updateQuantity,
  checkoutCart,
} from "../../store/reducers/CartSlice";
import { ProductsState } from "../../store/reducers/ProductSlice";
import styles from "./Cart.module.css";

export function Cart() {
  const dispatch: any = useAppDispatch();

  const { items, checkoutState, errorMessage } = useAppSelector(cartState);
  const { products } = useAppSelector(ProductsState);
  const totalPrice = useAppSelector(getTotalPrice);

  function onQuantityChange(e: React.FocusEvent<HTMLInputElement>, id: string) {
    const quantity = Number(e.target.value) || 1;
    dispatch(updateQuantity({ id, quantity: quantity >= 1 ? quantity : 1 }));
  }

  function onCheckout(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch(checkoutCart());
  }

  const tableClasses =
    checkoutState === "ERROR"
      ? styles.checkoutError
      : checkoutState === "LOADING"
      ? styles.checkoutLoading
      : styles.table;

  const Cart = () => {
    return (
      <>
        {Object.entries(items).map(([id, quantity], index) => (
          <tr key={index}>
            <td>{products[id].name}</td>
            <td>
              <input
                type="number"
                className={styles.input}
                defaultValue={quantity >= 1 ? quantity : 1}
                onBlur={(e) => {
                  onQuantityChange(e, id);
                }}
              />
            </td>
            <td>{products[id].price}</td>
            <td>
              <button
                className="btn"
                onClick={() => dispatch(removeFromCart(products[id].id))}
                aria-label={`Remove ${products[id].name} from Shopping Cart`}
              >
                X
              </button>
            </td>
          </tr>
        ))}
      </>
    );
  };

  return (
    <main className="page">
      <h1>Shopping Cart</h1>
      <div className="table-responsive">
        <table className={`table table-secondary ${tableClasses}`}>
          <thead>
            <tr>
              <th>Product</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            <Cart />
          </tbody>
          <tfoot>
            <tr>
              <td>Total</td>
              <td></td>
              <td className={styles.total}>{totalPrice}</td>
              <td></td>
            </tr>
          </tfoot>
        </table>
      </div>
      <form onSubmit={onCheckout}>
        {checkoutState === "ERROR" && errorMessage ? (
          <p className={styles.errorBox}>{errorMessage}</p>
        ) : null}
        <button className={`${styles.button} btn`} type="submit">
          Checkout
        </button>
      </form>
    </main>
  );
}
