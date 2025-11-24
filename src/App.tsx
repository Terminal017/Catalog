import './App.css'
import './mock/index.ts'
import FilterBar from './components/FilterBar'
import ProductList from './components/ProductList'
import PagingCom from './components/PagingCom'
import SearchCom from './components/SearchCom'
import RecommendCom from './components/Recommend.tsx'

function App() {
  return (
    <>
      <div className="flex flex-col p-1 justify-between min-h-screen md:px-8">
        <main className="flex flex-col">
          <SearchCom />
          <FilterBar />
          <RecommendCom />
          <ProductList />
        </main>
        <PagingCom />
      </div>
    </>
  )
}

export default App
