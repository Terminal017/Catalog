import { configureStore } from '@reduxjs/toolkit'
import productsSlice from '../features/getProduct'

export const store = configureStore({
  //注册reducer
  reducer: {
    products: productsSlice,
  },
})

// 导出类型用于TS类型定义
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
