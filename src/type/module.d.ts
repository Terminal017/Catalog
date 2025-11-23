//商品数据类型
interface ProductItemType {
  id: string
  name: string
  image: string
  price: number
  sales: number
  category: string
  rating: number
  createAt: string
}

// 商品筛选参数类型
interface querySelectorType {
  category: string[]
  priceRange: { min: number | null; max: number | null }
  salesRange: { min: number | null; max: number | null }
  ratingRange: { min: number | null; max: number | null }
  keyword: string
}

// 商品排序参数类型
type sortOptionType =
  | 'price-asc'
  | 'price-desc'
  | 'sales'
  | 'rating'
  | 'createdAt'
  | 'default'

// 分页参数类型
interface PaginateOptionType {
  currentPage: number
  pageSize: number
}

interface queryOptionsType {
  querySelector: querySelectorType
  sortOption: sortOptionType
  pageOption: PaginateOptionType
}
