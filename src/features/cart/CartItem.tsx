import React from 'react'
import { useAppDispatch, useAppSelector } from '../../store/hooks/hooks'

import { removeFromCart, updateQuantity } from '../../store/reducers/CartSlice'
import { ProductsState } from '../../store/reducers/ProductSlice'

import styles from './CartItem.module.css'

export interface ICartItemProps {
  id: string
  quantity: number
}

const CartItem = ({ id, quantity }: ICartItemProps) => {
  const dispatch = useAppDispatch()
  const { products } = useAppSelector(ProductsState)

  function onQuantityChange(e: React.FocusEvent<HTMLInputElement>, id: string) {
    const quantity = Number(e.target.value) || 1
    dispatch(updateQuantity({ id, quantity: quantity >= 1 ? quantity : 1 }))
  }

  return (
    <tr>
      <td>{products[id].name}</td>
      <td>
        <input
          type="number"
          className={styles.input}
          defaultValue={quantity >= 1 ? quantity : 1}
          onBlur={(e) => {
            onQuantityChange(e, id)
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
  )
}

export default CartItem
