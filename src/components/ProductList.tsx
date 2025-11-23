import { Row, Col, Image, Skeleton } from 'antd'
import { useAppDispatch, useAppSelector } from '../app/hook'
import { useEffect } from 'react'
import { fetchProducts } from '../features/getProduct'

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
  //为useDispatch添加类型定义
  const dispatch = useAppDispatch()

  //根据query变化重新获取商品列表
  useEffect(() => {
    dispatch(fetchProducts())
  }, [querySelector, sortOption, pageOption])

  return (
    <>
      <Row gutter={[16, 16]} style={{ marginTop: 16, marginInline: 0 }}>
        {loading
          ? Array.from({ length: pageOption.pageSize }).map((_, index) => {
              return (
                <Col span={24} key={index}>
                  <SkeletonCard />
                </Col>
              )
            })
          : products.map((item) => {
              return (
                <Col span={24} key={item.id}>
                  <Productitem data={item} />
                </Col>
              )
            })}
      </Row>
    </>
  )
}

//单个商品组件
function Productitem({ data }: { data: ProductItemType }) {
  return (
    <div
      className="flex flex-row gap-4 border-[1.5px] border-transparent 
     rounded-lg hover:border-blue-300 hover:scale-101 bg-gray-50 p-3
     hover:shadow-lg transition-all duration-200 ease-out"
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
    </div>
  )
}

function SkeletonCard() {
  return (
    <div className="flex gap-4 rounded-lg bg-gray-50 p-3">
      <Skeleton.Image
        active
        style={{ width: 120, height: 120, borderRadius: 8 }}
      />
      <div className="flex-1 flex flex-col justify-center">
        <Skeleton
          active
          title={{ width: '60%' }}
          paragraph={{ rows: 3, width: ['40%', '48%', '55%'] }}
        />
      </div>
    </div>
  )
}
