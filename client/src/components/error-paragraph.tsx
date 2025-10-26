import { WarningIcon } from "@phosphor-icons/react"
import { linkBtn } from "../shared/skins"

interface ErrorParagraphProps {
  onClick: () => void
}

export function ErrorParagraph({ onClick }: ErrorParagraphProps) {
  return (
    <p className="flex items-center justify-center gap-1 text-red-600">
      <WarningIcon className="inline mb-1" />
      <span>یه مشکلی پیش اومد. </span>
      <button className={linkBtn()} onClick={onClick}>
        سعی دوباره
      </button>
    </p>
  )
}
