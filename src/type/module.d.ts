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
}
