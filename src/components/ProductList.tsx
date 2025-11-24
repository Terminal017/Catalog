import { Row, Col, Image, Skeleton, Button } from 'antd'
import { useAppDispatch, useAppSelector } from '../app/hook'
import { useEffect } from 'react'
import {
  fetchProducts,
  setbookmarks,
  resetFilter,
} from '../features/getProduct'
import { AutoSizer, Grid } from 'react-virtualized'
import { PlusOutlined, MinusOutlined } from '@ant-design/icons'
import { getScreen } from '../lib/getScreen'

//商品列表组件
export default function ProductList() {
  //从redux中获取商品数据
  const products = useAppSelector(
    (state) => state.products.products,
  ) as ProductItemType[]

  const querySelector = useAppSelector((state) => state.products.querySelector)
  const sortOption = useAppSelector((state) => state.products.sortOption)
  const pageOption = useAppSelector((state) => state.products.pageOption)
  const loading = useAppSelector((state) => state.products.loading)
  const error = useAppSelector((state) => state.products.error)
  //为useDispatch添加类型定义
  const dispatch = useAppDispatch()

  //虚拟滚动触发数量
  const VIRTUAL_THRESHOLD = 20

  //根据query变化重新获取商品列表
  useEffect(() => {
    dispatch(fetchProducts())
  }, [querySelector, sortOption, pageOption])

  //发生错误时添加重新请求按钮
  if (error) {
    return (
      <div className="my-8 flex justify-center">
        <Button
          onClick={() => dispatch(fetchProducts())}
          color="default"
          variant="filled"
        >
          重试
        </Button>
      </div>
    )
  }

  //加载状态显示骨架
  if (loading) {
    return (
      <div className="px-2">
        <h3 className="text-xl">全部商品</h3>
        <Row gutter={[16, 16]} style={{ marginTop: 16, marginInline: 0 }}>
          {Array.from({ length: Math.min(pageOption.pageSize, 20) }).map(
            (_, index) => {
              return (
                <Col xs={24} md={8} lg={6} xl={{ flex: '0 0 20%' }} key={index}>
                  <SkeletonCard />
                </Col>
              )
            },
          )}
        </Row>
      </div>
    )
  } else {
    //没有商品时返回的信息
    if (products.length === 0) {
      return (
        <>
          <h3 className="text-xl mx-2 mb-0!">全部商品</h3>
          <div className="flex flex-col justify-center items-center mt-12">
            <p className="text-xl font-medium">{'没有符合条件的商品 (>_<)'}</p>
            <Button
              styles={{
                root: {
                  fontSize: 18,
                },
              }}
              color="primary"
              variant="filled"
              onClick={() => dispatch(resetFilter())}
            >
              重置试试
            </Button>
          </div>
        </>
      )
    } else if (products.length <= VIRTUAL_THRESHOLD) {
      //正常列表
      return (
        <>
          <h3 className="text-xl mx-2 mb-0!">全部商品</h3>
          <Row gutter={[16, 16]} style={{ marginTop: 16, marginInline: 0 }}>
            {products.map((item) => {
              return (
                <Col
                  xs={24}
                  md={8}
                  lg={6}
                  xl={{ flex: '0 0 20%' }}
                  key={item.id}
                >
                  <Productitem data={item} />
                </Col>
              )
            })}
          </Row>
        </>
      )
    } else {
      //虚拟滚动列表
      return (
        <>
          <h3 className="text-xl mx-2 mb-0!">全部商品</h3>
          <VirtualList />
        </>
      )
    }
  }
}

//单个商品组件
export function Productitem({ data }: { data: ProductItemType }) {
  const dispatch = useAppDispatch()
  const bookmarks = useAppSelector((state) => state.products.bookmarks)
  return (
    <div
      className="flex flex-row gap-4 border-2 border-transparent 
     rounded-lg hover:border-blue-300 hover:scale-101 bg-gray-50 p-3
     hover:shadow-lg transition-all duration-200 ease-out relative
     md:flex-col md:items-center min-w-54"
    >
      <Image
        width={120}
        height={120}
        src={data.image}
        alt={data.name}
        className="rounded-md"
      />
      <div className="product-container flex flex-col justify-center gap-2">
        <h3 className="text-xl mb-0!">{data.name}</h3>
        <p className="text-red-500 text-[1.1rem] mb-0!">{`¥${data.price}`}</p>
        <p className="mb-0! text-base text-gray-400">{`已售${data.sales}件`}</p>
        <p className="mb-0! text-base text-gray-400">{`综合评分：${data.rating}`}</p>
      </div>
      <Button
        icon={
          bookmarks.includes(data.id) ? <MinusOutlined /> : <PlusOutlined />
        }
        color="primary"
        variant="filled"
        className="absolute! bottom-3 right-3"
        onClick={() => {
          dispatch(setbookmarks(data.id))
        }}
      ></Button>
    </div>
  )
}

function SkeletonCard() {
  //获取屏幕信息
  const screens = getScreen()

  return (
    <div className="flex flex-row gap-4 rounded-lg bg-gray-50 p-3 md:flex-col">
      <div className="flex justify-center">
        <Skeleton.Image
          active
          style={{ width: 120, height: 120, borderRadius: 8 }}
        />
      </div>
      <div className="flex-1 flex flex-col justify-center">
        <Skeleton
          active
          title={{ width: screens.md ? '100%' : '65%' }}
          paragraph={{
            rows: 3,
            width: screens.md
              ? ['100%', '100%', '100%']
              : ['40%', '50%', '60%'],
          }}
        />
      </div>
    </div>
  )
}

function VirtualList() {
  const screens = getScreen()
  const products = useAppSelector(
    (state) => state.products.products,
  ) as ProductItemType[]

  return (
    <div style={{ height: 'calc(100vh - 226px)', marginTop: 16 }}>
      <AutoSizer>
        {({ width, height }) => {
          let columnCount = 1 // 计算总列数，移动端为1行

          if (screens.xl) {
            columnCount = 5 // xl: ≥1200px, 5列
          } else if (screens.lg) {
            columnCount = 4 // lg: ≥992px, 4列
          } else if (screens.md) {
            columnCount = 3 // md: ≥768px, 3列
          }
          const columnWidth = width / columnCount
          const rowCount = Math.ceil(products.length / columnCount) // 计算总行数
          const rowHeight = screens.md ? 300 : 160
          return (
            <Grid
              width={width}
              height={height}
              columnCount={columnCount}
              columnWidth={columnWidth} // 宽度
              rowCount={rowCount}
              rowHeight={rowHeight} // 行高
              cellRenderer={({ rowIndex, columnIndex, key, style }) => {
                const index = rowIndex * columnCount + columnIndex
                const item = products[index]
                if (!item) return null
                return (
                  <div
                    key={key}
                    style={{
                      ...style,
                      padding: '8px', // 添加间距
                    }}
                  >
                    <Productitem data={item} />
                  </div>
                )
              }}
            />
          )
        }}
      </AutoSizer>
    </div>
  )
}
