import { configureStore } from '@reduxjs/toolkit'
import productsSlice from '../features/getProduct'

export const store = configureStore({
  //注册reducer
  reducer: {
    products: productsSlice,
  },
})

export type AppDispatch = typeof store.dispatch
