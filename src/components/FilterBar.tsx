import { FilterProjects } from './FilterCom'
import { SortProjects } from './SortCom'
import { SortBySales } from './SortCom'
import Bookmarks from './Bookmarks'

export default function FilterBar() {
  return (
    <>
      <div
        className="flex flex-row pb-4 px-2 mt-2 mb-2 border-b border-gray-200 
      w-full mx-auto justify-between md:mt-6"
      >
        <div className="flex flex-row gap-4">
          <SortProjects />
          <SortBySales />
          <FilterProjects />
        </div>
        <Bookmarks />
      </div>
    </>
  )
}
