import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '..'
import type { Product } from '../../app/api'

export interface IProductState {
  products: { [id: string]: Product }
}

const initialState: IProductState = {
  products: {},
}

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    receivedProduct(state: IProductState, action: PayloadAction<Product[]>) {
      const products = action.payload
      products.forEach((product) => {
        state.products[product.id] = product
      })
    },
  },
})

export const { receivedProduct } = productSlice.actions
export default productSlice.reducer

// selector
export const ProductsState = (state: RootState) => state.products
