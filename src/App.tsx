import './App.css'
import './mock/index.ts'
import FilterBar from './components/FilterBar'
import ProductList from './components/ProductList'
import PagingCom from './components/PagingCom'
import SearchCom from './components/SearchCom'
import RecommendCom from './components/Recommend.tsx'
import HeaderCom from './components/Header.tsx'
import { useState, useEffect } from 'react'
import { ConfigProvider, theme as antdTheme } from 'antd'

function App() {
  //管理深浅模式
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme')
    if (saved) return saved === 'dark'
    return window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false
  })

  //初始化时添加tailwind主题颜色
  useEffect(() => {
    const saved = localStorage.getItem('theme')
    const root = document.documentElement
    if (saved === 'dark') {
      if (!root.classList.contains('dark')) root.classList.add('dark')
    } else {
      if (root.classList.contains('dark')) root.classList.remove('dark')
    }
  }, [])

  return (
    <ConfigProvider
      theme={{
        algorithm: isDark
          ? [antdTheme.darkAlgorithm]
          : [antdTheme.defaultAlgorithm],
      }}
    >
      <div className="flex flex-col p-1 justify-between min-h-screen md:px-8">
        <HeaderCom isDark={isDark} setIsDark={setIsDark} />
        <main className="flex flex-col grow">
          <SearchCom />
          <FilterBar />
          <RecommendCom />
          <ProductList />
        </main>
        <PagingCom />
      </div>
    </ConfigProvider>
  )
}

export default App
