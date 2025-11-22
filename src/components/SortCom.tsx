import { Dropdown, Button } from 'antd'
import { DownOutlined } from '@ant-design/icons'
import { useState } from 'react'
import { setSortOption } from '../features/getProduct'
import { useAppSelector, useAppDispatch } from '../app/hook'

//排序列表组件
export function SortProjects() {
  const sortOption = useAppSelector((state) => state.products.sortOption)
  const dispatch = useAppDispatch()
  //管理排序选项
  const [currentKey, setCurrentKey] = useState(sortOption)

  //定义排序选项
  const menus: { key: sortOptionType; label: string }[] = [
    { key: 'default', label: '综合排序' },
    { key: 'createdAt', label: '最新' },
    { key: 'rating', label: '最热' },
    { key: 'price-asc', label: '价格升序' },
    { key: 'price-desc', label: '价格降序' },
  ]

  return (
    <>
      <Dropdown
        menu={{
          items: menus,
          onClick: ({ key }) => {
            const k = key as sortOptionType
            dispatch(setSortOption(k))
            setCurrentKey(k)
          },
        }}
        trigger={['click']}
        placement="bottomLeft"
      >
        <Button className="min-w-28">
          {menus.find((m) => m.key === currentKey)?.label ?? '综合排序'}
          <DownOutlined />
        </Button>
      </Dropdown>
    </>
  )
}

export function SortBySales() {
  const dispatch = useAppDispatch()
  return <Button onClick={() => dispatch(setSortOption('sales'))}>销量</Button>
}
