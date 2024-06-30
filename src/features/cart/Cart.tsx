import React from 'react'
import { useAppDispatch, useAppSelector } from '../../store/hooks/hooks'
import {
  cartState,
  checkoutCart,
  getTotalPrice,
} from '../../store/reducers/CartSlice'
import styles from './Cart.module.css'
import CartItem from './CartItem'

export function Cart() {
  const dispatch = useAppDispatch()
  const { items, checkoutState, errorMessage } = useAppSelector(cartState)
  const totalPrice = useAppSelector(getTotalPrice)

  function onCheckout(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    dispatch(checkoutCart())
  }

  const baseTableClass =
    checkoutState === 'LOADING' ? styles.checkoutLoading : styles.table
  const tableClasses =
    checkoutState === 'ERROR' ? styles.checkoutError : baseTableClass

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
            {Object.entries(items).map(([id, quantity]) => (
              <CartItem key={id} id={id} quantity={quantity} />
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td>Total</td>
              <td />
              <td className={styles.total}>{totalPrice}</td>
              <td />
            </tr>
          </tfoot>
        </table>
      </div>
      <form onSubmit={onCheckout}>
        {checkoutState === 'ERROR' && errorMessage ? (
          <p className={styles.errorBox}>{errorMessage}</p>
        ) : null}
        <button className={`${styles.button} btn`} type="submit">
          Checkout
        </button>
      </form>
    </main>
  )
}
