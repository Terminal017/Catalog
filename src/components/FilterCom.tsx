import { Drawer, Button, Tag, InputNumber } from 'antd'
import { useState } from 'react'
import { useAppSelector, useAppDispatch } from '../app/hook'
import { setFilter, resetFilter } from '../features/getProduct'

//筛选组件
export function FilterProjects() {
  const querySelector = useAppSelector((state) => state.products.querySelector)
  const dispatch = useAppDispatch()

  //管理抽屉状态
  const [open, setOpen] = useState(false)
  //管理价格表单
  const [price, setPrice] = useState<{
    min: number | null
    max: number | null
  }>({ min: querySelector.priceRange.min, max: querySelector.priceRange.max })

  //管理销售量表单
  const [sales, setSales] = useState<{
    min: number | null
    max: number | null
  }>({ min: querySelector.salesRange.min, max: querySelector.salesRange.max })

  //管理评分表单
  const [rating, setRating] = useState<{
    min: number | null
    max: number | null
  }>({ min: querySelector.ratingRange.min, max: querySelector.ratingRange.max })

  const { CheckableTag } = Tag
  const CATEGORIES = [
    { value: 'electronics', label: '数码' },
    { value: 'appliances', label: '家电' },
    { value: 'clothing', label: '服饰' },
    { value: 'living', label: '家居' },
    { value: 'sports', label: '运动' },
    { value: 'books', label: '图书' },
    { value: 'food', label: '食品' },
    { value: 'toys', label: '玩具' },
    { value: 'game', label: '游戏' },
  ]

  //重置所有筛选条件
  const handleReset = () => {
    dispatch(resetFilter())
    setPrice({ min: null, max: null })
    setSales({ min: null, max: null })
    setRating({ min: null, max: null })
  }

  //获取分类筛选数组
  function handleCategory(tag: string, checked: boolean) {
    const new_category = checked
      ? [...querySelector.category, tag]
      : querySelector.category.filter((c) => c !== tag)

    return { category: new_category }
  }

  //注释疑问：这个函数可以复用吗？
  //更新最低价，当最低价高于最高价时对调
  function hangleMinPrice(min_price: number | null) {
    if (
      querySelector.priceRange.max &&
      min_price &&
      min_price > querySelector.priceRange.max
    ) {
      setPrice((prev) => ({ min: prev.max, max: prev.min }))
      return {
        priceRange: { min: querySelector.priceRange.max, max: min_price },
      }
    }
    return { priceRange: { ...querySelector.priceRange, min: min_price } }
  }

  //更新最高价
  function hangleMaxPrice(max_price: number | null) {
    if (
      querySelector.priceRange.min &&
      max_price &&
      max_price < querySelector.priceRange.min
    ) {
      setPrice((prev) => ({ min: prev.max, max: prev.min }))
      return {
        priceRange: { min: max_price, max: querySelector.priceRange.min },
      }
    }
    return { priceRange: { ...querySelector.priceRange, max: max_price } }
  }

  //更新最低销量
  function hangleMinSales(min_sales: number | null) {
    if (
      querySelector.salesRange.max &&
      min_sales &&
      min_sales > querySelector.salesRange.max
    ) {
      setSales((prev) => ({ min: prev.max, max: prev.min }))
      return {
        salesRange: { min: querySelector.salesRange.max, max: min_sales },
      }
    }
    return { salesRange: { ...querySelector.salesRange, min: min_sales } }
  }

  //更新最高销量
  function hangleMaxSales(max_sales: number | null) {
    if (
      querySelector.salesRange.min &&
      max_sales &&
      max_sales < querySelector.salesRange.min
    ) {
      setSales((prev) => ({ min: prev.max, max: prev.min }))
      return {
        salesRange: { min: max_sales, max: querySelector.salesRange.min },
      }
    }
    return { salesRange: { ...querySelector.salesRange, max: max_sales } }
  }

  //更新评分范围
  function hangleMinRating(min_rating: number | null) {
    return { ratingRange: { ...querySelector.ratingRange, min: min_rating } }
  }

  //更新最高销量
  function hangleMaxRating(max_rating: number | null) {
    return { ratingRange: { ...querySelector.ratingRange, max: max_rating } }
  }

  return (
    <>
      <Button onClick={() => setOpen(true)}>筛选</Button>

      <Drawer
        title="筛选条件"
        placement="bottom"
        open={open}
        onClose={() => setOpen(false)}
      >
        <h3>类别</h3>
        <div>
          {CATEGORIES.map((tag) => {
            //从Redux中获取分类筛选条件以显示
            const isChecked = querySelector.category.includes(tag.value)
            return (
              <CheckableTag
                key={tag.value}
                checked={isChecked}
                onChange={(checked) =>
                  dispatch(setFilter(handleCategory(tag.value, checked)))
                }
              >
                {tag.label}
              </CheckableTag>
            )
          })}
        </div>

        <h3>价格区间</h3>
        <div>
          <InputNumber
            controls={false}
            placeholder="最低价"
            min={0}
            max={10000}
            value={price.min}
            onChange={(value) => setPrice({ ...price, min: value })}
            onBlur={() => dispatch(setFilter(hangleMinPrice(price.min)))}
            onPressEnter={() => dispatch(setFilter(hangleMinPrice(price.min)))}
          />
          <span className="mx-2">-</span>
          <InputNumber
            controls={false}
            placeholder="最高价"
            min={0}
            max={10000}
            value={price.max}
            onChange={(value) => setPrice({ ...price, max: value })}
            onBlur={() => dispatch(setFilter(hangleMaxPrice(price.max)))}
            onPressEnter={() => dispatch(setFilter(hangleMaxPrice(price.max)))}
          />
        </div>

        <h3>销售量</h3>
        <div>
          <InputNumber
            controls={false}
            placeholder="最低销量"
            min={0}
            max={100000}
            value={sales.min}
            onChange={(value) =>
              setSales({ ...sales, min: value as number | null })
            }
            onBlur={() => dispatch(setFilter(hangleMinSales(sales.min)))}
            onPressEnter={() => dispatch(setFilter(hangleMinSales(sales.min)))}
          />
          <span className="mx-2">-</span>
          <InputNumber
            controls={false}
            placeholder="最高销量"
            min={0}
            max={100000}
            value={sales.max}
            onChange={(value) =>
              setSales({ ...sales, max: value as number | null })
            }
            onBlur={() => dispatch(setFilter(hangleMaxSales(sales.max)))}
            onPressEnter={() => dispatch(setFilter(hangleMaxSales(sales.max)))}
          />
        </div>

        <h3>评分</h3>
        <div>
          <InputNumber
            controls={false}
            placeholder="最低评分"
            min={0}
            max={5}
            value={rating.min}
            onChange={(value) =>
              setRating({ ...rating, min: value as number | null })
            }
            onBlur={() => dispatch(setFilter(hangleMinRating(rating.min)))}
            onPressEnter={() =>
              dispatch(setFilter(hangleMinRating(rating.min)))
            }
          />
          <span className="mx-2">-</span>
          <InputNumber
            controls={false}
            placeholder="最高评分"
            min={0}
            max={5}
            value={rating.max}
            onChange={(value) =>
              setRating({ ...rating, max: value as number | null })
            }
            onBlur={() => dispatch(setFilter(hangleMaxRating(rating.max)))}
            onPressEnter={() =>
              dispatch(setFilter(hangleMaxRating(rating.max)))
            }
          />
        </div>

        <div className="flex flex-row justify-around">
          <Button onClick={() => handleReset()}>清空筛选</Button>
          <Button onClick={() => setOpen(false)}>确认</Button>
        </div>
      </Drawer>
    </>
  )
}
