import axios from 'axios'
import { buildCreateSlice, asyncThunkCreator } from '@reduxjs/toolkit'
import { filterProject, sortProject, paginateProject } from '../lib/filter'

export const createAppSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
})

//从localStorage获取初始筛选条件，没有则使用默认的初始状态
function InitialQueryOptions(): queryOptionsType {
  try {
    const localData = JSON.parse(localStorage.getItem('queryOptions') || '{}')
    return {
      querySelector: {
        category: localData.querySelector?.category || [],
        priceRange: localData.querySelector?.priceRange || {
          min: null,
          max: null,
        },
        salesRange: localData.querySelector?.salesRange || {
          min: null,
          max: null,
        },
        ratingRange: localData.querySelector?.ratingRange || {
          min: null,
          max: null,
        },
        keyword: localData.querySelector?.keyword || '',
      },
      sortOption: localData.sortOption || 'default',
      pageOption: localData.pageOption || {
        currentPage: 1,
        pageSize: 10,
      },
    }
  } catch (err) {
    console.log('localStorage解析发生错误')
    return {
      querySelector: {
        category: [],
        priceRange: { min: null, max: null },
        salesRange: { min: null, max: null },
        ratingRange: { min: null, max: null },
        keyword: '',
      },
      sortOption: 'default',
      pageOption: {
        currentPage: 1,
        pageSize: 10,
      },
    }
  }
}

const queryOptions = InitialQueryOptions()

//创建关联商品的切片
export const productsSlice = createAppSlice({
  name: 'products',
  initialState: {
    products: [], //当前页数据
    recommendProducts: [], //推荐商品数据
    bookmarks: [], //收藏商品数据
    total: 0, //商品总数
    loading: false,
    error: null,
    querySelector: queryOptions.querySelector,
    sortOption: queryOptions.sortOption,
    pageOption: queryOptions.pageOption,
  } as {
    products: ProductItemType[]
    recommendProducts: ProductItemType[]
    bookmarks: string[]
    total: number
    loading: boolean
    error: null | string
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
        keyword: state.querySelector.keyword, //暂不清理关键字搜索
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

    // 添加收藏方法
    setbookmarks: create.reducer<string>((state, action) => {
      const data: string = action.payload
      state.bookmarks = state.bookmarks.includes(data)
        ? state.bookmarks.filter((item) => item !== data)
        : [...state.bookmarks, data]
    }),

    // 异步获取商品列表
    fetchProducts: create.asyncThunk(
      async () => {
        const res = await axios.get('/api/products')
        return res.data.data as ProductItemType[]
      },
      //获取fetch商品信息的状态
      {
        pending: (state) => {
          state.loading = true
        },

        fulfilled: (state, action) => {
          state.loading = false
          // 仅更新一次推荐数据
          if (state.recommendProducts.length === 0) {
            const excellent = action.payload.filter(
              (item) => item.rating >= 4 && item.sales >= 50000,
            )
            if (excellent.length >= 5) {
              // 随机选5个优秀商品作为推荐
              for (let i = 0; i < 5; i++) {
                const j = i + Math.floor(Math.random() * (excellent.length - i))
                ;[excellent[i], excellent[j]] = [excellent[j], excellent[i]]
              }
              state.recommendProducts = excellent.slice(0, 5)
            } else {
              state.recommendProducts = action.payload.slice(0, 5)
            }
          }

          // 执行筛选
          const filtered = filterProject(action.payload, state.querySelector)
          // 添加总数
          state.total = filtered.length
          // 执行排序
          const sorted = sortProject(filtered, state.sortOption)
          // 执行分页
          const result = paginateProject(sorted, state.pageOption)

          // 清除错误信息并登记结果
          if (state.error) {
            state.error = null
          }
          state.products = result

          // 将当前筛选条件保存到localStorage
          localStorage.setItem(
            'queryOptions',
            JSON.stringify({
              querySelector: state.querySelector,
              sortOption: state.sortOption,
              pageOption: state.pageOption,
            }),
          )
        },

        rejected: (state, action) => {
          state.loading = false
          //添加错误信息
          state.error = action.error.message || '请求失败'
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
  setbookmarks,
} = productsSlice.actions

export default productsSlice.reducer
