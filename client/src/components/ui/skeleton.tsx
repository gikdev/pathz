import { tvcn } from "#/shared/utils"
import type { ComponentProps } from "react"

export function Skeleton({ className, ...props }: ComponentProps<"div">) {
  return (
    <span
      data-slot="skeleton"
      style={{ background: "#E3E3E3" }}
      className={tvcn("inline-block animate-pulse rounded-md", className)}
      {...props}
    />
  )
}
