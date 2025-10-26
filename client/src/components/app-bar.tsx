import type { ReactElement } from "react"
import { Skeleton } from "#/components/ui/skeleton"

interface AppBarCoreProps {
  title: (string & {}) | "skeleton"
  slotStart?: ReactElement | null | "skeleton"
  slotEnd?: ReactElement | null | "skeleton"
}

export const AppBar = ({ title, slotStart, slotEnd }: AppBarCoreProps) => (
  <div className="py-2 px-1 gap-1 h-16 border-b border-gray-300 justify-center items-center flex">
    {slotStart === null ? (
      <div className="size-12" />
    ) : slotStart === "skeleton" ? (
      <Skeleton className="size-12" />
    ) : (
      <div className="size-12">{slotStart}</div>
    )}

    {title === "skeleton" ? (
      <Skeleton className="h-6 w-24 mx-auto" />
    ) : (
      <p className="mx-auto text-center text-gray-900">{title}</p>
    )}

    {slotEnd === null ? (
      <div className="size-12" />
    ) : slotEnd === "skeleton" ? (
      <Skeleton className="size-12" />
    ) : (
      <div className="size-12">{slotEnd}</div>
    )}
  </div>
)
