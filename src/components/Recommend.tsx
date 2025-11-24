import { Carousel, Image, Skeleton, Button } from 'antd'
import { useAppSelector, useAppDispatch } from '../app/hook'
import { PlusOutlined, MinusOutlined } from '@ant-design/icons'
import { setbookmarks } from '../features/getProduct'
import { Productitem } from './ProductList'
import { useScreen } from '../hook/useScreen'

export default function RecommendCom() {
  const dispatch = useAppDispatch()
  const bookmarks = useAppSelector((state) => state.products.bookmarks)

  // 获取推荐商品数据
  const recommendProducts = useAppSelector(
    (state) => state.products.recommendProducts,
  )

  const screens = useScreen()
  if (screens.md) {
    return (
      <section className="mx-2 mt-4 mb-8">
        <h3 className="text-xl">猜你喜欢</h3>
        <div className="overflow-x-auto">
          <div className="flex gap-4 px-4 py-2 rounded-lg bg-[#f5f8ff] dark:bg-gray-800">
            {recommendProducts.map((item) => (
              <Productitem data={item} />
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="mx-2 mt-4 mb-8">
      <h3 className="text-xl">猜你喜欢</h3>
      <Carousel
        autoplay
        autoplaySpeed={5000}
        draggable
        className="bg-[#f5f8ff] dark:bg-gray-800 border border-[#e0e7ff] 
        rounded-lg dark:border-gray-700"
        style={{
          padding: '12px 24px 24px 24px',
          boxShadow: '0 4px 12px -3px rgba(0,0,0,0.08)',
        }}
      >
        {recommendProducts.length === 0 ? (
          <SkeletonCard />
        ) : (
          recommendProducts.map((item) => {
            return (
              <div>
                <div className="flex flex-row gap-4 rounded-lg p-3 relative">
                  <Image
                    width={120}
                    height={120}
                    src={item.image}
                    alt={item.name}
                    className="rounded-md"
                  />
                  <div className="product-container flex flex-col justify-center gap-[5.5px]">
                    <h3 className="text-xl mb-0!">{item.name}</h3>
                    <p className="text-red-500 text-[1.1rem] mb-0!">{`¥${item.price}`}</p>
                    <p className="mb-0! text-base text-gray-400">{`已售${item.sales}件`}</p>
                    <p className="mb-0! text-base text-gray-400">{`综合评分：${item.rating}`}</p>
                  </div>
                  <Button
                    icon={
                      bookmarks.includes(item.id) ? (
                        <MinusOutlined />
                      ) : (
                        <PlusOutlined />
                      )
                    }
                    color="primary"
                    variant="filled"
                    styles={{
                      root: {
                        position: 'absolute',
                        bottom: 12,
                        right: 0,
                      },
                    }}
                    onClick={() => {
                      dispatch(setbookmarks(item.id))
                    }}
                  ></Button>
                </div>
              </div>
            )
          })
        )}
      </Carousel>
    </section>
  )
}

function SkeletonCard() {
  return (
    <div className="flex gap-4 rounded-lg p-3">
      <Skeleton.Image
        active
        style={{ width: 120, height: 120, borderRadius: 8 }}
      />
      <div className="flex-1 flex flex-col justify-center">
        <Skeleton
          active
          title={{ width: '75%' }}
          paragraph={{ rows: 3, width: ['50%', '60%', '70%'] }}
          styles={{
            paragraph: {
              marginTop: 16,
              marginBottom: 0,
            },
          }}
        />
      </div>
    </div>
  )
}
