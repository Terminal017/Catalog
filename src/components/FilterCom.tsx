import { Drawer, Button, Tag, InputNumber } from 'antd'
import { useState } from 'react'
import { useAppSelector, useAppDispatch } from '../app/hook'
import { setFilter, resetFilter } from '../features/getProduct'
import { useScreen } from '../hook/useScreen'

type Range = { min: number | null; max: number | null }

// 最小值更新函数（需要时互换）
function updateMinWithSwap(
  range: Range,
  newMin: number | null,
  onSwap: () => void,
): Range {
  if (range.max != null && newMin != null && newMin > range.max) {
    onSwap()
    return { min: range.max, max: newMin }
  }
  return { ...range, min: newMin }
}

// 最大值更新函数（需要时互换）
function updateMaxWithSwap(
  range: Range,
  newMax: number | null,
  onSwap: () => void,
): Range {
  if (range.min != null && newMax != null && newMax < range.min) {
    onSwap()
    return { min: newMax, max: range.min }
  }
  return { ...range, max: newMax }
}

// 可复用的区间输入组件
type RangeInputsProps = {
  minPlaceholder: string
  maxPlaceholder: string
  minLimit: number
  maxLimit: number
  value: Range
  onMinChange: (v: number | null) => void
  onMaxChange: (v: number | null) => void
  onMinCommit: () => void
  onMaxCommit: () => void
}

function RangeInputs({
  minPlaceholder,
  maxPlaceholder,
  minLimit,
  maxLimit,
  value,
  onMinChange,
  onMaxChange,
  onMinCommit,
  onMaxCommit,
}: RangeInputsProps) {
  return (
    <div className="flex flex-row gap-1 items-center mb-6">
      <InputNumber
        styles={{
          root: { width: '100%' },
          input: { textAlign: 'center', fontSize: '16px' },
        }}
        controls={false}
        placeholder={minPlaceholder}
        min={minLimit}
        max={maxLimit}
        value={value.min}
        onChange={(value) => onMinChange(value as number | null)}
        onBlur={onMinCommit}
        onPressEnter={onMinCommit}
      />
      <span className="mx-2">-</span>
      <InputNumber
        styles={{
          root: { width: '100%' },
          input: { textAlign: 'center', fontSize: '16px' },
        }}
        controls={false}
        placeholder={maxPlaceholder}
        min={minLimit}
        max={maxLimit}
        value={value.max}
        onChange={(value) => onMaxChange(value as number | null)}
        onBlur={onMaxCommit}
        onPressEnter={onMaxCommit}
      />
    </div>
  )
}

//筛选组件
export function FilterProjects() {
  const querySelector = useAppSelector((state) => state.products.querySelector)
  const dispatch = useAppDispatch()
  //获取屏幕信息
  const screens = useScreen()

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
  //根据屏幕大小设置抽屉位置和大小
  const drawerPlacement = screens.md ? 'left' : 'bottom'
  const drawerSize = screens.md ? 400 : 680
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

  //同步所有状态
  const handleSync = () => {
    setPrice({
      min: querySelector.priceRange.min,
      max: querySelector.priceRange.max,
    })
    setSales({
      min: querySelector.salesRange.min,
      max: querySelector.salesRange.max,
    })
    setRating({
      min: querySelector.ratingRange.min,
      max: querySelector.ratingRange.max,
    })
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
    const next = updateMinWithSwap(querySelector.priceRange, min_price, () =>
      setPrice((prev) => ({ min: prev.max, max: prev.min })),
    )
    return { priceRange: next }
  }

  //更新最高价
  function hangleMaxPrice(max_price: number | null) {
    const next = updateMaxWithSwap(querySelector.priceRange, max_price, () =>
      setPrice((prev) => ({ min: prev.max, max: prev.min })),
    )
    return { priceRange: next }
  }

  //更新最低销量
  function hangleMinSales(min_sales: number | null) {
    const next = updateMinWithSwap(querySelector.salesRange, min_sales, () =>
      setSales((prev) => ({ min: prev.max, max: prev.min })),
    )
    return { salesRange: next }
  }

  //更新最高销量
  function hangleMaxSales(max_sales: number | null) {
    const next = updateMaxWithSwap(querySelector.salesRange, max_sales, () =>
      setSales((prev) => ({ min: prev.max, max: prev.min })),
    )
    return { salesRange: next }
  }

  //更新评分范围（评分不做互换逻辑，保持原行为）
  function hangleMinRating(min_rating: number | null) {
    return { ratingRange: { ...querySelector.ratingRange, min: min_rating } }
  }

  //更新最高销量
  function hangleMaxRating(max_rating: number | null) {
    return { ratingRange: { ...querySelector.ratingRange, max: max_rating } }
  }

  return (
    <>
      <Button
        onClick={() => {
          handleSync()
          setOpen(true)
        }}
        color="default"
        variant="filled"
      >
        筛选
      </Button>

      <Drawer
        title="筛选条件"
        placement={drawerPlacement}
        open={open}
        onClose={() => setOpen(false)}
        size={drawerSize}
      >
        <h3 className="text-xl">类别</h3>
        <div className="grid grid-cols-3 gap-x-2 gap-y-3 mb-8">
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
                style={{
                  fontSize: 16,
                  padding: '6px 10px',
                  display: 'flex',
                  justifyContent: 'center',
                  border: '1px solid #d9d9d9',
                }}
              >
                {tag.label}
              </CheckableTag>
            )
          })}
        </div>

        <h3 className="text-xl">价格区间</h3>
        <RangeInputs
          minPlaceholder="最低价"
          maxPlaceholder="最高价"
          minLimit={0}
          maxLimit={10000}
          value={price}
          onMinChange={(value) => setPrice({ ...price, min: value })}
          onMaxChange={(value) => setPrice({ ...price, max: value })}
          onMinCommit={() => dispatch(setFilter(hangleMinPrice(price.min)))}
          onMaxCommit={() => dispatch(setFilter(hangleMaxPrice(price.max)))}
        />

        <h3 className="text-xl">销售量</h3>
        <RangeInputs
          minPlaceholder="最低销量"
          maxPlaceholder="最高销量"
          minLimit={0}
          maxLimit={100000}
          value={sales}
          onMinChange={(value) => setSales({ ...sales, min: value })}
          onMaxChange={(value) => setSales({ ...sales, max: value })}
          onMinCommit={() => dispatch(setFilter(hangleMinSales(sales.min)))}
          onMaxCommit={() => dispatch(setFilter(hangleMaxSales(sales.max)))}
        />

        <h3 className="text-xl">评分</h3>
        <RangeInputs
          minPlaceholder="最低评分"
          maxPlaceholder="最高评分"
          minLimit={0}
          maxLimit={5}
          value={rating}
          onMinChange={(value) => setRating({ ...rating, min: value })}
          onMaxChange={(value) => setRating({ ...rating, max: value })}
          onMinCommit={() => dispatch(setFilter(hangleMinRating(rating.min)))}
          onMaxCommit={() => dispatch(setFilter(hangleMaxRating(rating.max)))}
        />

        <div className="flex flex-row gap-4 justify-around mt-12">
          <Button
            styles={{
              root: {
                width: '100%',
                fontSize: '18px',
                paddingBlock: '20px',
              },
            }}
            color="primary"
            variant="filled"
            onClick={() => handleReset()}
          >
            清空筛选
          </Button>
          <Button
            styles={{
              root: {
                width: '100%',
                fontSize: '18px',
                paddingBlock: '20px',
              },
            }}
            color="primary"
            variant="filled"
            onClick={() => setOpen(false)}
          >
            确认
          </Button>
        </div>
      </Drawer>
    </>
  )
}
