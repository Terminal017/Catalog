import './App.css'
import { Card } from 'antd'
import './mock/index.ts'
import axios from 'axios'

function App() {
  return (
    <>
      <div>
        <Card title="商品名称">
          <p className="text-blue-400">商品1</p>
          <button
            onClick={() =>
              axios.get('/api/products').then((data) => {
                console.log('Axios fetched products:', data.data.data)
              })
            }
          >
            第二次请求
          </button>
        </Card>
      </div>
    </>
  )
}

export default App
