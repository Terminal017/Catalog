## 项目概述

该项目是一个基于 React 19 + TypeScript + Vite 的电商平台商品列表页，结合 Ant Design、Tailwind CSS、Redux Toolkit、Mock.js、react-virtualized 等技术栈，实现基本的筛选、排序、分类、响应式
深浅模式等功能。

## 运行环境

- Node.js ≥ 18
- 包管理器 npm 9+（或 pnpm / yarn）
- 浏览器 现代浏览器 (Chrome/Edge/Firefox 最新版)

## 运行指南

1. 克隆仓库

```
git clone https://github.com/Terminal017/Catalog.git
cd Catalog
```

2. 安装依赖

```
npm install
```

3. 启动开发服务器

```
npm run dev
```

4. 构建生产包

```
npm run build
```

5. 本地预览生产

```
npm run preview
```

6. 修改模拟数据：更改[add_products.mjs](https://github.com/Terminal017/Catalog/blob/main/src/mock/add_products.mjs)文件的值并运行。

```
const products = Array.from({ length: 1000 }, () => ({}))  //修改这一项值
```

## 目录结构

```
src/
├─ App.tsx                # 应用根组件：主题切换 + 页面骨架
├─ App.css                # 根组件样式
├─ index.css              # 全局样式
├─ main.tsx               # React 入口
├─ components/        # 复合组件 (包括FilterBar, ProductList等)
├─ features/             # Redux Toolkit切片
├─ app/                   # 定义Redux的类型导出（如AppDispatch）
├─ hook/                 # 自定义 Hook
├─ lib/                     # 工具库函数
├─ mock/                 # Mock.js 相关模拟接口
├─ type/                  # TypeScript 类型定义与接口模型
```

## 技术方案

整体设计：

- 页面分为搜索栏、筛选区、商品列表、猜你喜欢、分页栏等模块
- React + AntD 处理组件
- Redux Toolkit 管理筛选、排序等状态
- mock.js 模拟后端返回数据
- tailwind 优化页面布局设计

状态设计：

```tsx
export const productsSlice = createAppSlice({
  name: 'products', //切片名
  initialState: {
    products: [], //当前页数据
    recommendProducts: [], //推荐商品数据
    bookmarks: [], //收藏商品数据
    total: 0, //商品总数
    loading: false, //加载状态
    error: null, //请求是否发生错误
    querySelector: queryOptions.querySelector, //筛选状态（包含关键字搜索）
    sortOption: queryOptions.sortOption, //排序状态
    pageOption: queryOptions.pageOption, //分页状态
  },
})
```

## 难点分析

1、设计筛选、排序、分页、搜索、收藏等多项功能的状态管理，顺序为获取数据->筛选->（排序）->分页。

2、Tailwind 与 Ant Design 的主题模式统一与深浅模式统一：主要主题应用 Ant Design 的，修改 AntD 深浅模式时同步修改 html 类名（tailwind 深浅模式设计方式），tailwind 的深浅模式用于设计部分特殊组件。
