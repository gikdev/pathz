import { createFileRoute } from "@tanstack/react-router"
import { paginationIconBtn, desktopPage, iconBtn } from "#/shared/skins"
import {
  CaretLeftIcon,
  CaretLineLeftIcon,
  CaretLineRightIcon,
  CaretRightIcon,
  FolderPlusIcon,
  InfoIcon,
  MagnifyingGlassIcon,
  MoonIcon,
  SortAscendingIcon,
  TagIcon,
} from "@phosphor-icons/react"

export const Route = createFileRoute("/admin/")({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className={desktopPage({ className: "gap-4 py-8 px-16" })}>
      <MainNav />

      <SearchAndFilterNav />

      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-4 gap-4">
          <FolderItem />
          <FolderItem />
          <FolderItem />
          <FolderItem />
          <FolderItem />
          <FolderItem />
          <FolderItem />
          <FolderItem />
          <FolderItem />
          <FolderItem />
          <FolderItem />
          <FolderItem />
          <FolderItem />
          <FolderItem />
          <FolderItem />
          <FolderItem />
          <FolderItem />
          <FolderItem />
          <FolderItem />
          <FolderItem />
        </div>

        <div className="flex items-center justify-between">
          <p className="text-xs">در حال نمایش ۱ - ۲۰ از ۲۵۰</p>

          <div className="flex items-center gap-2">
            <button className={paginationIconBtn()}>
              <CaretLineLeftIcon mirrored />
            </button>

            <button className={paginationIconBtn()}>
              <CaretLeftIcon mirrored />
            </button>

            <div className="size-8 flex flex-col items-center justify-center">
              <span>۱</span>
            </div>

            <button className={paginationIconBtn()}>
              <CaretRightIcon mirrored />
            </button>

            <button className={paginationIconBtn()}>
              <CaretLineRightIcon mirrored />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

const MainNav = () => (
  <div className="flex items-center gap-4">
    <img src="/logo.png" alt="App logo" className="max-w-full me-auto" />

    <button className={iconBtn()}>
      <MoonIcon />
    </button>

    <button className={iconBtn()}>
      <InfoIcon />
    </button>
  </div>
)

const SearchAndFilterNav = () => (
  <div className="flex items-center gap-4">
    <label className="h-12 gap-2 flex py-3 px-4 items-start me-auto w-full max-w-120 border border-gray-300 rounded-lg focus-within:border-gray-600 text-gray-900">
      <MagnifyingGlassIcon size={24} className="shrink-0" />
      <input
        className="border-0 focus:outline-0 flex-1"
        placeholder="جستجو..."
      />
    </label>

    <button className={iconBtn()}>
      <FolderPlusIcon />
    </button>

    <button className={iconBtn()}>
      <TagIcon />
    </button>

    <button className={iconBtn()}>
      <SortAscendingIcon />
    </button>
  </div>
)

const FolderItem = () => <div className="flex flex-col rounded-2xl"></div>
