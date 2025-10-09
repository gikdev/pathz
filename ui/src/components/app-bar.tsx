import type { ReactElement } from "react"

interface AppBarProps {
  title: string
  slotStart?: ReactElement | null
  slotEnd?: ReactElement | null
}

export function AppBar({ title, slotStart, slotEnd }: AppBarProps) {
  return (
    <div className="py-2 px-1 gap-1 h-16 border-b border-zinc-300 justify-center items-center flex">
      <div className="size-12">{slotStart}</div>
      <p className="flex-1 text-center text-zinc-900">{title}</p>
      <div className="size-12">{slotEnd}</div>
    </div>
  )
}
