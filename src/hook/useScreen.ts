import { Grid } from 'antd'

const { useBreakpoint } = Grid

//获取屏幕用于响应式布局
export function useScreen() {
  return useBreakpoint()
}
