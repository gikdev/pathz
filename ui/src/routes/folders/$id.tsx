import { useQuery } from '@tanstack/react-query'
import { createFileRoute, Link, useParams } from '@tanstack/react-router'
import { foldersControllerGetByIdOptions } from '../../api-client'
import { CaretRightIcon, SquaresFourIcon } from '@phosphor-icons/react'

export const Route = createFileRoute('/folders/$id')({
  component: RouteComponent,
})

function RouteComponent() {
  const { id } = useParams({ from: "/folders/$id" })
  const folderId = Number(id)
  const { data: folder, status } = useQuery(foldersControllerGetByIdOptions({path:{id:folderId}}))

  if (status === "pending")
    return <p>در حال بارگذاری...</p>

  if (status === "error")
    return <p>یه مشکلی پیش اومد</p>

  return (
    <div className='text-zinc-600 bg-zinc-50 p-4 gap-4 flex flex-col max-w-96 w-full min-h-dvh mx-auto flex-1'>
      {folder.subFolders.map(f => (
        <Link key={f.id} to="/folders/$id" params={{ id: f.id.toString() }} className='flex flex-col gap-2 p-4 bg-zinc-100 border border-zinc-300 rounded-lg cursor-pointer'>
          <div className='flex gap-2 items-start'>
            <SquaresFourIcon size={24} className='shrink-0 grow-0' />
            <p className='flex-1'>{f.title}</p>
            <CaretRightIcon size={24} className='shrink-0 grow-0' />
          </div>

          {f.description && (
            <p className='ps-8'>
              {f.description}
            </p>
          )}
        </Link>
      ))}
    </div>
  )
}