import { CaretLeftIcon } from "@phosphor-icons/react"
import { iconBtn } from "../shared/skins"
import { useRouter } from "@tanstack/react-router"

export function GoBackInHistoryBtn() {
  const router = useRouter()

  return (
    <button className={iconBtn()} onClick={() => router.history.back()}>
      <CaretLeftIcon mirrored />
    </button>
  )
}
