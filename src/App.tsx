import './App.css'
import './mock/index.ts'
import FilterBar from './components/FilterBar'
import ProductList from './components/ProductList'
import PagingCom from './components/PagingCom'
import SearchCom from './components/SearchCom'

function App() {
  return (
    <>
      <div className="flex flex-col p-1 justify-between min-h-screen">
        <main className="flex flex-col">
          <SearchCom />
          <FilterBar />
          <ProductList />
        </main>
        <PagingCom />
      </div>
    </>
  )
}

export default App
