import { CaretLeftIcon } from "@phosphor-icons/react"
import { paginationIconBtn } from "../shared/skins"
import { useRouter } from "@tanstack/react-router"

export function GoBackInHistoryBtn() {
  const router = useRouter()

  return (
    <button
      className={paginationIconBtn()}
      onClick={() => router.history.back()}
    >
      <CaretLeftIcon mirrored />
    </button>
  )
}
