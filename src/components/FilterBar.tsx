import { FilterProjects } from './FilterCom'
import { SortProjects } from './SortCom'
import { SortBySales } from './SortCom'

export default function FilterBar() {
  return (
    <>
      <div className="flex flex-row gap-4 py-4 px-2 my-2 border-b border-gray-200 ">
        <SortProjects />
        <SortBySales />
        <FilterProjects />
      </div>
    </>
  )
}
