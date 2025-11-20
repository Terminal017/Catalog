import { Row, Col, Image } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { fetchProducts } from '../features/getProduct'
import type { AppDispatch } from '../app/store'

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

//商品列表组件
export default function ProductList() {
  //从redux中获取商品数据
  const products = useSelector<{ products: any }>(
    (state) => state.products.products,
  ) as ProductItemType[]

  //为useDispatch添加类型定义
  const dispatch = useDispatch<AppDispatch>()

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
      <button onClick={() => dispatch(fetchProducts())}>重新获取</button>
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
