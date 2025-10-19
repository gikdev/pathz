import { CaretRightIcon, SquaresFourIcon } from "@phosphor-icons/react"
import { Link } from "@tanstack/react-router"

interface FolderProps {
  id: number
  title: string
  description: string | null
}

export function Folder({ id, title, description }: FolderProps) {
  return (
    <Link
      to="/folders/$id"
      params={{ id: id.toString() }}
      className="flex flex-col gap-2 p-4 bg-zinc-100 border border-zinc-300 rounded-lg cursor-pointer"
    >
      <div className="flex gap-2 items-start">
        <SquaresFourIcon size={24} className="shrink-0 grow-0" />
        <p className="flex-1">{title}</p>
        <CaretRightIcon size={24} className="shrink-0 grow-0" mirrored />
      </div>

      {description && <p className="ps-8">{description}</p>}
    </Link>
  )
}

Folder.Skeleton = () => (
  <div className="flex gap-2 items-start animate-pulse p-4 bg-zinc-50 border border-zinc-300 rounded-lg">
    <div className="rounded-md bg-zinc-300 size-6" />
    <div className="rounded-md bg-zinc-300 h-6 w-24 me-auto" />
    <div className="rounded-md bg-zinc-300 size-6" />
  </div>
)

export const FolderSkeletons = () => (
  <>
    <Folder.Skeleton />
    <Folder.Skeleton />
    <Folder.Skeleton />
  </>
)
