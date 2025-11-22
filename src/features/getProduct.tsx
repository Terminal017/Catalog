import axios from 'axios'
import { buildCreateSlice, asyncThunkCreator } from '@reduxjs/toolkit'
import { filterProjects } from '../lib/filter'

export const createAppSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
})

//创建关联商品的切片
export const productsSlice = createAppSlice({
  name: 'products',
  initialState: {
    products: [],
    loading: false,
    querySelector: {
      //筛选条件：分类，价格区间，销量区间，评分区间
      category: [],
      priceRange: { min: null, max: null }, // 范围 0-10000
      salesRange: { min: null, max: null }, // 范围 0-100000
      ratingRange: { min: null, max: null }, // 范围 0-5
    },
  } as {
    products: any[]
    loading: boolean
    querySelector: querySelectorType
  },

  reducers: (create) => ({
    // 设置筛选条件
    setFilter: create.reducer<Partial<querySelectorType>>((state, action) => {
      state.querySelector = {
        ...state.querySelector,
        ...action.payload,
      }
    }),

    // 重置所有筛选
    resetFilter: create.reducer((state) => {
      state.querySelector = {
        category: [],
        priceRange: { min: null, max: null },
        salesRange: { min: null, max: null },
        ratingRange: { min: null, max: null },
      }
    }),
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
          // 执行筛选
          state.products = filterProjects(action.payload, state.querySelector)
        },

        rejected: (state) => {
          state.loading = false
        },
      },
    ),
  }),
})

// 导出 Actions 和 redecer
export const { fetchProducts, setFilter, resetFilter } = productsSlice.actions

export default productsSlice.reducer
