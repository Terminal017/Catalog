export function filterProject(
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

    // 关键字筛选
    const keyword = querySelector.keyword.trim()
    if (keyword) {
      return item.name.includes(keyword)
    } else {
      return true
    }
  })
}

export function sortProject(
  data: ProductItemType[],
  sortOption: sortOptionType,
) {
  const arr = [...data]
  switch (sortOption) {
    case 'default':
      return arr
    case 'createdAt':
      return arr.sort(
        (a, b) =>
          new Date(b.createAt).getTime() - new Date(a.createAt).getTime(),
      )
    case 'rating':
      return arr.sort((a, b) => b.rating - a.rating)
    case 'price-asc':
      return arr.sort((a, b) => a.price - b.price)
    case 'price-desc':
      return arr.sort((a, b) => b.price - a.price)
    case 'sales':
      return arr.sort((a, b) => b.sales - a.sales)
    default:
      return arr
  }
}

export function paginateProject(
  data: ProductItemType[],
  pageOption: PaginateOptionType,
) {
  const { currentPage, pageSize } = pageOption
  const result = data.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  )
  return result
}
