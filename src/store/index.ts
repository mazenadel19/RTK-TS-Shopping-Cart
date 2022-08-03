import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './reducers/CartSlice';
import productReducer from './reducers/ProductSlice';

export const store = configureStore({
	reducer: {
		cart: cartReducer,
		products: productReducer
	}
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

/**
 * returntype is a typescript utitlity that transform
 * the type defintion of a function into its return type
 * ie. rootstate will carry a type defintion that matches 
 * the data in the store
 */

/**
 * AppDispatch will be used when typing the method used to dispatch actions
 */
