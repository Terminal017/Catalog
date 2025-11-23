import { Carousel, Image, Skeleton } from 'antd'
import { useAppSelector } from '../app/hook'

export default function RecommendCom() {
  // 获取推荐商品数据
  const recommendProducts = useAppSelector(
    (state) => state.products.recommendProducts,
  )

  return (
    <section className="mx-2 mt-4 mb-8">
      <h3 className="text-xl">猜你喜欢</h3>
      <Carousel
        autoplay
        autoplaySpeed={5000}
        draggable
        style={{
          padding: '12px 24px 24px 24px',
          border: '1px solid #e0e7ff',
          background: '#f5f8ff',
          borderRadius: 12,
          color: '#333333',
          boxShadow: '0 4px 12px -3px rgba(0,0,0,0.08)',
        }}
      >
        {recommendProducts.length === 0 ? (
          <SkeletonCard />
        ) : (
          recommendProducts.map((item) => {
            return (
              <div>
                <div className="flex flex-row gap-4 rounded-lg p-3">
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
