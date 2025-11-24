import Mock from 'mockjs'
import { writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const { Random } = Mock

const categories = [
  'electronics', //数码
  'appliances', //家电
  'clothing', //服装
  'living', //家居
  'sports', //运动
  'books', //图书
  'food', //食品
  'toys', //玩具
  'game', //游戏
]

const products = Array.from({ length: 1000 }, () => ({
  id: Random.guid(),
  name: Random.ctitle(2, 6),
  image: Random.image('200x200', Random.color(), '#FFF', '商品'),
  price: Random.float(0.01, 9999, 2, 2),
  sales: Random.integer(0, 100000),
  category: Random.pick(categories),
  rating: Random.float(0, 4, 1, 1),
  createAt: Random.datetime('yyyy-MM-dd HH:mm:ss'),
}))

const outFile = resolve(__dirname, './products.json')
writeFileSync(outFile, JSON.stringify(products, null, 2), 'utf-8')
console.log('products.json 已写入:', outFile)
