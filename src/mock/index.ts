import Mock from 'mockjs'
import products from './products.json'

Mock.setup({
  timeout: '1000-3000',
})

// 模拟fetch请求，返回商品数据
// 考虑到筛选时要重复触发请求，每次请求返回的数据应当相同，所以直接用mock.js随机生成一份静态数据
Mock.mock('/api/products', 'get', () => {
  return { code: 0, message: 'ok', data: products }
})

export {}
