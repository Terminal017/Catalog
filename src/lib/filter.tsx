export function filterProjects(
  data: ProductItemType[],
  querySelector: querySelectorType,
): ProductItemType[] {
  //定义范围筛选函数
  const inRange = (
    value: number,
    range: { min: number | null; max: number | null },
  ) => {
    const { min, max } = range
    if (min === null && max === null) return true
    if (min !== null && max !== null) {
      return value >= min && value <= max
    }
    if (min !== null) {
      return value >= min
    }
    return value <= (max as number)
  }

  return data.filter((item) => {
    // 类别筛选
    if (
      Array.isArray(querySelector.category) &&
      querySelector.category.length > 0
    ) {
      if (!querySelector.category.includes(item.category)) return false
    }
    // 价格、销量、评分范围筛选
    if (!inRange(item.price, querySelector.priceRange)) return false
    if (!inRange(item.sales, querySelector.salesRange)) return false
    if (!inRange(item.rating, querySelector.ratingRange)) return false

    return true
  })
}
