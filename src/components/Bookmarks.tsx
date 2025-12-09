import { Button } from 'antd'
import { StarOutlined } from '@ant-design/icons'
import { useAppSelector } from '../app/hook'

//收藏夹组件
export default function Bookmarks() {
  const bookmarks = useAppSelector((state) => state.products.bookmarks)
  return (
    <>
      <div className="relative">
        <Button
          icon={<StarOutlined style={{ fontSize: 16 }} />}
          color="default"
          variant="filled"
        ></Button>
        <div
          className="w-4 h-4 rounded-full absolute -top-1 -right-1.5 border
          text-xs flex justify-center items-center border-gray-300"
        >
          {bookmarks.length}
        </div>
      </div>
    </>
  )
}
