import { Row, Col, Image } from 'antd'
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
  //为useDispatch添加类型定义
  const dispatch = useAppDispatch()

  //根据query变化重新获取商品列表
  useEffect(() => {
    dispatch(fetchProducts())
  }, [querySelector, sortOption])

  return (
    <>
      <Row gutter={[16, 16]}>
        {products.map((item) => {
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
     rounded-lg hover:border-blue-300 hover:scale-101 bg-gray-50 p-2
     hover:shadow-lg transition-all duration-200 ease-out"
    >
      <Image
        width={125}
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
