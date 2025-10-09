import { CaretLeftIcon } from "@phosphor-icons/react"
import { appBarIconBtn } from "../shared/skins"
import { useRouter } from "@tanstack/react-router"

export function GoBackInHistoryBtn() {
  const router = useRouter()

  return (
    <button className={appBarIconBtn()} onClick={() => router.history.back()}>
      <CaretLeftIcon mirrored />
    </button>
  )
}
