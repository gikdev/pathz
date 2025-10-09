import { linkBtn } from "../shared/skins"

export function ErrorParagraph({ onClick }: { onClick: () => void }) {
  return (
    <p className="flex items-center justify-center gap-1">
      <span>یه مشکلی پیش اومد. </span>
      <button className={linkBtn()} onClick={onClick}>
        سعی دوباره
      </button>
    </p>
  )
}
