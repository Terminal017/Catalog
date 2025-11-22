import axios from 'axios'
import { buildCreateSlice, asyncThunkCreator } from '@reduxjs/toolkit'
import { filterProject, sortProject, paginateProject } from '../lib/filter'

export const createAppSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
})

//创建关联商品的切片
export const productsSlice = createAppSlice({
  name: 'products',
  initialState: {
    products: [], //当前页数据
    total: 0, //商品总数
    loading: false,
    querySelector: {
      //筛选条件：分类，价格区间，销量区间，评分区间
      category: [],
      priceRange: { min: null, max: null }, // 范围 0-10000
      salesRange: { min: null, max: null }, // 范围 0-100000
      ratingRange: { min: null, max: null }, // 范围 0-5
    },
    sortOption: 'default',
    pageOption: {
      currentPage: 1,
      pageSize: 10,
    },
  } as {
    products: ProductItemType[]
    total: number
    loading: boolean
    querySelector: querySelectorType
    sortOption: sortOptionType
    pageOption: PaginateOptionType
  },

  reducers: (create) => ({
    // 设置筛选条件
    setFilter: create.reducer<Partial<querySelectorType>>((state, action) => {
      state.querySelector = {
        ...state.querySelector,
        ...action.payload,
      }
      state.pageOption.currentPage = 1 //筛选时重置页面
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

    //设置排序条件
    setSortOption: create.reducer<sortOptionType>((state, action) => {
      state.sortOption = action.payload
    }),

    // 设置分页选项
    setPageOption: create.reducer<
      Partial<{ currentPage: number; pageSize: number }>
    >((state, action) => {
      state.pageOption = {
        ...state.pageOption,
        ...action.payload,
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
          const filtered = filterProject(action.payload, state.querySelector)
          // 添加总数
          state.total = filtered.length
          // 执行排序
          const sorted = sortProject(filtered, state.sortOption)

          const result = paginateProject(sorted, state.pageOption)

          state.products = result
        },

        rejected: (state) => {
          state.loading = false
        },
      },
    ),
  }),
})

// 导出 Actions 和 redecer
export const {
  fetchProducts,
  setFilter,
  resetFilter,
  setSortOption,
  setPageOption,
} = productsSlice.actions

export default productsSlice.reducer
