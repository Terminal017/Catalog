import { FilterProjects } from './FilterCom'
import { SortProjects } from './SortCom'
import { SortBySales } from './SortCom'

export default function FilterBar() {
  return (
    <>
      <div className="flex flex-row gap-2">
        <SortProjects />
        <SortBySales />
        <FilterProjects />
      </div>
    </>
  )
}
