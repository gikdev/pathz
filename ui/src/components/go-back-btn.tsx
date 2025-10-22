import { iconBtn } from "#/shared/skins"
import { CaretLeftIcon } from "@phosphor-icons/react"

interface GoBackBtnProps {
  onClick?: () => void
  className?: string
}

export function GoBackBtn({ onClick, className }: GoBackBtnProps) {
  return (
    <button type="button" onClick={onClick} className={iconBtn({ className })}>
      <CaretLeftIcon mirrored />
    </button>
  )
}
