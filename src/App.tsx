import './App.css'
import './mock/index.ts'
import FilterBar from './components/FilterBar'
import ProductList from './components/ProductList'
import PagingCom from './components/PagingCom'

function App() {
  return (
    <>
      <main className="flex flex-col gap-4 p-1">
        <FilterBar />
        <ProductList />
        <PagingCom />
      </main>
    </>
  )
}

export default App
