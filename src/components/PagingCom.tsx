import { Pagination, ConfigProvider } from 'antd'
import { useAppSelector, useAppDispatch } from '../app/hook'
import { setPageOption } from '../features/getProduct'
import zhCN from 'antd/locale/zh_CN'

export default function PagingCom() {
  const total = useAppSelector((state) => state.products.total)
  const currentPage = useAppSelector(
    (state) => state.products.pageOption.currentPage,
  )
  const pageSize = useAppSelector((state) => state.products.pageOption.pageSize)
  const dispatch = useAppDispatch()

  return (
    <div className="flex flex-row justify-center">
      <ConfigProvider locale={zhCN}>
        <Pagination
          styles={{
            root: {
              marginTop: '36px',
              marginBottom: '24px',
            },
          }}
          total={total}
          current={currentPage}
          pageSize={pageSize}
          pageSizeOptions={['10', '20', '50', '100', '1000']}
          showSizeChanger
          showQuickJumper
          onChange={(page) => {
            if (page !== currentPage) {
              dispatch(setPageOption({ currentPage: page }))
            }
          }}
          onShowSizeChange={(_, size) => {
            dispatch(setPageOption({ currentPage: 1, pageSize: size }))
          }}
        />
      </ConfigProvider>
    </div>
  )
}
