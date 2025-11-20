import axios from 'axios'
import { buildCreateSlice, asyncThunkCreator } from '@reduxjs/toolkit'

export const createAppSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
})

//创建关联商品的切片
export const productsSlice = createAppSlice({
  name: 'products',
  initialState: {
    products: [],
    loading: false,
  } as {
    products: any[]
    loading: boolean
  },

  reducers: (create) => ({
    // 异步获取商品列表
    fetchProducts: create.asyncThunk(
      async () => {
        const res = await axios.get('/api/products')
        console.log('获取到新的数据/=-=/')
        return res.data.data
      },
      //获取fetch商品信息的状态
      {
        pending: (state) => {
          state.loading = true
        },

        fulfilled: (state, action) => {
          state.loading = false
          state.products = action.payload
        },

        rejected: (state) => {
          state.loading = false
        },
      },
    ),
  }),
})

// 导出 Actions 和 redecer
export const { fetchProducts } = productsSlice.actions

export default productsSlice.reducer
